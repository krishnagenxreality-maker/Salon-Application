
import React, { useState } from 'react';
import { Technique } from '../types';
import TrainingFooter from '../components/TrainingFooter';
import AnimationPlaceholder from '../components/AnimationPlaceholder';
import LanguageModal from '../components/LanguageModal';
import { ArrowLeftIcon, SpeakerWaveIcon } from '../components/icons';

interface TrainingScreenProps {
  technique: Technique;
  onComplete: () => void;
  onBack: () => void;
}

const TrainingScreen: React.FC<TrainingScreenProps> = ({ technique, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const totalSteps = technique.steps.length;
  const stepData = technique.steps[currentStep - 1];

  if (totalSteps === 0) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-700">Training Not Available</h2>
            <p className="text-lg text-gray-500 mt-2">The steps for this technique are not yet configured.</p>
            <button onClick={onBack} className="mt-8 flex items-center gap-2 text-lg font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                <ArrowLeftIcon className="w-6 h-6" />
                Back to Library
            </button>
        </div>
    );
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="pb-28"> 
        <header className="mb-8">
            <button onClick={onBack} className="flex items-center gap-2 text-lg font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                <ArrowLeftIcon className="w-6 h-6" />
                Exit Training
            </button>
        </header>
        <main className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-purple-500 font-semibold">Step {currentStep}/{totalSteps}</p>
                    <h2 className="text-4xl font-bold text-gray-800 mt-1">{stepData.title}</h2>
                </div>
                <button onClick={() => setIsLangModalOpen(true)} className="p-4 bg-white/70 rounded-full shadow-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <SpeakerWaveIcon className="w-7 h-7 text-purple-600"/>
                </button>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed bg-white/50 p-6 rounded-2xl border border-white">
                {stepData.instruction}
            </p>
          </div>
          <div className="flex justify-center items-center h-full">
            <AnimationPlaceholder className="w-full max-w-md shadow-2xl" />
          </div>
        </main>
      </div>
      
      <LanguageModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
      
      <TrainingFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrev={handlePrev}
        onComplete={onComplete}
      />
    </>
  );
};

export default TrainingScreen;
