
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface TrainingFooterProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

const TrainingFooter: React.FC<TrainingFooterProps> = ({ currentStep, totalSteps, onNext, onPrev, onComplete }) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/50 backdrop-blur-lg border-t border-white/70">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 py-3 px-6 rounded-full font-semibold text-lg bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index + 1 === currentStep ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={isLastStep ? onComplete : onNext}
          className={`flex items-center gap-2 py-3 px-6 rounded-full font-semibold text-lg text-white transition-all ${isLastStep ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {isLastStep ? 'Complete' : 'Next'}
          {!isLastStep && <ArrowRightIcon className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default TrainingFooter;
