import React, { useState, useCallback } from 'react';
import { Technique } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TechniquePage from './pages/TechniquePage';
import TrainingPage from './pages/TrainingPage';
import CompletionPage from './pages/CompletionPage';

type Page = 'HOME' | 'TECHNIQUE' | 'TRAINING' | 'COMPLETED';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  
  const handleNavigate = useCallback((page: 'HOME') => {
    setCurrentPage('HOME');
    setSelectedTechnique(null);
  }, []);

  const handleSelectTechnique = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setCurrentPage('TECHNIQUE');
  }, []);

  const handleStartTraining = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setCurrentPage('TRAINING');
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setSelectedTechnique(null);
    setCurrentPage('HOME');
  }, []);

  const handleCompleteTraining = useCallback(() => {
    setCurrentPage('COMPLETED');
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'HOME':
        return <HomePage onSelectTechnique={handleSelectTechnique} />;
      case 'TECHNIQUE':
        if (selectedTechnique) {
          return (
            <TechniquePage
              technique={selectedTechnique}
              onStartTraining={handleStartTraining}
              onBack={handleBackToHome}
            />
          );
        }
        return <HomePage onSelectTechnique={handleSelectTechnique} />;
      case 'TRAINING':
         if (selectedTechnique) {
          return (
            <TrainingPage
              technique={selectedTechnique}
              onComplete={handleCompleteTraining}
              onExit={handleBackToHome}
            />
          );
        }
        return <HomePage onSelectTechnique={handleSelectTechnique} />;
      case 'COMPLETED':
         if (selectedTechnique) {
          return (
            <CompletionPage
              technique={selectedTechnique}
              onRestart={() => handleStartTraining(selectedTechnique)}
              onBackToLibrary={handleBackToHome}
            />
          );
        }
        return <HomePage onSelectTechnique={handleSelectTechnique} />;
      default:
        return <HomePage onSelectTechnique={handleSelectTechnique} />;
    }
  };

  return (
    <div className="antialiased text-black bg-white">
      {currentPage !== 'TRAINING' && <Header onNavigate={handleNavigate} />}
      {renderContent()}
    </div>
  );
};

export default App;