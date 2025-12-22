
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
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col items-center overflow-hidden animate-fade-in">
      
      {/* PERSISTENT CINEMATIC BACKGROUND - 80% Opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-80"
          style={{ 
            backgroundImage: `url("${DEFAULT_BG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Deep cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/85 z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1.5px] z-[2]" />
      </div>

      {/* Main Content Container - Centered Alignment & Responsive Padding */}
      <div className="relative z-10 w-full h-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 gap-10 md:gap-16 lg:gap-24 overflow-y-auto no-scrollbar pt-36 md:pt-32 pb-20">
        
        {/* LEFT SECTION: Visual Anchor - Refined Fluid Sizing */}
        <div className="w-full md:w-[42%] flex justify-center md:justify-end animate-fade-in-up shrink-0">
            <div className="relative group w-[70vw] max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] aspect-[4/5] bg-white/[0.05] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.85)] border border-white/10">
                <img 
                    src={technique.imageUrl} 
                    alt={technique.title} 
                    className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
        </div>

        {/* RIGHT SECTION: Content Engine */}
        <div className="w-full md:w-[58%] text-center md:text-left animate-fade-in-up flex flex-col justify-center" style={{ animationDelay: '0.2s' }}>
          <span className="text-[10px] md:text-xs font-black text-white/40 uppercase tracking-[0.6em] mb-3 md:mb-6 block drop-shadow-lg">
            {technique.category}
          </span>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white tracking-tighter leading-[0.95] uppercase mb-6 md:mb-10 drop-shadow-2xl">
            {technique.title}
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/50 max-w-lg leading-relaxed font-medium mb-10 md:mb-14 drop-shadow-xl mx-auto md:mx-0">
            {technique.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start">
            <button
              onClick={() => onStartTraining(technique)}
              className="w-full sm:w-auto bg-white text-black text-[10px] md:text-xs font-black tracking-[0.4em] uppercase py-5 md:py-6 px-14 md:px-24 hover:scale-105 active:scale-95 transition-all rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/20"
            >
              Start Training
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TechniquePage;
