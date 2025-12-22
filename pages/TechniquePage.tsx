
import React from 'react';
import { Technique } from '../types';

const DEFAULT_BG = '/images/auth-bg.jpeg';

interface TechniquePageProps {
  technique: Technique;
  onStartTraining: (technique: Technique) => void;
  onBack: () => void;
}

const TechniquePage: React.FC<TechniquePageProps> = ({ technique, onStartTraining }) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-y-auto custom-scrollbar animate-fade-in">
      
      {/* PERSISTENT CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            backgroundImage: `url("${DEFAULT_BG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-[2]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-32 md:py-20 gap-12 md:gap-20 lg:gap-32">
        
        {/* LEFT SECTION: Visual Anchor */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in-up">
            <div className="relative group w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] bg-white/[0.05] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10">
                <img 
                    src={technique.imageUrl} 
                    alt={technique.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
        </div>

        {/* RIGHT SECTION: Content Engine */}
        <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up flex flex-col justify-center" style={{ animationDelay: '0.2s' }}>
          <span className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-[0.6em] mb-4 sm:mb-8 block">
            {technique.category}
          </span>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6 sm:mb-10 drop-shadow-2xl">
            {technique.title}
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg text-white/50 max-w-md leading-relaxed font-medium mb-10 sm:mb-16 drop-shadow-xl mx-auto md:mx-0">
            {technique.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start">
            <button
              onClick={() => onStartTraining(technique)}
              className="w-full sm:w-auto bg-white text-black text-[11px] sm:text-xs font-black tracking-[0.4em] uppercase py-5 sm:py-6 px-16 sm:px-24 hover:bg-silver active:scale-95 transition-all rounded-full shadow-2xl"
            >
              Start Training
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TechniquePage;
