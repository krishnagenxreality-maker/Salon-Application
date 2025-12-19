

import React, { useState, useCallback, useEffect } from 'react';
import { Technique, Page, UserRole, CustomerDetails, SessionImage, CustomerSession } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TechniquePage from './pages/TechniquePage';
import TrainingPage from './pages/TrainingPage';
import CompletionPage from './pages/CompletionPage';
import CreateIdPage from './pages/CreateIdPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminPage from './pages/AdminPage';
import AdminCandidateDetailsPage from './pages/AdminCandidateDetailsPage';
import AdminSessionDetailsPage from './pages/AdminSessionDetailsPage';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import ModeSelectionPage from './pages/ModeSelectionPage';
import ServiceSelectionPage from './pages/ServiceSelectionPage';
import CustomerServiceWelcomePage from './pages/CustomerServiceWelcomePage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import CustomerServiceMenuPage from './pages/CustomerServiceMenuPage';
import HaircutsSelectionPage from './pages/HaircutsSelectionPage';
import LiveSessionPage from './pages/LiveSessionPage';
import LiveSessionCompletionPage from './pages/LiveSessionCompletionPage';
import { api } from './services/api';


type StepTimings = number[];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('ROLE_SELECTION');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [trainingMode, setTrainingMode] = useState<'virtual' | 'live'>('virtual');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [trainingStartTime, setTrainingStartTime] = useState<number | null>(null);
  const [stepTimings, setStepTimings] = useState<StepTimings>([]);
  
  // Live Session State
  const [selectedLiveService, setSelectedLiveService] = useState<string | null>(null);
  const [liveSessionTimings, setLiveSessionTimings] = useState<StepTimings>([]);
  const [currentCustomer, setCurrentCustomer] = useState<CustomerDetails | null>(null);
  const [sessionImages, setSessionImages] = useState<SessionImage[]>([]);

  // Admin State
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectedCustomerSession, setSelectedCustomerSession] = useState<CustomerSession | null>(null);

  // Initialize Data
  useEffect(() => {
    // Restore Session
    const savedUserId = localStorage.getItem('currentUserId');
    const savedUserRole = localStorage.getItem('userRole') as UserRole;
    if (savedUserId && savedUserRole) {
        setCurrentUserId(savedUserId);
        setUserRole(savedUserRole);
        if (savedUserRole === 'admin') setCurrentPage('ADMIN');
        else setCurrentPage('MODE_SELECTION');
    }
  }, []);

  const resetTrainingState = useCallback(() => {
    setTrainingStartTime(null);
    setStepTimings([]);
    setLiveSessionTimings([]);
    setCurrentCustomer(null);
    setSessionImages([]);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    if (currentPage === 'TECHNIQUE' || currentPage === 'TRAINING' || currentPage === 'LIVE_SESSION') {
        setSelectedTechnique(null);
        setSelectedLiveService(null);
        resetTrainingState();
    }
    setCurrentPage(page);
  }, [currentPage, resetTrainingState]);

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

  const handleCompleteTraining = useCallback(async (technique: Technique) => {
    if (trainingStartTime && currentUserId) {
        const totalTime = stepTimings.reduce((a, b) => a + b, 0);
        await api.saveCompletedTechnique(currentUserId, {
            techniqueId: technique.id,
            techniqueTitle: technique.title,
            completedAt: Date.now(),
            stepTimings: stepTimings,
            totalTime: totalTime
        });
    }
    setCurrentPage('COMPLETED');
  }, [stepTimings, trainingStartTime, currentUserId]);
  
  const handleLoginSuccess = useCallback((userId: string, role: UserRole) => {
    setCurrentUserId(userId);
    setUserRole(role);
    localStorage.setItem('currentUserId', userId);
    if (role) localStorage.setItem('userRole', role);

    if (role === 'admin') {
        setCurrentPage('ADMIN');
    } else {
        setCurrentPage('MODE_SELECTION');
    }
  }, []);

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
    setCurrentPage('SERVICE_SELECTION');
  }, []);

  const handleDiveIntoCustomerService = useCallback(() => {
    setCurrentPage('CUSTOMER_DETAILS');
  }, []);

  const handleCustomerDetailsSubmit = useCallback((details: CustomerDetails) => {
    setCurrentCustomer(details);
    setCurrentPage('CUSTOMER_SERVICE_MENU');
  }, []);

  const handleServiceSelect = useCallback((serviceId: string) => {
      if (serviceId === 'hair-training') {
          setCurrentPage('HOME');
      } else if (serviceId === 'haircuts-styling') {
          setCurrentPage('HAIRCUTS_SELECTION');
      } else {
          alert("Details for this service will be added in the next update.");
      }
  }, []);

  const handleStartSession = useCallback((subService: string) => {
      setSelectedLiveService(subService);
      setLiveSessionTimings([]);
      setSessionImages([]);
      setCurrentPage('LIVE_SESSION');
  }, []);
  
  const handleLiveSessionStepComplete = useCallback((duration: number) => {
      setLiveSessionTimings(prev => [...prev, duration]);
  }, []);

  const handleLiveSessionFinish = useCallback(async (images: SessionImage[]) => {
      setSessionImages(images);
      
      if (selectedLiveService && currentCustomer && currentUserId) {
           await api.saveCustomerSession(currentUserId, {
               id: `sess_${Date.now()}`,
               timestamp: Date.now(),
               serviceName: 'Haircuts & Styling',
               subService: selectedLiveService,
               customerRequest: '', 
               customerDetails: currentCustomer,
               stepTimings: liveSessionTimings,
               images: images,
               rating: 0 
           });
      }

      setCurrentPage('LIVE_SESSION_COMPLETED');
  }, [selectedLiveService, currentCustomer, liveSessionTimings, currentUserId]);

  const handleBackToCustomerMenu = useCallback(() => {
      setSelectedLiveService(null);
      setLiveSessionTimings([]);
      setSessionImages([]);
      setCurrentPage('CUSTOMER_SERVICE_MENU');
  }, []);

  const handleNewCustomer = useCallback(() => {
      setSelectedLiveService(null);
      setLiveSessionTimings([]);
      setCurrentCustomer(null);
      setSessionImages([]);
      setCurrentPage('CUSTOMER_DETAILS');
  }, []);

  const handleSelectCandidate = useCallback((candidateId: string) => {
      setSelectedCandidateId(candidateId);
      setCurrentPage('ADMIN_CANDIDATE_DETAILS');
  }, []);

  const handleSelectSession = useCallback((session: CustomerSession) => {
      setSelectedCustomerSession(session);
      setCurrentPage('ADMIN_SESSION_DETAILS');
  }, []);

  const handleNavigateToCreateId = useCallback((role: UserRole) => {
    setUserRole(role);
    setCurrentPage('CREATE_ID');
  }, []);
  
  const handleCreateId = useCallback(() => {
    setCurrentPage('ROLE_SELECTION');
  }, []);

  const handleNavigateToForgotPassword = useCallback((role: UserRole) => {
    setUserRole(role);
    setCurrentPage('FORGOT_PASSWORD');
  }, []);
  
  const handlePasswordReset = useCallback(() => {
    setCurrentPage('ROLE_SELECTION');
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userRole');
    setUserRole(null);
    setCurrentUserId(null);
    setSelectedTechnique(null);
    setTrainingMode('virtual');
    resetTrainingState();
    setCurrentPage('ROLE_SELECTION');
  }, [resetTrainingState]);

  const showHeader = ['WELCOME', 'MODE_SELECTION', 'SERVICE_SELECTION', 'ADMIN', 'ADMIN_CANDIDATE_DETAILS', 'ADMIN_SESSION_DETAILS', 'HOME', 'CUSTOMER_WELCOME', 'CUSTOMER_DETAILS', 'CUSTOMER_SERVICE_MENU', 'HAIRCUTS_SELECTION', 'LIVE_SESSION_COMPLETED'].includes(currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case 'ROLE_SELECTION':
        return (
          <AuthPage 
            onLoginSuccess={handleLoginSuccess}
            onNavigateToCreateId={handleNavigateToCreateId}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        );
      case 'CREATE_ID':
        return <CreateIdPage role={userRole || 'candidate'} onCreateId={handleCreateId} onNavigateToLogin={() => setCurrentPage('ROLE_SELECTION')} />;
      case 'FORGOT_PASSWORD':
        return <ForgotPasswordPage role={userRole || 'candidate'} onSubmit={handlePasswordReset} onNavigateToLogin={() => setCurrentPage('ROLE_SELECTION')} />;
      case 'MODE_SELECTION':
        return <ModeSelectionPage onSelect={handleModeSelect} />;
      case 'WELCOME':
        return <WelcomePage onExplore={handleExploreServices} onBack={() => setCurrentPage('MODE_SELECTION')} />;
      case 'SERVICE_SELECTION':
        return <ServiceSelectionPage onSelectService={handleServiceSelect} onBack={() => setCurrentPage('WELCOME')} />;
      case 'CUSTOMER_WELCOME':
        return <CustomerServiceWelcomePage onDive={handleDiveIntoCustomerService} onBack={() => setCurrentPage('MODE_SELECTION')} />;
      case 'CUSTOMER_DETAILS':
        return <CustomerDetailsPage onNext={handleCustomerDetailsSubmit} onBack={() => setCurrentPage('CUSTOMER_WELCOME')} />;
      case 'CUSTOMER_SERVICE_MENU':
        return <CustomerServiceMenuPage onSelectService={handleServiceSelect} onBack={() => setCurrentPage('CUSTOMER_DETAILS')} />;
      case 'HAIRCUTS_SELECTION':
        return <HaircutsSelectionPage onStartSession={handleStartSession} onBack={() => setCurrentPage('CUSTOMER_SERVICE_MENU')} />;
      case 'HOME':
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage('SERVICE_SELECTION')} />;
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
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage('SERVICE_SELECTION')} />;
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
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage('SERVICE_SELECTION')} />;
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
        return <HomePage onSelectTechnique={handleSelectTechnique} onBack={() => setCurrentPage('SERVICE_SELECTION')} />;
      
      case 'ADMIN':
          return <AdminPage onSelectCandidate={handleSelectCandidate} />;
      case 'ADMIN_CANDIDATE_DETAILS':
          if (selectedCandidateId) {
            return (
                <AdminCandidateDetailsPage 
                    candidateId={selectedCandidateId} 
                    onBack={() => setCurrentPage('ADMIN')}
                    onSelectSession={handleSelectSession}
                />
            );
          }
          return <AdminPage onSelectCandidate={handleSelectCandidate} />;
      case 'ADMIN_SESSION_DETAILS':
          if (selectedCustomerSession) {
              return (
                  <AdminSessionDetailsPage 
                    session={selectedCustomerSession} 
                    onBack={() => setCurrentPage('ADMIN_CANDIDATE_DETAILS')}
                  />
              );
          }
          return <AdminPage onSelectCandidate={handleSelectCandidate} />;

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
                      customerDetails={currentCustomer}
                      sessionImages={sessionImages}
                      // Use the correctly defined handleBackToCustomerMenu instead of the non-existent handleBackToMenu
                      onBackToMenu={handleBackToCustomerMenu}
                      onNewCustomer={handleNewCustomer}
                  />
              );
          }
          return <CustomerServiceMenuPage onSelectService={handleServiceSelect} onBack={() => setCurrentPage('CUSTOMER_DETAILS')} />;
      default:
        return (
          <AuthPage 
            onLoginSuccess={handleLoginSuccess}
            onNavigateToCreateId={handleNavigateToCreateId}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        );
    }
  };

  return (
    <div className="antialiased text-black bg-white transition-colors duration-300">
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
