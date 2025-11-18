import React, { useState } from 'react';
import { Technique } from '../types';
import AnimationPlaceholder from '../components/AnimationPlaceholder';
import { VoiceIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

interface TrainingPageProps {
  technique: Technique;
  onComplete: () => void;
  onExit: () => void;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ technique, onComplete, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = technique.steps.length;
  const stepData = technique.steps[currentStep];

  const handleNext = () => {
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
    <div className="w-full min-h-screen bg-white flex flex-col animate-fade-in">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-light-grey z-50">
            <div 
                className="h-1 bg-black transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>

      <div className="flex-grow flex items-center justify-center px-6 md:px-12 pt-16 pb-32">
        <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left Column: Instructions */}
          <div className="animate-slide-up">
            <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
              Step {currentStep + 1} / {totalSteps}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tighter mt-2">
              {stepData.title}
            </h2>
            <p className="mt-6 text-base text-gray-700 leading-relaxed">
              {stepData.instructions}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button className="h-12 w-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-light-grey transition-colors">
                <VoiceIcon className="w-6 h-6 text-black" />
              </button>
              <button className="text-sm font-medium text-black underline">
                English (UK)
              </button>
            </div>
          </div>

          {/* Right Column: Animation */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <AnimationPlaceholder />
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/80 z-40">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-28 flex items-center justify-between">
           <button onClick={onExit} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              Exit Training
            </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-8 h-14 border border-gray-300 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
            >
              <ChevronLeftIcon className="w-5 h-5 text-black" />
               <span className="text-sm font-semibold tracking-wide ml-2">
                 Previous
               </span>
            </button>
            <button
              onClick={handleNext}
              className="h-14 px-10 bg-black text-white flex items-center justify-center transition-colors hover:bg-gray-800 rounded-full"
            >
              <span className="text-sm font-semibold tracking-wide mr-2">
                 {currentStep === totalSteps - 1 ? 'Finish' : 'Next Step'}
              </span>
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrainingPage;