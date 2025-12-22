
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
        <div className="absolute inset-0 pointer-events-none z-20">
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
    <div className="fixed inset-0 w-full h-full flex flex-col items-center animate-fade-in bg-black overflow-y-auto custom-scrollbar">
      
      {/* GLOSSY BLACK BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0">
        {/* Deep radial glow for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#000000_100%)]" />
        
        {/* Glossy top-down shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.03)_50%,transparent_60%)] animate-shimmer" />
      </div>

      <Confetti />
      
      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 lg:px-24 pt-28 sm:pt-32 pb-44">
        
        {/* Left Side: Editorial Typography */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left animate-fade-in-up mb-12 md:mb-0">
          <span className="text-[9px] md:text-xs font-black text-white/40 uppercase tracking-[0.5em] mb-4 block drop-shadow-lg">
            MISSION ACCOMPLISHED
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6 sm:mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            Technique<br/><span className="text-white/80">Completed</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/60 font-medium max-w-md leading-relaxed drop-shadow-md mx-auto md:mx-0">
            You have mastered the <span className="text-white font-bold">{technique.title}</span>. Your technical precision is reaching professional standards.
          </p>
        </div>

        {/* Right Side: Performance Summary Card */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-full max-w-lg bg-black/60 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden border border-white/5">
            {/* Card Header */}
            <div className="p-6 sm:p-8 pb-4">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Performance Summary</h2>
              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-1">Detailed Breakdown</p>
            </div>
            
            {/* Scrollable Steps List */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4 sm:space-y-6 custom-scrollbar max-h-[35vh] md:max-h-[40vh]">
                {technique.steps.map((step, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                        <div className="flex-1 pr-4">
                            <p className="font-bold text-white text-[13px] sm:text-sm uppercase leading-tight line-clamp-1">{step.title}</p>
                            <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mt-1">Step {index + 1}</p>
                        </div>
                        <p className="text-[13px] sm:text-sm font-black text-white tabular-nums drop-shadow-sm">
                            {formatTime(stepTimings[index] || 0)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Total Time Footer */}
            <div className="p-6 sm:p-8 bg-white/[0.03] flex justify-between items-center border-t border-white/5">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Total Time</p>
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {formatTime(totalTime)}
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Pill Footer Buttons */}
      <footer className="fixed bottom-8 left-0 right-0 h-auto flex flex-row items-center justify-center gap-3 sm:gap-6 px-6 z-30 animate-fade-in-up pointer-events-none" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onRestart}
          className="pointer-events-auto h-12 sm:h-14 px-8 sm:px-12 border border-white/10 text-white text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/10 transition-all rounded-full bg-white/5 backdrop-blur-xl"
        >
          RESTART
        </button>
        <button
          onClick={onBackToLibrary}
          className="pointer-events-auto h-12 sm:h-14 px-8 sm:px-12 bg-white text-black text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all rounded-full shadow-[0_20px_60px_rgba(255,255,255,0.15)]"
        >
          BACK TO LIBRARY
        </button>
      </footer>

      <style>{`
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #fff;
          opacity: 0.2;
          border-radius: 50%;
          animation: confetti-fall 4s linear infinite;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0.5; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 8s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CompletionPage;
