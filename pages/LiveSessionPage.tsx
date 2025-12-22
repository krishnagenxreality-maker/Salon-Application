
import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/AppIcons';
import { SERVICE_STEP_MAPPING, DEFAULT_STEPS } from '../data/serviceSteps';
import { SessionImage } from '../types';

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
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl">
      <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
      <p className="text-xs sm:text-sm font-black tabular-nums text-white tracking-widest">{minutes}:{seconds}</p>
    </div>
  );
};

interface LiveSessionPageProps {
  serviceName: string;
  onStepComplete: (duration: number) => void;
  onFinishSession: (images: SessionImage[]) => void;
  onExit: () => void;
  onBack?: () => void;
}

const LiveSessionPage: React.FC<LiveSessionPageProps> = ({ serviceName, onStepComplete, onFinishSession, onExit, onBack }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStartTime, setStepStartTime] = useState<number | null>(null);
  const [capturedImages, setCapturedImages] = useState<SessionImage[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;
  const totalSteps = steps.length;
  const stepData = steps[currentStep];

  const handleBegin = () => {
      const now = Date.now();
      setSessionStartTime(now);
      setStepStartTime(now);
      setHasStarted(true);
  };

  useEffect(() => {
    if (hasStarted) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            if (videoRef.current) videoRef.current.srcObject = stream;
        }).catch(err => console.error("Camera error:", err));
    }
  }, [hasStarted]);

  const handleCapture = () => {
      if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
          if (context) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
              context.drawImage(videoRef.current, 0, 0);
              const imageUrl = canvasRef.current.toDataURL('image/jpeg');
              setCapturedImages(prev => [...prev, { 
                stepIndex: currentStep, 
                stepTitle: stepData.title, 
                imageUrl, 
                timestamp: Date.now() 
              }]);
          }
      }
  };

  const handleNext = () => {
    if (stepStartTime) onStepComplete(Date.now() - stepStartTime);
    if (currentStep < totalSteps - 1) { 
        setCurrentStep(currentStep + 1); 
        setStepStartTime(Date.now()); 
    } else {
        onFinishSession(capturedImages);
    }
  };

  const handlePrev = () => { 
    if (currentStep > 0) {
        setCurrentStep(currentStep - 1); 
        setStepStartTime(Date.now());
    }
  };

  const BackgroundLayer = () => (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      <img 
        src="/images/service-bg.jpeg" 
        alt="" 
        className="w-full h-full object-cover opacity-50 scale-105"
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
    </div>
  );

  if (!hasStarted) {
      return (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in text-center overflow-hidden">
            <BackgroundLayer />
            <div className="relative z-10 animate-fade-in-up">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-2xl">
                    {serviceName}
                </h1>
                <p className="text-base sm:text-xl text-white/40 mb-10 max-w-md mx-auto font-bold uppercase tracking-[0.4em]">
                    Ready to Initiate
                </p>
                <button 
                    onClick={handleBegin} 
                    className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                    Begin Session
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col animate-fade-in overflow-hidden">
        <BackgroundLayer />
        
        {/* Main Content Area - Refined for "Cleaner" Appearance */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-10 sm:px-20 lg:px-32 pt-24 pb-32 overflow-y-auto no-scrollbar gap-10 lg:gap-24">
            
            {/* Step Description - Reduced text sizes */}
            <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up">
                <span className="text-[9px] font-black text-white/30 tracking-[0.6em] uppercase mb-4 block">
                  STEP {currentStep + 1} / {totalSteps}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl mb-6">
                  {stepData.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-white/50 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {stepData.instructions}
                </p>
            </div>
            
            {/* Camera Preview - Slightly smaller scale */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative w-full aspect-[3/4] max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] bg-black rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    <button 
                      onClick={handleCapture} 
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 flex items-center justify-center group"
                    >
                      <CameraIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>

        {/* REFINED FOOTER - SLIMMER AND PERFECTLY ALIGNED */}
        <footer className="fixed bottom-0 left-0 right-0 h-24 sm:h-28 flex items-center justify-between px-10 sm:px-20 lg:px-32 z-50">
            
            {/* Left Cluster: EXIT | TIMER */}
            <div className="flex items-center gap-4 sm:gap-6 h-full">
                <button 
                    onClick={onExit} 
                    className="text-[9px] sm:text-[10px] font-black text-red-600 hover:text-red-500 uppercase tracking-[0.4em] transition-all whitespace-nowrap drop-shadow-lg"
                >
                    EXIT
                </button>
                <div className="h-5 w-[1px] bg-white/10" />
                {sessionStartTime && <LiveTimer startTime={sessionStartTime} />}
            </div>
            
            {/* Right Cluster: Nav Buttons - Scaled down for cleanliness */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button 
                    onClick={handlePrev} 
                    disabled={currentStep === 0} 
                    className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full border border-white/5 text-white disabled:opacity-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all active:scale-90"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button 
                    onClick={handleNext} 
                    className="h-11 sm:h-12 px-8 sm:px-10 bg-white text-black rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    {currentStep === totalSteps - 1 ? 'Finish' : 'Next Step'}
                  </span>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
            </div>
        </footer>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
    </div>
  );
};

export default LiveSessionPage;
