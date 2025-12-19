
import React from 'react';
import { ScissorsIcon, SparklesIcon, UserGroupIcon } from '../components/AppIcons';

interface ServiceSelectionPageProps {
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

// Training Modules List
const TRAINING_MODULES = [
    { id: 'hair-training', title: 'Hair Training', icon: ScissorsIcon },
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
    <div className="flex-1 flex flex-col bg-white pb-10 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in relative">
      <div className="max-w-screen-xl mx-auto text-center w-full">
        
        {/* Moderate spacer for perfect vertical balance */}
        <div className="h-4 md:h-6" />

        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-slide-up px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tighter">
                Training Modules
            </h1>
            <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-base font-medium">
                Select a module to begin your virtual practice session.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 animate-slide-up pb-8" style={{ animationDelay: '0.2s' }}>
            {TRAINING_MODULES.map((module) => (
                <button
                    key={module.id}
                    onClick={() => onSelectService(module.id)}
                    className="group relative bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[120px] sm:min-h-[160px]"
                >
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-light-grey rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-black transition-colors duration-300">
                        <module.icon className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-black leading-tight">{module.title}</h3>
                    
                    {module.id === 'hair-training' && (
                         <span className="mt-1 text-[8px] sm:text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full">
                            Available
                        </span>
                    )}
                </button>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default ServiceSelectionPage;
