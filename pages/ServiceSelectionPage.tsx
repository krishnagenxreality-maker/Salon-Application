
import React from 'react';
import { ScissorsIcon, SparklesIcon, UserGroupIcon } from '../components/AppIcons';

interface ServiceSelectionPageProps {
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

const TRAINING_MODULES = [
    { id: 'hair-training', title: 'Hair Training', icon: ScissorsIcon, available: true },
    { id: 'spa-training', title: 'Spa Training', icon: SparklesIcon },
    { id: 'nails-training', title: 'Nails Training', icon: SparklesIcon },
    { id: 'skin-training', title: 'Skin Training', icon: SparklesIcon },
    { id: 'makeup-training', title: 'Makeup Training', icon: SparklesIcon },
    { id: 'brows-lashes-training', title: 'Brows and Lashes Training', icon: SparklesIcon },
    { id: 'waxing-training', title: 'Waxing Training', icon: SparklesIcon },
    { id: 'mens-grooming', title: 'Men\'s Grooming', icon: ScissorsIcon },
    { id: 'packages', title: 'Packages', icon: UserGroupIcon },
];

const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ onSelectService }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center overflow-y-auto custom-scrollbar">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <img 
              src="/images/lobby-bg.jpeg" 
              alt="Lobby" 
              className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto text-center w-full px-6 pt-40 pb-20">
        <div className="mb-14 animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-3">
                Training Modules
            </h1>
            <p className="text-white/40 text-xs sm:text-sm font-black tracking-[0.3em] uppercase">
                Select a module to begin your practice
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {TRAINING_MODULES.map((module) => (
                <button
                    key={module.id}
                    onClick={() => onSelectService(module.id)}
                    className="group relative bg-white/[0.03] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.07] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl min-h-[220px]"
                >
                    <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <module.icon className="w-6 h-6 text-white/70 group-hover:text-black transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform">{module.title}</h3>
                    
                    {module.available ? (
                         <span className="text-[9px] font-black text-black bg-white/80 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                            Available
                        </span>
                    ) : (
                        <div className="h-6" /> // Spacer for alignment
                    )}
                </button>
            ))}
        </div>
        
        <div className="mt-16 opacity-20">
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white">
                GenXReality • Precision Standards
             </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionPage;
