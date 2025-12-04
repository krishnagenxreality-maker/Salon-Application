import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Technique } from '../types';
import AnimationPlaceholder from '../components/AnimationPlaceholder';
import { VoiceIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, ArrowPathIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '../components/AppIcons';

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
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md z-50 transition-colors duration-300">
      <p className="text-sm sm:text-base md:text-lg font-semibold tabular-nums text-black dark:text-white">{minutes}:{seconds}</p>
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
  const [isSpeaking, setIsSpeaking] = useState(false); // Track active speech state
  const [isPaused, setIsPaused] = useState(false); // Track paused state
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  
  // Video Controls State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false); // Track video loading errors

  const totalSteps = technique.steps.length;
  const stepData = technique.steps[currentStep];

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Function to play audio
  const playInstructions = useCallback(() => {
      // Don't play if muted
      if (isMuted) return;

      // Cancel any current speech first
      window.speechSynthesis.cancel();
      setIsPaused(false);

      const utterance = new SpeechSynthesisUtterance(stepData.instructions);
      
      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Priority list for "High Quality Female Voices"
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google US English') || 
        voice.name.includes('Microsoft Zira') || 
        voice.name.includes('Samantha') ||
        (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'))
      );

      const fallbackVoice = voices.find(voice => voice.lang === 'en-US');

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
      
      utterance.pitch = 1.2; // Higher pitch for "girl" voice
      utterance.rate = 1.0;  // Normal speed

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
  }, [stepData, isMuted]);

  // Handle Step Change: Reset timer, video error state AND Auto-play Audio
  useEffect(() => {
    setStepStartTime(Date.now());
    
    // Reset video state on step change
    setIsVideoPlaying(true);
    setVideoError(false);

    // Small timeout to ensure browser is ready for the new utterance
    // Only auto-play if NOT muted
    if (!isMuted) {
      const timer = setTimeout(() => {
          playInstructions();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep, playInstructions, isMuted]);

  const handleVoiceToggle = () => {
    if (isMuted) return; // Controls are disabled if muted

    if (isSpeaking) {
        if (isPaused) {
            // Resume if currently paused
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            // Pause if currently speaking
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    } else {
        // Play if stopped
        playInstructions();
    }
  };

  const handleReplayVoice = () => {
    if (isMuted) return;
    playInstructions();
  };

  const toggleMute = () => {
    if (isMuted) {
        setIsMuted(false);
        // We don't auto-play immediately when unmute, waiting for next step or manual play is better UX
    } else {
        setIsMuted(true);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleNext = () => {
    const duration = Date.now() - stepStartTime;
    onStepComplete(duration);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
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
        
        <LiveTimer startTime={trainingStartTime} />

      {/* Main Content Area - Responsive Layout */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-20 pb-32 sm:pb-36 min-h-[calc(100vh-100px)]">
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Instructions */}
          <div className="animate-slide-up order-2 md:order-1">
            <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-500 tracking-widest uppercase block mb-2">
              Step {currentStep + 1} / {totalSteps}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black dark:text-white tracking-tighter">
              {stepData.title}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {stepData.instructions}
            </p>
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
              {/* Voice Controls */}
              
              {/* Play/Pause Button */}
              <button 
                onClick={handleVoiceToggle}
                disabled={isMuted}
                className={`h-10 w-10 sm:h-12 sm:w-12 border rounded-full flex items-center justify-center transition-all duration-300 ${
                  isMuted 
                    ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : isSpeaking && !isPaused
                        ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-lg' 
                        : 'border-gray-300 dark:border-white text-black dark:text-white hover:bg-light-grey dark:hover:bg-gray-800'
                }`}
                title={isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Play'}
              >
                {isSpeaking ? (
                    isPaused ? <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                    <VoiceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>

              {/* Replay Button */}
              <button 
                onClick={handleReplayVoice}
                disabled={isMuted}
                className={`h-10 w-10 sm:h-12 sm:w-12 border rounded-full flex items-center justify-center transition-all duration-300 ${
                    isMuted 
                    ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'border-gray-300 dark:border-white text-black dark:text-white hover:bg-light-grey dark:hover:bg-gray-800'
                }`}
                title="Replay Voice Instructions"
              >
                 <ArrowPathIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Mute Button */}
              <button 
                onClick={toggleMute}
                className={`h-10 w-10 sm:h-12 sm:w-12 border rounded-full flex items-center justify-center transition-all duration-300 ${
                    isMuted 
                     ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400' 
                     : 'border-gray-300 dark:border-white text-black dark:text-white hover:bg-light-grey dark:hover:bg-gray-800'
                }`}
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                 {isMuted ? <SpeakerXMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <SpeakerWaveIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>

              <div className="flex flex-col ml-1">
                 <span className={`text-sm font-medium transition-colors ${isMuted ? 'text-gray-400 dark:text-gray-500' : 'text-black dark:text-white'}`}>
                    {isMuted ? 'Voice Muted' : (isSpeaking ? (isPaused ? 'Paused' : 'Speaking...') : 'Read Instructions')}
                 </span>
                 {isMuted && <span className="text-[10px] text-gray-400 dark:text-gray-600">Auto-play disabled</span>}
              </div>

            </div>
          </div>

          {/* Right Column: Animation or Video or Image */}
          <div className="animate-slide-up flex justify-center order-1 md:order-2" style={{ animationDelay: '0.2s' }}>
            {stepData.videoUrl && !videoError ? (
               <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-xl group">
                  <video
                    ref={videoRef}
                    key={stepData.videoUrl}
                    src={stepData.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={toggleVideo} 
                        className="text-white hover:text-gray-200 transition-colors p-1"
                        title={isVideoPlaying ? "Pause Video" : "Play Video"}
                    >
                        {isVideoPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                    </button>
                    <div className="w-px h-4 bg-white/30"></div>
                    <button 
                        onClick={replayVideo} 
                        className="text-white hover:text-gray-200 transition-colors p-1"
                        title="Replay Video"
                    >
                        <ArrowPathIcon className="w-6 h-6" />
                    </button>
                  </div>
               </div>
            ) : stepData.imageUrl ? (
               <div className="relative w-full max-w-xs sm:max-w-sm aspect-[3/4] bg-light-grey dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={stepData.imageUrl} 
                    alt={stepData.title} 
                    className="w-full h-full object-cover"
                  />
               </div>
            ) : (
              <AnimationPlaceholder />
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200/80 dark:border-gray-800 z-40 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 h-20 sm:h-24 flex items-center justify-between">
           <button onClick={onExit} className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              Exit
            </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="h-10 px-4 sm:h-12 sm:px-6 border border-gray-300 dark:border-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-black dark:hover:bg-gray-200 text-black dark:text-white dark:hover:text-black"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white dark:group-hover:text-black" />
               <span className="hidden sm:inline text-sm font-semibold tracking-wide ml-2">
                 Previous
               </span>
            </button>
            <button
              onClick={handleNext}
              className="h-10 px-5 sm:h-12 sm:px-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full"
            >
              <span className="text-sm font-semibold tracking-wide mr-2">
                 {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
              </span>
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-black" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrainingPage;