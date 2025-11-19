
import React, { useState, useCallback } from 'react';
import { Technique } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TechniquePage from './pages/TechniquePage';
import TrainingPage from './pages/TrainingPage';
import CompletionPage from './pages/CompletionPage';
import LoginPage from './pages/LoginPage';
import CreateIdPage from './pages/CreateIdPage';
import AdminPage from './pages/AdminPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import WelcomePage from './pages/WelcomePage';
import ModeSelectionPage from './pages/ModeSelectionPage';
import ServiceSelectionPage from './pages/ServiceSelectionPage';


type Page = 'ROLE_SELECTION' | 'HOME' | 'TECHNIQUE' | 'TRAINING' | 'COMPLETED' | 'LOGIN' | 'CREATE_ID' | 'ADMIN' | 'WELCOME' | 'MODE_SELECTION' | 'SERVICE_SELECTION';
type UserRole = 'admin' | 'candidate' | null;
type StepTimings = number[];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('ROLE_SELECTION');
  const [userRole, setUserRole] = useState<UserRole>(null);
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

  const handleRoleSelect = useCallback((role: 'admin' | 'candidate') => {
    setUserRole(role);
    setCurrentPage('LOGIN');
  }, []);

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
  
  const handleLoginSuccess = useCallback(() => {
    if (userRole === 'admin') {
        setCurrentPage('ADMIN');
    } else {
        // Redirect candidates to Mode Selection first
        setCurrentPage('MODE_SELECTION');
    }
  }, [userRole]);

  const handleModeSelect = useCallback((mode: 'with-customer' | 'without-customer') => {
      if (mode === 'without-customer') {
          setCurrentPage('WELCOME');
      } else {
          // Placeholder for "On Customer" flow
          alert("Training on Customer module is coming soon.");
      }
  }, []);
  
  const handleExploreServices = useCallback(() => {
    // From Welcome page, go to Service Selection
    setCurrentPage('SERVICE_SELECTION');
  }, []);

  const handleServiceSelect = useCallback((serviceId: string) => {
      if (serviceId === 'hair') {
          setCurrentPage('HOME');
      } else {
          alert("This training module is currently under development.");
      }
  }, []);
  
  const handleNavigateToCreateId = useCallback(() => {
    setCurrentPage('CREATE_ID');
  }, []);
  
  const handleCreateId = useCallback(() => {
    // In a real app, you'd handle registration here.
    // Navigate back to login after creation
    setCurrentPage('LOGIN');
  }, []);

  const handleNavigateToLogin = useCallback(() => {
    setCurrentPage('LOGIN');
  }, []);

  const handleSignOut = useCallback(() => {
    // Resetting completely back to role selection
    setCurrentPage('ROLE_SELECTION');
    setUserRole(null);
    setSelectedTechnique(null);
    resetTrainingState();
  }, [resetTrainingState]);


  const renderContent = () => {
    switch (currentPage) {
      case 'ROLE_SELECTION':
        return <RoleSelectionPage onSelect={handleRoleSelect} />;
      case 'LOGIN':
        return (
            <LoginPage 
                role={userRole || 'candidate'} 
                onLoginSuccess={handleLoginSuccess} 
                onNavigateToCreateId={handleNavigateToCreateId}
                onBack={() => setCurrentPage('ROLE_SELECTION')}
            />
        );
      case 'CREATE_ID':
        return (
            <CreateIdPage 
                role={userRole || 'candidate'}
                onCreateId={handleCreateId} 
                onNavigateToLogin={handleNavigateToLogin} 
            />
        );
      case 'MODE_SELECTION':
        return <ModeSelectionPage onSelect={handleModeSelect} />;
      case 'WELCOME':
        return <WelcomePage onExplore={handleExploreServices} />;
      case 'SERVICE_SELECTION':
          return <ServiceSelectionPage onSelectService={handleServiceSelect} />;
      case 'ADMIN':
        return <AdminPage />;
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
        return <RoleSelectionPage onSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="antialiased text-black bg-white">
      {!['ROLE_SELECTION', 'LOGIN', 'CREATE_ID', 'TRAINING', 'WELCOME', 'MODE_SELECTION', 'SERVICE_SELECTION'].includes(currentPage) && <Header onNavigate={handleNavigate} onSignOut={handleSignOut} />}
      {renderContent()}
    </div>
  );
};

export default App;
