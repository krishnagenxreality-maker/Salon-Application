
import React, { useState, useCallback } from 'react';
import { Technique, Page, UserRole } from './types';
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
import CustomerServiceWelcomePage from './pages/CustomerServiceWelcomePage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import CustomerServiceMenuPage from './pages/CustomerServiceMenuPage';
import HaircutsSelectionPage from './pages/HaircutsSelectionPage';
import LiveSessionPage from './pages/LiveSessionPage';
import LiveSessionCompletionPage from './pages/LiveSessionCompletion';


type StepTimings = number[];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('ROLE_SELECTION');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [trainingMode, setTrainingMode] = useState<'virtual' | 'live'>('virtual'); // Track the current mode context
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [trainingStartTime, setTrainingStartTime] = useState<number | null>(null);
  const [stepTimings, setStepTimings] = useState<StepTimings>([]);
  
  // Live Session State
  const [selectedLiveService, setSelectedLiveService] = useState<string | null>(null);
  const [liveSessionTimings, setLiveSessionTimings] = useState<StepTimings>([]);
  const [customerTargetDuration, setCustomerTargetDuration] = useState<string>('');

  const resetTrainingState = useCallback(() => {
    setTrainingStartTime(null);
    setStepTimings([]);
    setLiveSessionTimings([]);
    setCustomerTargetDuration('');
  }, []);

  // Generalized navigation handler for the Header
  const handleNavigate = useCallback((page: Page) => {
    // If leaving a technique/training page, reset state
    if (currentPage === 'TECHNIQUE' || currentPage === 'TRAINING' || currentPage === 'LIVE_SESSION') {
        setSelectedTechnique(null);
        setSelectedLiveService(null);
        resetTrainingState();
    }
    setCurrentPage(page);
  }, [currentPage, resetTrainingState]);

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

  const handleCompleteTraining = useCallback((technique: Technique) => {
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
          setTrainingMode('virtual');
          setCurrentPage('WELCOME');
      } else {
          setTrainingMode('live');
          setCurrentPage('CUSTOMER_WELCOME');
      }
  }, []);
  
  const handleExploreServices = useCallback(() => {
    // From Welcome page (Training Lobby), go to Training Service Selection
    setCurrentPage('SERVICE_SELECTION');
  }, []);

  const handleDiveIntoCustomerService = useCallback(() => {
    // Go to Customer Details page
    setCurrentPage('CUSTOMER_DETAILS');
  }, []);

  const handleCustomerDetailsSubmit = useCallback((details: { duration: string }) => {
    // After details are entered, go to Customer Service Menu
    setCustomerTargetDuration(details.duration);
    setCurrentPage('CUSTOMER_SERVICE_MENU');
  }, []);

  const handleServiceSelect = useCallback((serviceId: string) => {
      // Handle navigation from both menus
      if (serviceId === 'hair-training') {
          // From Training Lobby
          setCurrentPage('HOME');
      } else if (serviceId === 'haircuts-styling') {
          // From Customer Service Lobby
          setCurrentPage('HAIRCUTS_SELECTION');
      } else {
          // For now, other services are placeholders
          alert("Details for this service will be added in the next update.");
      }
  }, []);

  const handleStartSession = useCallback((subService: string) => {
      setSelectedLiveService(subService);
      setLiveSessionTimings([]);
      setCurrentPage('LIVE_SESSION');
  }, []);
  
  const handleLiveSessionStepComplete = useCallback((duration: number) => {
      setLiveSessionTimings(prev => [...prev, duration]);
  }, []);

  const handleLiveSessionFinish = useCallback(() => {
      setCurrentPage('LIVE_SESSION_COMPLETED');
  }, []);

  const handleBackToCustomerMenu = useCallback(() => {
      setSelectedLiveService(null);
      setLiveSessionTimings([]);
      setCurrentPage('CUSTOMER_SERVICE_MENU');
  }, []);

  const handleNewCustomer = useCallback(() => {
      setSelectedLiveService(null);
      setLiveSessionTimings([]);
      setCustomerTargetDuration('');
      setCurrentPage('CUSTOMER_DETAILS');
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
    setTrainingMode('virtual');
    setSelectedTechnique(null);
    resetTrainingState();
  }, [resetTrainingState]);

  // Logic to determine if Header should be visible
  const showHeader = !['ROLE_SELECTION', 'LOGIN', 'CREATE_ID', 'TRAINING', 'LIVE_SESSION'].includes(currentPage);

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
        return (
            <WelcomePage 
                onExplore={handleExploreServices} 
                onBack={() => setCurrentPage('MODE_SELECTION')}
            />
        );
      case 'CUSTOMER_WELCOME':
        return (
            <CustomerServiceWelcomePage
                onDive={handleDiveIntoCustomerService}
                onBack={() => setCurrentPage('MODE_SELECTION')}
            />
        );
      case 'CUSTOMER_DETAILS':
          return (
            <CustomerDetailsPage
                onNext={handleCustomerDetailsSubmit}
                onBack={() => setCurrentPage('CUSTOMER_WELCOME')}
            />
          );
      case 'SERVICE_SELECTION':
          return (
            <ServiceSelectionPage 
                onSelectService={handleServiceSelect} 
                onBack={() => setCurrentPage('WELCOME')}
            />
        );
      case 'CUSTOMER_SERVICE_MENU':
          return (
            <CustomerServiceMenuPage
                onSelectService={handleServiceSelect}
                onBack={() => setCurrentPage('CUSTOMER_DETAILS')}
            />
          );
      case 'HAIRCUTS_SELECTION':
          return (
            <HaircutsSelectionPage
                onStartSession={handleStartSession}
                onBack={() => setCurrentPage('CUSTOMER_SERVICE_MENU')}
            />
          );
      case 'LIVE_SESSION':
          if (selectedLiveService) {
              return (
                  <LiveSessionPage
                      serviceName={selectedLiveService}
                      onStepComplete={handleLiveSessionStepComplete}
                      onFinishSession={handleLiveSessionFinish}
                      onExit={handleBackToCustomerMenu}
                  />
              );
          }
          return <CustomerServiceMenuPage onSelectService={handleServiceSelect} onBack={() => setCurrentPage('CUSTOMER_DETAILS')} />;
      case 'LIVE_SESSION_COMPLETED':
          if (selectedLiveService) {
              return (
                  <LiveSessionCompletionPage
                      serviceName={selectedLiveService}
                      stepTimings={liveSessionTimings}
                      targetDuration={customerTargetDuration}
                      onBackToMenu={handleBackToCustomerMenu}
                      onNewCustomer={handleNewCustomer}
                  />
              );
          }
          return <CustomerServiceMenuPage onSelectService={handleServiceSelect} onBack={() => setCurrentPage('CUSTOMER_DETAILS')} />;
      case 'ADMIN':
        return <AdminPage />;
      case 'HOME':
        return (
            <HomePage 
                onSelectTechnique={handleSelectTechnique} 
                // Dynamic back button based on mode
                // If we came from HAIRCUTS_SELECTION, back should ideally go there, but for simplicity going to menu context
                onBack={() => setCurrentPage(trainingMode === 'virtual' ? 'SERVICE_SELECTION' : 'HAIRCUTS_SELECTION')}
            />
        );
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
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage(trainingMode === 'virtual' ? 'SERVICE_SELECTION' : 'HAIRCUTS_SELECTION')} />;
      case 'TRAINING':
         if (selectedTechnique && trainingStartTime) {
          return (
            <TrainingPage
              technique={selectedTechnique}
              trainingStartTime={trainingStartTime}
              onStepComplete={handleStepComplete}
              onComplete={() => handleCompleteTraining(selectedTechnique)}
              onExit={handleBackToHome}
            />
          );
        }
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage(trainingMode === 'virtual' ? 'SERVICE_SELECTION' : 'HAIRCUTS_SELECTION')} />;
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
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage(trainingMode === 'virtual' ? 'SERVICE_SELECTION' : 'HAIRCUTS_SELECTION')} />;
      default:
        return <RoleSelectionPage onSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="antialiased text-black bg-white">
      {showHeader && (
          <Header 
            userRole={userRole} 
            currentPage={currentPage}
            onNavigate={handleNavigate} 
            onSignOut={handleSignOut} 
          />
      )}
      {renderContent()}
    </div>
  );
};

export default App;
