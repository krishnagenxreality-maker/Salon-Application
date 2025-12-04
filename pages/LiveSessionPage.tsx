import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, UserCircleIcon, CameraIcon } from '../components/AppIcons';
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
    <div className="fixed top-20 sm:top-24 right-4 sm:right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg z-40 flex items-center gap-2 animate-fade-in transition-colors duration-300">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
      <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-white" />
      <p className="text-sm sm:text-lg font-mono font-bold tabular-nums text-black dark:text-white">{minutes}:{seconds}</p>
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
  
  // State to capture customer request during consultation
  const [customerRequest, setCustomerRequest] = useState('');
  
  // Camera State
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImages, setCapturedImages] = useState<SessionImage[]>([]);
  const [cameraError, setCameraError] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false); // State for flash effect

  // Dynamic Step Loading
  const steps = SERVICE_STEP_MAPPING[serviceName] || DEFAULT_STEPS;
  const totalSteps = steps.length;
  const stepData = steps[currentStep];
  
  // Check if current step is a consultation step
  const isConsultationStep = stepData.title.toLowerCase().includes('customer requirements');

  const handleBeginSession = () => {
      const now = Date.now();
      setSessionStartTime(now);
      setStepStartTime(now);
      setHasStarted(true);
  };

  // Camera Logic
  useEffect(() => {
    if (hasStarted) {
        let stream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user', aspectRatio: 3/4 } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setCameraError(false);
            } catch (err) {
                console.error("Error accessing camera:", err);
                setCameraError(true);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }
  }, [hasStarted]);

  const handleCapture = () => {
      if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          
          if (context) {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw current frame
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to data URL
            const imageUrl = canvas.toDataURL('image/jpeg');
            
            // Add to state
            setCapturedImages(prev => [
                ...prev, 
                {
                    stepIndex: currentStep,
                    stepTitle: stepData.title,
                    imageUrl,
                    timestamp: Date.now()
                }
            ]);
            
            // Trigger Flash Effect
            setIsFlashing(true);
            setTimeout(() => {
                setIsFlashing(false);
            }, 150);
          }
      }
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
      onFinishSession(capturedImages);
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
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 animate-fade-in text-center transition-colors duration-300">
            <div className="max-w-2xl w-full">
                <span className="px-3 py-1 sm:px-4 sm:py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 sm:mb-6 inline-block">
                    Ready to Start
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black dark:text-white tracking-tighter mb-4 sm:mb-6 leading-tight">
                    {serviceName}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 font-light max-w-lg mx-auto">
                    Prepare your station. When you are ready to begin the service with the client, click the button below.
                </p>
                
                <div className="flex flex-col gap-4 items-center">
                    <button
                        onClick={handleBeginSession}
                        className="px-8 sm:px-12 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black text-base sm:text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                    >
                        Begin Session
                    </button>
                    <button 
                        onClick={onExit}
                        className="text-gray-400 hover:text-red-500 text-xs sm:text-sm font-semibold transition-colors mt-2 sm:mt-4"
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
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col animate-fade-in relative transition-colors duration-300">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-light-grey dark:bg-gray-800 z-50">
            <div 
                className="h-1 bg-black dark:bg-white transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
        
        {sessionStartTime && <LiveTimer startTime={sessionStartTime} />}

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-12 pt-28 pb-32 sm:pb-36 min-h-[calc(100vh-100px)]">
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Instructions */}
          <div className="animate-slide-up order-2 md:order-1">
            <div className="mb-2 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
                Step {currentStep + 1} / {totalSteps}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600 hidden sm:block"></span>
                <span className="text-xs sm:text-sm font-semibold text-black dark:text-white uppercase tracking-wide hidden sm:block">
                    {serviceName}
                </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tighter mt-1 sm:mt-2">
              {stepData.title}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-gray-100 dark:border-gray-800 pl-4 sm:pl-6">
              {stepData.instructions}
            </p>

            {/* Customer Request Input - Only visible on Consultation steps */}
            {isConsultationStep && (
                <div className="mt-6 sm:mt-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-sm font-bold text-black dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                        <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                        Customer Request / Style
                    </label>
                    <textarea
                        value={customerRequest}
                        onChange={(e) => setCustomerRequest(e.target.value)}
                        placeholder="Enter the customer's desired style, length, or specific requests here..."
                        className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all min-h-[100px] sm:min-h-[120px] text-sm sm:text-base resize-none"
                    />
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Record the specific style requirements discussed with the client.
                    </p>
                </div>
            )}
          </div>

          {/* Right Column: Live Camera Feed */}
          <div className="animate-slide-up order-1 md:order-2 flex justify-center" style={{ animationDelay: '0.2s' }}>
             <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-2xl group">
                 {!cameraError ? (
                     <div className="relative w-full h-full">
                         <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                         />
                         {/* Flash Effect Overlay */}
                         <div 
                            className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 ease-out z-10 ${isFlashing ? 'opacity-100' : 'opacity-0'}`}
                         />
                     </div>
                 ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white p-4 text-center">
                         <p className="font-bold mb-2">Camera Unavailable</p>
                         <p className="text-xs text-gray-400">Please check permissions and try again.</p>
                     </div>
                 )}

                 {/* Hidden Canvas for Capture */}
                 <canvas ref={canvasRef} className="hidden" />

                 {/* Capture Overlay */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <button 
                        onClick={handleCapture}
                        disabled={cameraError}
                        className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 border-4 border-gray-200"
                        title="Take Picture"
                    >
                        <CameraIcon className="w-8 h-8 text-black" />
                    </button>
                 </div>
                 
                 {/* Live Badge */}
                 <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse z-20">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     LIVE
                 </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200/80 dark:border-gray-800 z-40 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 h-20 sm:h-24 flex items-center justify-between">
           <button onClick={onExit} className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              Abort
            </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="h-10 px-4 sm:h-12 sm:px-6 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-black dark:hover:border-white text-black dark:text-white"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
               <span className="hidden sm:inline text-sm font-semibold tracking-wide ml-2">
                 Previous
               </span>
            </button>
            <button
              onClick={handleNext}
              className={`h-10 px-5 sm:h-12 sm:px-8 text-white dark:text-black flex items-center justify-center transition-colors rounded-full shadow-lg ${
                  currentStep === totalSteps - 1 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200'
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-wide mr-2 whitespace-nowrap">
                 {currentStep === totalSteps - 1 ? 'Finish Session' : 'Next Step'}
              </span>
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-black" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LiveSessionPage;