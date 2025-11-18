import React, { useState, useCallback } from 'react';
import { Technique } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TechniquePage from './pages/TechniquePage';
import TrainingPage from './pages/TrainingPage';
import CompletionPage from './pages/CompletionPage';
import LoginPage from './pages/LoginPage';
import CreateIdPage from './pages/CreateIdPage';


type Page = 'HOME' | 'TECHNIQUE' | 'TRAINING' | 'COMPLETED' | 'LOGIN' | 'CREATE_ID';
type StepTimings = number[];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('LOGIN');
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
  
  const handleLogin = useCallback(() => {
    setCurrentPage('HOME');
  }, []);
  
  const handleNavigateToCreateId = useCallback(() => {
    setCurrentPage('CREATE_ID');
  }, []);
  
  const handleCreateId = useCallback(() => {
    // In a real app, you'd handle registration here.
    // For now, we'll just navigate back to the login page.
    setCurrentPage('LOGIN');
  }, []);

  const handleNavigateToLogin = useCallback(() => {
    setCurrentPage('LOGIN');
  }, []);


  const renderContent = () => {
    switch (currentPage) {
      case 'LOGIN':
        return <LoginPage onLogin={handleLogin} onNavigateToCreateId={handleNavigateToCreateId} />;
      case 'CREATE_ID':
        return <CreateIdPage onCreateId={handleCreateId} onNavigateToLogin={handleNavigateToLogin} />;
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
        return <LoginPage onLogin={handleLogin} onNavigateToCreateId={handleNavigateToCreateId} />;
    }
  };

  return (
    <div className="antialiased text-black bg-white">
      {!['LOGIN', 'CREATE_ID', 'TRAINING'].includes(currentPage) && <Header onNavigate={handleNavigate} />}
      {renderContent()}
    </div>
  );
};

export default App;
