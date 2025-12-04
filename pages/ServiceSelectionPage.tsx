import React from 'react';
import { ScissorsIcon, SparklesIcon, ChevronLeftIcon, UserGroupIcon } from '../components/AppIcons';

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

const ServiceSelectionPage: React.FC<ServiceSelectionPageProps> = ({ onSelectService, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in relative transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto text-center">
        
        {/* Back Button */}
        <div className="absolute top-28 md:top-32 left-4 sm:left-6 md:left-12 z-50">
            <button onClick={onBack} className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center group">
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              Back
            </button>
        </div>

        {/* Header */}
        <div className="mb-12 sm:mb-16 animate-slide-up pt-12 sm:pt-8 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black dark:text-white tracking-tighter">
                Training Modules
            </h1>
            <p className="mt-2 sm:mt-4 text-gray-500 dark:text-gray-400 text-sm sm:text-lg">
                Select a module to begin your virtual practice session.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-slide-up pb-8" style={{ animationDelay: '0.2s' }}>
            {TRAINING_MODULES.map((module) => (
                <button
                    key={module.id}
                    onClick={() => onSelectService(module.id)}
                    className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] sm:min-h-[180px]"
                >
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-light-grey dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300">
                        <module.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-black dark:text-white leading-tight">{module.title}</h3>
                    
                    {module.id === 'hair-training' && (
                         <span className="mt-2 text-[10px] sm:text-xs font-semibold text-white bg-black dark:bg-white dark:text-black px-2 py-0.5 rounded-full">
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