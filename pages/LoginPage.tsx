
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
    <div className="fixed top-8 right-12 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 z-50">
      <p className="text-xl font-black tabular-nums text-white drop-shadow-md">{minutes}:{seconds}</p>
    </div>
  );
};

interface LiveSessionPageProps {
  serviceName: string;
  onStepComplete: (duration: number) => void;
  onFinishSession: (images: SessionImage[]) => void;
  onExit: () => void;
}

const LiveSessionPage: React.FC<LiveSessionPageProps> = ({ serviceName, onStepComplete, onFinishSession, onExit }) => {
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

  if (!hasStarted) {
      return (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in text-center overflow-hidden">
            {/* CINEMATIC BACKGROUND SYSTEM - 80% OPACITY IMAGE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/images/service-bg.jpeg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-black/10 z-[1]" />
            </div>

            <div className="relative z-10 animate-fade-in-up">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-6 drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
                    {serviceName}
                </h1>
                <p className="text-xl sm:text-2xl text-white mb-12 max-w-lg mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,1)] font-black uppercase tracking-wider">
                    Prepare your workstation for the live session.
                </p>
                <button 
                    onClick={handleBegin} 
                    className="bg-white text-black px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all hover:scale-105 active:scale-95 border border-white/40"
                >
                    Begin Session
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col animate-fade-in overflow-hidden">
        {/* CINEMATIC BACKGROUND SYSTEM (ACTIVE SESSION) - 80% OPACITY IMAGE */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/service-bg.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/15 z-[1]" />
        </div>

        {sessionStartTime && <LiveTimer startTime={sessionStartTime} />}
        
        <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center px-8 sm:px-12 md:px-20 pt-24 gap-12 md:gap-24">
            <div className="w-full md:w-1/2 animate-fade-in-up">
                <span className="text-[10px] font-black text-white tracking-[0.5em] uppercase mb-4 block drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  Step {currentStep + 1} / {totalSteps}
                </span>
                <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
                  {stepData.title}
                </h2>
                <p className="mt-8 text-xl lg:text-2xl text-white font-black leading-relaxed drop-shadow-[0_5px_30px_rgba(0,0,0,1)]">
                  {stepData.instructions}
                </p>
            </div>
            
            <div className="w-full md:w-1/2 aspect-[3/4] max-w-sm bg-black rounded-[3rem] overflow-hidden border-4 border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.95)] relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                <canvas ref={canvasRef} className="hidden" />
                <button 
                  onClick={handleCapture} 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 h-20 w-20 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all z-20 flex items-center justify-center group"
                >
                  <CameraIcon className="w-10 h-10 text-black group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>

        <footer className="relative z-20 h-32 flex items-center justify-between px-8 sm:px-12 md:px-20 border-t border-white/20 bg-black/70 backdrop-blur-3xl">
            <button onClick={onExit} className="text-[10px] font-black text-white/50 hover:text-red-500 uppercase tracking-widest transition-colors drop-shadow-lg">Abort Session</button>
            <div className="flex items-center gap-4">
                <button onClick={handlePrev} disabled={currentStep === 0} className="h-14 w-14 flex items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-20 hover:bg-white/20 transition-all active:scale-90 bg-white/5">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={handleNext} 
                    className="h-14 px-10 bg-white text-black rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/40"
                >
                  {currentStep === totalSteps - 1 ? 'Finish Session' : 'Next Step'}
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </footer>

        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(25px); filter: blur(10px); }
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
