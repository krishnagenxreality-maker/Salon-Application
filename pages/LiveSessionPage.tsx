
import React, { useState, useEffect } from 'react';
import AnimationPlaceholder from '../components/AnimationPlaceholder';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '../components/Icons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/ServiceSteps';

interface LiveTimerProps {
  startTime: number;
}

const LiveTimer: React.FC<LiveTimerProps> = ({ startTime }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsedMs = now - startTime;
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return (
    <div className="fixed top-6 right-4 sm:right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg z-50 flex items-center gap-2 animate-fade-in">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <ClockIcon className="w-4 h-4 text-gray-500" />
      <p className="text-lg font-mono font-bold tabular-nums text-black">{minutes}:{seconds}</p>
    </div>
  );
};

interface LiveSessionPageProps {
  serviceName: string;
  onStepComplete: (duration: number) => void;
  onFinishSession: () => void;
  onExit: () => void;
}

const LiveSessionPage: React.FC<LiveSessionPageProps> = ({ serviceName, onStepComplete, onFinishSession, onExit }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStartTime, setStepStartTime] = useState<number | null>(null);

  // Dynamic Step Loading
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;
  const totalSteps = steps.length;
  const stepData = steps[currentStep];

  const handleBeginSession = () => {
      const now = Date.now();
      setSessionStartTime(now);
      setStepStartTime(now);
      setHasStarted(true);
  };

  const handleNext = () => {
    if (stepStartTime) {
        const duration = Date.now() - stepStartTime;
        onStepComplete(duration);
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setStepStartTime(Date.now());
    } else {
      onFinishSession();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setStepStartTime(Date.now());
    }
  };

  // Initial "Begin Session" View
  if (!hasStarted) {
      return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="max-w-2xl w-full text-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block">
                    Ready to Start
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-black tracking-tighter mb-6">
                    {serviceName}
                </h1>
                <p className="text-xl text-gray-500 mb-12">
                    Prepare your station. When you are ready to begin the service with the client, click the button below.
                </p>
                
                <div className="flex flex-col gap-4 items-center">
                    <button
                        onClick={handleBeginSession}
                        className="px-10 py-5 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Begin Session
                    </button>
                    <button 
                        onClick={onExit}
                        className="text-gray-400 hover:text-black text-sm font-medium transition-colors mt-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // Active Session View
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col animate-fade-in">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-light-grey z-50">
            <div 
                className="h-1 bg-black transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
        
        {sessionStartTime && <LiveTimer startTime={sessionStartTime} />}

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-12 pt-20 pb-32">
        <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Instructions */}
          <div className="animate-slide-up">
            <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                Step {currentStep + 1} / {totalSteps}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                    {serviceName}
                </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tighter mt-2">
              {stepData.title}
            </h2>
            <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed border-l-4 border-gray-200 pl-6">
              {stepData.instructions}
            </p>
          </div>

          {/* Right Column: Animation */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <AnimationPlaceholder />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/80 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 h-24 flex items-center justify-between">
           <button onClick={onExit} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
              Abort Session
            </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="h-12 px-4 sm:h-14 sm:px-6 border border-gray-300 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-black hover:bg-gray-50"
            >
              <ChevronLeftIcon className="w-5 h-5 text-black" />
               <span className="hidden sm:inline text-sm font-semibold tracking-wide ml-2">
                 Previous
               </span>
            </button>
            <button
              onClick={handleNext}
              className={`h-12 px-6 sm:h-14 sm:px-8 text-white flex items-center justify-center transition-colors rounded-full shadow-lg hover:shadow-xl ${
                  currentStep === totalSteps - 1 
                    ? 'bg-black hover:bg-green-600' 
                    : 'bg-black hover:bg-gray-800'
              }`}
            >
              <span className="text-sm font-semibold tracking-wide mr-2">
                 {currentStep === totalSteps - 1 ? 'Finish Session' : 'Next Step'}
              </span>
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LiveSessionPage;
