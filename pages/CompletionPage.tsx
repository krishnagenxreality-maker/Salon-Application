
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
            {Array.from({ length: 40 }).map((_, i) => (
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
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white animate-fade-in relative">
      <Confetti />
      
      {/* Main Split Content */}
      <div className="flex-1 flex flex-col md:flex-row items-stretch px-6 sm:px-12 md:px-16 gap-8 md:gap-16">
        
        {/* Left Half: Typography */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10">
          <span className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 animate-slide-up">Mission Accomplished</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black tracking-tight leading-[1.1] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Technique<br/>Completed
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-500 font-medium max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            You have mastered the <span className="text-black font-bold">{technique.title}</span>. Your technical precision is improving.
          </p>
        </div>

        {/* Right Half: Performance Summary Card */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-end py-4 md:py-12 z-10">
          <div className="w-full max-w-xl bg-white border border-gray-100 rounded-3xl shadow-xl flex flex-col max-h-[50vh] md:max-h-[65vh] overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold text-black tracking-tight">Performance Summary</h2>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Detailed Breakdown</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {technique.steps.map((step, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                        <div className="pr-4">
                            <p className="font-semibold text-black text-sm">{step.title}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Step {index + 1}</p>
                        </div>
                        <p className="text-sm font-mono font-semibold text-black">
                            {formatTime(stepTimings[index] || 0)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 flex justify-between items-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Time</p>
                <p className="text-xl font-bold text-black tabular-nums">
                    {formatTime(totalTime)}
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Center Footer Buttons */}
      <footer className="h-24 flex items-center justify-center gap-4 px-6 z-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onRestart}
          className="h-12 px-8 border-2 border-gray-200 text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black hover:text-white hover:border-black transition-all rounded-full"
        >
          Restart
        </button>
        <button
          onClick={onBackToLibrary}
          className="h-12 px-10 bg-black text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all rounded-full shadow-lg"
        >
          Back to Library
        </button>
      </footer>
    </div>
  );
};

export default CompletionPage;
