import React, { useState, useCallback } from 'react';
import { Technique } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TechniquePage from './pages/TechniquePage';
import TrainingPage from './pages/TrainingPage';
import CompletionPage from './pages/CompletionPage';

type Page = 'HOME' | 'TECHNIQUE' | 'TRAINING' | 'COMPLETED';
type StepTimings = number[];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [trainingStartTime, setTrainingStartTime] = useState<number | null>(null);
  const [stepTimings, setStepTimings] = useState<StepTimings>([]);
  
  const resetTrainingState = useCallback(() => {
    setTrainingStartTime(null);
    setStepTimings([]);
  }, []);

  const handleNavigate = useCallback((page: 'HOME') => {
    setCurrentPage('HOME');
    setSelectedTechnique(null);
    resetTrainingState();
  }, [resetTrainingState]);

  const handleSelectTechnique = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setCurrentPage('TECHNIQUE');
  }, []);

  const handleStartTraining = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setTrainingStartTime(Date.now());
    setStepTimings([]);
    setCurrentPage('TRAINING');
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setSelectedTechnique(null);
    setCurrentPage('HOME');
    resetTrainingState();
  }, [resetTrainingState]);

  const handleStepComplete = useCallback((duration: number) => {
    setStepTimings(prev => [...prev, duration]);
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
         if (selectedTechnique && trainingStartTime) {
          return (
            <TrainingPage
              technique={selectedTechnique}
              trainingStartTime={trainingStartTime}
              onStepComplete={handleStepComplete}
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
              stepTimings={stepTimings}
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
