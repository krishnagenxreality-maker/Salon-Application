
import React from 'react';
import { ScissorsIcon, SparklesIcon, ChevronLeftIcon, UserGroupIcon, MonitorIcon } from '../components/Icons';

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
    <div className="w-full min-h-screen bg-white pt-28 pb-20 px-4 md:px-8 lg:px-12 animate-fade-in">
      <div className="max-w-screen-xl mx-auto text-center relative">
        
        {/* Back Button */}
        <div className="absolute top-0 left-0 z-50">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-5 h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back
            </button>
        </div>

        {/* Header */}
        <div className="mb-16 animate-slide-up pt-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter">
                Training Modules
            </h1>
            <p className="mt-4 text-gray-500 text-lg">
                Select a module to begin your virtual practice session.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {TRAINING_MODULES.map((module) => (
                <button
                    key={module.id}
                    onClick={() => onSelectService(module.id)}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[180px]"
                >
                    <div className="h-12 w-12 bg-light-grey rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300">
                        <module.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-black leading-tight">{module.title}</h3>
                    
                    {module.id === 'hair-training' && (
                         <span className="mt-3 text-[10px] font-bold text-black bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wide">
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
