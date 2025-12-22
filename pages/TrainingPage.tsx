
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Technique } from '../types';
import { VoiceIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, ArrowPathIcon } from '../components/AppIcons';

const DEFAULT_BG = '/images/auth-bg.jpeg';

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
    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5 backdrop-blur-md">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span className="text-sm md:text-base font-black tabular-nums text-white tracking-widest">{minutes}:{seconds}</span>
    </div>
  );
};

interface TrainingPageProps {
  technique: Technique;
  trainingStartTime: number;
  onStepComplete: (duration: number) => void;
  onComplete: () => void;
  onExit: () => void;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ technique, trainingStartTime, onStepComplete, onComplete, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = technique.steps.length;
  const stepData = technique.steps[currentStep];

  const playInstructions = useCallback(() => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stepData.instructions);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  }, [stepData]);

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const replaySpeech = () => {
    playInstructions();
  };

  useEffect(() => {
    setStepStartTime(Date.now());
    playInstructions();
    return () => window.speechSynthesis.cancel();
  }, [currentStep, playInstructions]);

  const handleNext = () => {
    onStepComplete(Date.now() - stepStartTime);
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  const handlePrev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-hidden animate-fade-in">
      
      {/* PERSISTENT CINEMATIC BACKGROUND - 80% Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-80"
          style={{ 
            backgroundImage: `url("${DEFAULT_BG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/95 via-black/40 to-black/95 z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1.5px] z-[2]" />
      </div>

      {/* Progress Bar Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-[100]">
          <div 
            className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
      </div>
      
      {/* Main Content Container - Optimized for Responsive Sizes */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20 gap-8 md:gap-16 lg:gap-24 pt-24 md:pt-16 pb-36 overflow-y-auto no-scrollbar">
        
        {/* Left: Text Info - Focused Typography with Responsive Sizing */}
        <div className="w-full md:w-[55%] text-center md:text-left animate-fade-in-up">
          <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-3 md:mb-5 block">
            STEP {currentStep + 1} OF {totalSteps}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-tight uppercase mb-5 md:mb-8 drop-shadow-2xl">
            {stepData.title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-md leading-relaxed font-medium mb-6 md:mb-8 drop-shadow-xl mx-auto md:mx-0">
            {stepData.instructions}
          </p>
          
          {/* Voice Controls Cluster */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <button 
              onClick={pauseSpeech}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center group"
            >
              {isPaused ? <PlayIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" /> : <PauseIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 group-hover:text-white" />}
            </button>
            <button 
              onClick={replaySpeech}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center group"
            >
              <ArrowPathIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 group-hover:text-white" />
            </button>
            <div className="flex items-center gap-2.5 ml-1">
              <VoiceIcon className={`w-3.5 h-3.5 ${isSpeaking ? 'text-white animate-pulse' : 'text-white/20'}`} />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap hidden xs:block">
                {isPaused ? 'Voice Paused' : isSpeaking ? 'Audio Active' : 'Voice Ready'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Right: Visual Support - Responsive Scaling */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-[4/5] bg-white/[0.05] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/10">
                {stepData.videoUrl ? (
                    <video 
                      ref={videoRef} 
                      key={stepData.videoUrl} 
                      src={stepData.videoUrl} 
                      className="w-full h-full object-cover" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                    />
                ) : (
                    <img 
                      src={stepData.imageUrl || technique.imageUrl} 
                      className="w-full h-full object-cover opacity-90" 
                      alt="Step Visualization"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
        </div>
      </div>

      {/* Modern Open Footer Navigation - Updated Padding for Precise Positioning */}
      <footer className="fixed bottom-0 left-0 right-0 h-24 md:h-32 flex items-center justify-between px-12 sm:px-20 md:px-44 z-[100] pointer-events-none">
          
          {/* Left: Exit + Timer Combined - Pulled inwards from left wall */}
          <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
            <button 
              onClick={onExit} 
              className="text-[9px] md:text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest transition-all whitespace-nowrap"
            >
              Exit
            </button>
            <div className="h-6 w-[1px] bg-white/5 hidden sm:block"></div>
            <LiveTimer startTime={trainingStartTime} />
          </div>
          
          {/* Right: Step Navigation - Pulled inwards from right wall */}
          <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
              <button 
                onClick={handlePrev} 
                disabled={currentStep === 0} 
                className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full border border-white/10 text-white disabled:opacity-5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all active:scale-90"
              >
                  <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext} 
                className="h-10 md:h-12 px-6 md:px-14 bg-white text-black rounded-full flex items-center gap-2 md:gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,255,255,0.15)]"
              >
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
                    {currentStep === totalSteps - 1 ? 'Finish Module' : 'Next'}
                  </span>
                  <ChevronRightIcon className="w-3 md:w-3.5 h-3 md:h-3.5" />
              </button>
          </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 400px) {
          .xs\\:block { display: none; }
        }
      `}</style>
    </div>
  );
};

export default TrainingPage;
