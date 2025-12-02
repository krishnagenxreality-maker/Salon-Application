
import React from 'react';
import { Technique } from '../types';

interface CompletionPageProps {
  technique: Technique;
  stepTimings: number[];
  onRestart: () => void;
  onBackToLibrary: () => void;
}

const Confetti: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`,
                    }}
                />
            ))}
        </div>
    );
};

const formatTime = (ms: number) => {
  if (ms < 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};


const CompletionPage: React.FC<CompletionPageProps> = ({ technique, stepTimings, onRestart, onBackToLibrary }) => {
  const totalTime = stepTimings.reduce((sum, time) => sum + time, 0);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-center p-4 sm:p-6 pt-32 md:pt-40 animate-fade-in confetti-container transition-colors duration-300">
      <Confetti />
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black dark:text-white tracking-tighter leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Technique Completed
        </h1>
        <p className="mt-2 sm:mt-4 text-base sm:text-xl text-gray-600 dark:text-gray-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          You have successfully mastered the <span className="font-semibold text-black dark:text-white">{technique.title}</span> technique.
        </p>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 my-8 sm:my-10 text-left animate-slide-up shadow-sm" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight mb-1">Performance Summary</h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">Your time to complete each step of the {technique.title} technique.</p>
            
            <div className="space-y-3 sm:space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {technique.steps.map((step, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                        <div className="pr-4">
                            <p className="font-semibold text-black dark:text-white text-sm sm:text-base">{step.title}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Step {index + 1}</p>
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-black dark:text-white tabular-nums">
                            {formatTime(stepTimings[index] || 0)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-300 dark:border-gray-600">
                <p className="text-base sm:text-lg font-bold text-black dark:text-white">Total Time</p>
                <p className="text-lg sm:text-xl font-extrabold text-black dark:text-white tabular-nums">
                    {formatTime(totalTime)}
                </p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up pb-8" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onRestart}
            className="border border-gray-300 dark:border-gray-600 text-black dark:text-white text-sm font-semibold tracking-wide uppercase px-8 py-3 sm:px-10 sm:py-4 w-full sm:w-auto hover:border-black dark:hover:border-white transition-colors rounded-full"
          >
            Restart Technique
          </button>
          <button
            onClick={onBackToLibrary}
            className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold tracking-wide uppercase px-8 py-3 sm:px-10 sm:py-4 w-full sm:w-auto hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-full shadow-lg"
          >
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
