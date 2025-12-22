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
  const [authRole, setAuthRole] = useState<'admin' | 'candidate'>('candidate');

  const [trainingMode, setTrainingMode] = useState<'virtual' | 'live'>('virtual');
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [trainingStartTime, setTrainingStartTime] = useState<number | null>(null);
  const [stepTimings, setStepTimings] = useState<StepTimings>([]);

  // Live Session State
  const [selectedLiveService, setSelectedLiveService] = useState<string | null>(null);
  const [liveSessionTimings, setLiveSessionTimings] = useState<StepTimings>([]);
  const [currentCustomer, setCurrentCustomer] = useState<CustomerDetails | null>(null);
  const [sessionVideo, setSessionVideo] = useState<string | undefined>(undefined);

  // Admin State
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<CustomerSession | null>(null);

  useEffect(() => {
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
    setSessionVideo(undefined);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleModeSelect = useCallback((mode: 'with-customer' | 'without-customer') => {
      setTimeout(() => {
        if (mode === 'without-customer') {
            setTrainingMode('virtual');
            setCurrentPage('WELCOME');
        } else {
            setTrainingMode('live');
            setCurrentPage('CUSTOMER_WELCOME');
        }
      }, 600); 
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userRole');
    setUserRole(null);
    setCurrentUserId(null);
    resetTrainingState();
    setCurrentPage('ROLE_SELECTION');
  }, [resetTrainingState]);

  // NEW: Save Training Progress to Backend
  const handleTrainingComplete = useCallback(async () => {
    if (!currentUserId || !selectedTechnique) return;

    const techniqueData = {
        techniqueId: selectedTechnique.id,
        techniqueTitle: selectedTechnique.title,
        completedAt: Date.now(),
        stepTimings: stepTimings,
        totalTime: stepTimings.reduce((a, b) => a + b, 0)
    };

    try {
        await api.saveCompletedTechnique(currentUserId, techniqueData);
        setCurrentPage('COMPLETED');
    } catch (err) {
        console.error("Failed to save training progress:", err);
        setCurrentPage('COMPLETED'); // Navigate anyway, but log error
    }
  }, [currentUserId, selectedTechnique, stepTimings]);

  // NEW: Save Live Session to Backend
  const handleFinishLiveSession = useCallback(async (videoUrl: string) => {
    if (!currentUserId || !currentCustomer || !selectedLiveService) return;

    const sessionData: CustomerSession = {
        id: 'sess_' + Date.now(),
        timestamp: Date.now(),
        serviceName: 'Haircuts & Styling', // Main category
        subService: selectedLiveService,    // e.g., "Cut & Blow Dry"
        customerRequest: '',
        customerDetails: currentCustomer,
        stepTimings: liveSessionTimings,
        images: [],
        videoUrl: videoUrl,
        rating: 0
    };

    try {
        await api.saveCustomerSession(currentUserId, sessionData);
        setSessionVideo(videoUrl);
        setCurrentPage('LIVE_SESSION_COMPLETED');
    } catch (err) {
        console.error("Failed to save live session:", err);
        setSessionVideo(videoUrl);
        setCurrentPage('LIVE_SESSION_COMPLETED');
    }
  }, [currentUserId, currentCustomer, selectedLiveService, liveSessionTimings]);

  const handleGlobalBack = useCallback(() => {
    switch (currentPage) {
      case 'WELCOME':
      case 'CUSTOMER_WELCOME':
        setCurrentPage('MODE_SELECTION');
        break;
      case 'CUSTOMER_DETAILS':
        setCurrentPage('CUSTOMER_WELCOME');
        break;
      case 'HOME':
        setCurrentPage('SERVICE_SELECTION');
        break;
      case 'SERVICE_SELECTION':
        setCurrentPage('WELCOME');
        break;
      case 'TECHNIQUE':
        setCurrentPage('HOME');
        break;
      case 'TRAINING':
        setCurrentPage('TECHNIQUE');
        break;
      case 'HAIRCUTS_SELECTION':
        setCurrentPage('CUSTOMER_SERVICE_MENU');
        break;
      case 'CUSTOMER_SERVICE_MENU':
        setCurrentPage('CUSTOMER_DETAILS');
        break;
      case 'LIVE_SESSION':
        setCurrentPage('HAIRCUTS_SELECTION');
        break;
      case 'LIVE_SESSION_COMPLETED':
        setCurrentPage('CUSTOMER_SERVICE_MENU');
        break;
      case 'COMPLETED':
        setCurrentPage('HOME');
        break;
      case 'ADMIN_CANDIDATE_DETAILS':
        setCurrentPage('ADMIN');
        break;
      case 'ADMIN_SESSION_DETAILS':
        setCurrentPage('ADMIN_CANDIDATE_DETAILS');
        break;
      default:
        break;
    }
  }, [currentPage]);

  const showHeader = [
    'WELCOME', 'MODE_SELECTION', 'SERVICE_SELECTION', 'HOME', 
    'TECHNIQUE', 'TRAINING', 'COMPLETED',
    'CUSTOMER_WELCOME', 'CUSTOMER_DETAILS', 'CUSTOMER_SERVICE_MENU', 
    'HAIRCUTS_SELECTION', 'LIVE_SESSION', 'LIVE_SESSION_COMPLETED'
  ].includes(currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case 'ROLE_SELECTION':
        return (
            <AuthPage 
                onLoginSuccess={(uid, role) => { 
                    setCurrentUserId(uid); 
                    setUserRole(role); 
                    localStorage.setItem('currentUserId', uid);
                    localStorage.setItem('userRole', role || '');
                    setCurrentPage(role === 'admin' ? 'ADMIN' : 'MODE_SELECTION'); 
                }} 
                onNavigateToCreateId={(role) => {
                    setAuthRole(role as 'admin' | 'candidate');
                    setCurrentPage('CREATE_ID');
                }} 
                onNavigateToForgotPassword={(role) => {
                    setAuthRole(role as 'admin' | 'candidate');
                    setCurrentPage('FORGOT_PASSWORD');
                }} 
            />
        );
      case 'CREATE_ID':
        return (
            <CreateIdPage 
                role={authRole} 
                onCreateId={() => setCurrentPage('ROLE_SELECTION')} 
                onNavigateToLogin={() => setCurrentPage('ROLE_SELECTION')} 
            />
        );
      case 'FORGOT_PASSWORD':
        return (
            <ForgotPasswordPage 
                role={authRole} 
                onSubmit={() => setCurrentPage('ROLE_SELECTION')} 
                onNavigateToLogin={() => setCurrentPage('ROLE_SELECTION')} 
            />
        );
      case 'MODE_SELECTION':
        return <ModeSelectionPage onSelect={handleModeSelect} />;
      case 'WELCOME':
        return <WelcomePage onExplore={() => setCurrentPage('SERVICE_SELECTION')} onBack={handleGlobalBack} />;
      case 'CUSTOMER_WELCOME':
        return <CustomerServiceWelcomePage onDive={() => setCurrentPage('CUSTOMER_DETAILS')} onBack={handleGlobalBack} />;
      case 'SERVICE_SELECTION':
        return <ServiceSelectionPage onSelectService={(id) => id === 'hair-training' ? setCurrentPage('HOME') : alert('Coming Soon')} onBack={handleGlobalBack} />;
      case 'HOME':
        return <HomePage onSelectTechnique={(t) => { setSelectedTechnique(t); setCurrentPage('TECHNIQUE'); }} onBack={handleGlobalBack} />;
      case 'TECHNIQUE':
        return selectedTechnique ? <TechniquePage technique={selectedTechnique} onStartTraining={(t) => { setTrainingStartTime(Date.now()); setCurrentPage('TRAINING'); }} onBack={handleGlobalBack} /> : null;
      case 'TRAINING':
        return selectedTechnique && trainingStartTime ? <TrainingPage technique={selectedTechnique} trainingStartTime={trainingStartTime} onStepComplete={(d) => setStepTimings(prev => [...prev, d])} onComplete={handleTrainingComplete} onExit={() => setCurrentPage('HOME')} /> : null;
      case 'COMPLETED':
        return selectedTechnique ? <CompletionPage technique={selectedTechnique} stepTimings={stepTimings} onRestart={() => { setStepTimings([]); setTrainingStartTime(Date.now()); setCurrentPage('TRAINING'); }} onBackToLibrary={() => setCurrentPage('HOME')} /> : null;
      case 'CUSTOMER_DETAILS':
        return <CustomerDetailsPage onNext={(d) => { setCurrentCustomer(d); setCurrentPage('CUSTOMER_SERVICE_MENU'); }} onBack={handleGlobalBack} />;
      case 'CUSTOMER_SERVICE_MENU':
        return <CustomerServiceMenuPage onSelectService={(id) => id === 'haircuts-styling' ? setCurrentPage('HAIRCUTS_SELECTION') : alert('Coming Soon')} onBack={handleGlobalBack} />;
      case 'HAIRCUTS_SELECTION':
        return <HaircutsSelectionPage onStartSession={(s) => { setSelectedLiveService(s); setCurrentPage('LIVE_SESSION'); }} onBack={handleGlobalBack} />;
      case 'LIVE_SESSION':
        return selectedLiveService ? <LiveSessionPage serviceName={selectedLiveService} onStepComplete={(d) => setLiveSessionTimings(p => [...p, d])} onFinishSession={handleFinishLiveSession} onExit={() => setCurrentPage('CUSTOMER_SERVICE_MENU')} onBack={handleGlobalBack} /> : null;
      case 'LIVE_SESSION_COMPLETED':
        return selectedLiveService ? <LiveSessionCompletionPage serviceName={selectedLiveService} stepTimings={liveSessionTimings} customerDetails={currentCustomer} sessionImages={[]} videoUrl={sessionVideo} onBackToMenu={() => setCurrentPage('CUSTOMER_SERVICE_MENU')} onNewCustomer={() => setCurrentPage('CUSTOMER_DETAILS')} /> : null;
      case 'ADMIN': 
        return <AdminPage onSelectCandidate={(id) => { setSelectedCandidateId(id); setCurrentPage('ADMIN_CANDIDATE_DETAILS'); }} onSignOut={handleSignOut} />;
      case 'ADMIN_CANDIDATE_DETAILS':
        return selectedCandidateId ? (
            <AdminCandidateDetailsPage 
                candidateId={selectedCandidateId} 
                onBack={handleGlobalBack}
                onSignOut={handleSignOut}
                onSelectSession={(session) => { setSelectedSession(session); setCurrentPage('ADMIN_SESSION_DETAILS'); }} 
            />
        ) : null;
      case 'ADMIN_SESSION_DETAILS':
        return selectedSession ? (
          <AdminSessionDetailsPage 
            session={selectedSession} 
            onBack={handleGlobalBack} 
            onSignOut={handleSignOut}
          />
        ) : null;
      default: 
        return <AuthPage onLoginSuccess={(uid, role) => { setCurrentUserId(uid); setUserRole(role); setCurrentPage(role === 'admin' ? 'ADMIN' : 'MODE_SELECTION'); }} onNavigateToCreateId={(r) => { setAuthRole(r as 'admin' | 'candidate'); setCurrentPage('CREATE_ID'); }} onNavigateToForgotPassword={(r) => { setAuthRole(r as 'admin' | 'candidate'); setCurrentPage('FORGOT_PASSWORD'); }} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {showHeader && (
        <Header 
            userRole={userRole} 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            onSignOut={handleSignOut} 
            onBack={handleGlobalBack}
        />
      )}
      <main className="flex-1 w-full relative overflow-y-auto">
        <div key={currentPage} className="w-full">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;