
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
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      <span className="text-sm sm:text-base font-black tabular-nums text-white tracking-[0.2em]">{minutes}:{seconds}</span>
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
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-y-auto custom-scrollbar animate-fade-in">
      
      {/* PERSISTENT CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            backgroundImage: `url("${DEFAULT_BG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/60 to-black z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-[2]" />
      </div>

      {/* Progress Bar Top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-[100]">
          <div 
            className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,1)]" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-16 py-32 md:py-24 gap-12 md:gap-20">
        
        {/* Left: Text Info */}
        <div className="w-full md:w-3/5 text-center md:text-left animate-fade-in-up">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] block">
              Step {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
            <div className="h-px w-8 bg-white/10 hidden sm:block"></div>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight uppercase mb-6 sm:mb-10 drop-shadow-2xl">
            {stepData.title}
          </h2>
          
          <p className="text-base sm:text-lg text-white/50 max-w-lg leading-relaxed font-medium mb-10 sm:mb-14 drop-shadow-xl mx-auto md:mx-0">
            {stepData.instructions}
          </p>
          
          {/* Voice Controls Cluster */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <button 
              onClick={pauseSpeech}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center group shadow-xl"
            >
              {isPaused ? <PlayIcon className="w-4 h-4 text-white" /> : <PauseIcon className="w-4 h-4 text-white/60 group-hover:text-white" />}
            </button>
            <button 
              onClick={replaySpeech}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center group shadow-xl"
            >
              <ArrowPathIcon className="w-4 h-4 text-white/60 group-hover:text-white" />
            </button>
            <div className="flex items-center gap-3 ml-4">
              <VoiceIcon className={`w-4 h-4 ${isSpeaking ? 'text-white animate-pulse' : 'text-white/20'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30 hidden xs:block">
                {isPaused ? 'Voice Interrupted' : isSpeaking ? 'Transmitting audio' : 'Standby'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Right: Visual Support */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-[4/5] bg-white/[0.05] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10">
                {stepData.videoUrl ? (
                    <video 
                      ref={videoRef} 
                      key={stepData.videoUrl} 
                      src={stepData.videoUrl} 
                      className="w-full h-full object-cover grayscale-[20%]" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                    />
                ) : (
                    <img 
                      src={stepData.imageUrl || technique.imageUrl} 
                      className="w-full h-full object-cover grayscale-[20%]" 
                      alt="Procedure Visual"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
        </div>
      </div>

      {/* Persistent Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 h-28 sm:h-32 flex items-center justify-between px-8 sm:px-16 md:px-24 z-50 pointer-events-none">
          
          {/* Left: Exit + Timer */}
          <div className="flex items-center gap-4 sm:gap-8 pointer-events-auto">
            <button 
              onClick={onExit} 
              className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-[0.4em] transition-all drop-shadow-md"
            >
              EXIT
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <LiveTimer startTime={trainingStartTime} />
          </div>
          
          {/* Right: Step Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
              <button 
                onClick={handlePrev} 
                disabled={currentStep === 0} 
                className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 text-white disabled:opacity-0 bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all active:scale-90"
              >
                  <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext} 
                className="h-12 sm:h-14 px-8 sm:px-16 bg-white text-black rounded-full flex items-center gap-4 hover:bg-silver active:scale-95 transition-all shadow-2xl"
              >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                    {currentStep === totalSteps - 1 ? 'Complete' : 'Advance'}
                  </span>
                  <ChevronRightIcon className="w-4 h-4" />
              </button>
          </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TrainingPage;
