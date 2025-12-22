
import React, { useState } from 'react';
import { MonitorIcon, UserGroupIcon } from '../components/AppIcons';

interface ModeSelectionPageProps {
  onSelect: (mode: 'with-customer' | 'without-customer') => void;
}

const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ onSelect }) => {
  const [exitMode, setExitMode] = useState<'top' | 'bottom' | null>(null);

  const handleSelect = (mode: 'with-customer' | 'without-customer') => {
    setExitMode(mode === 'without-customer' ? 'top' : 'bottom');
    onSelect(mode);
  };

  const isTopSelected = exitMode === 'top';
  const isBottomSelected = exitMode === 'bottom';

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-0 flex flex-col md:flex-row">
      
      {/* TRAINING LOBBY - TOP (Mobile) / LEFT (Desktop) */}
      <div 
        onClick={() => !exitMode && handleSelect('without-customer')}
        className={`relative transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer flex items-center justify-center overflow-hidden
          ${isTopSelected 
            ? 'flex-[10] z-20 h-full w-full' 
            : isBottomSelected 
              ? 'flex-[0] h-0 w-0 opacity-0 pointer-events-none' 
              : 'flex-1 h-1/2 md:h-full group'
          }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/lobby-bg.jpeg" 
            className={`w-full h-full object-cover transition-all duration-[1200ms] ${exitMode ? 'scale-105' : 'grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110'}`} 
            alt="Lobby" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
          <div className={`absolute inset-0 transition-colors duration-[1200ms] ${isTopSelected ? 'bg-black/10' : 'bg-black/40 group-hover:bg-black/20'}`}></div>
        </div>

        {/* Text fades out in place - No translate-y to keep it stable */}
        <div className={`relative z-10 text-center px-4 transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            exitMode ? 'opacity-0 scale-95 blur-md' : 'group-hover:scale-105'
        }`}>
          <div className="h-14 w-14 md:h-20 md:w-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center mb-4 md:mb-8 mx-auto group-hover:bg-white group-hover:scale-110 transition-all shadow-2xl">
            <MonitorIcon className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase drop-shadow-2xl">
            Training<br/><span className="text-white/70">Lobby</span>
          </h2>
          <div className="w-12 h-[2px] bg-white/30 mx-auto mt-6 group-hover:w-24 group-hover:bg-white transition-all duration-700"></div>
        </div>
      </div>

      {/* CUSTOMER SERVICE - BOTTOM (Mobile) / RIGHT (Desktop) */}
      <div 
        onClick={() => !exitMode && handleSelect('with-customer')}
        className={`relative transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer flex items-center justify-center overflow-hidden
          ${isBottomSelected 
            ? 'flex-[10] z-20 h-full w-full' 
            : isTopSelected 
              ? 'flex-[0] h-0 w-0 opacity-0 pointer-events-none' 
              : 'flex-1 h-1/2 md:h-full group border-t md:border-t-0 md:border-l border-white/10'
          }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/service-bg.jpeg" 
            className={`w-full h-full object-cover transition-all duration-[1200ms] ${exitMode ? 'scale-105' : 'grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110'}`} 
            alt="Service" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className={`absolute inset-0 transition-colors duration-[1200ms] ${isBottomSelected ? 'bg-black/10' : 'bg-black/40 group-hover:bg-black/20'}`}></div>
        </div>

        {/* Text fades out in place - No translate-y to keep it stable */}
        <div className={`relative z-10 text-center px-4 transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
            exitMode ? 'opacity-0 scale-95 blur-md' : 'group-hover:scale-105'
        }`}>
          <div className="h-14 w-14 md:h-20 md:w-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center mb-4 md:mb-8 mx-auto group-hover:bg-white group-hover:scale-110 transition-all shadow-2xl">
            <UserGroupIcon className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] uppercase drop-shadow-2xl">
            Customer<br/><span className="text-white/70">Service</span>
          </h2>
          <div className="w-12 h-[2px] bg-white/30 mx-auto mt-6 group-hover:w-24 group-hover:bg-white transition-all duration-700"></div>
        </div>
      </div>

      {/* Footer Text Overlay */}
      <div className={`absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none transition-all duration-1000 ${exitMode ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40 text-center px-6">
            Beyond Reality • Powered by TONI&GUY
          </p>
      </div>

    </div>
  );
};

export default ModeSelectionPage;
