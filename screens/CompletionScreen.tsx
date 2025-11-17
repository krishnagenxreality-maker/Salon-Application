
import React from 'react';
import Confetti from '../components/Confetti';
import AnimationPlaceholder from '../components/AnimationPlaceholder';

interface CompletionScreenProps {
  onRestart: () => void;
  onBackToLibrary: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onRestart, onBackToLibrary }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
      <Confetti />
      <div className="relative z-10 space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-800">
          Technique Completed!
        </h1>
        <p className="text-xl text-gray-600">Congratulations! You've successfully completed the training module.</p>
        
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
             <AnimationPlaceholder className="shadow-2xl" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border border-white text-purple-600 font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            Restart Technique
          </button>
          <button
            onClick={onBackToLibrary}
            className="w-full sm:w-auto bg-purple-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
