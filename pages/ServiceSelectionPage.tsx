
import React from 'react';
import { ScissorsIcon, SparklesIcon, ChevronLeftIcon } from '../components/Icons';

interface ServiceSelectionPageProps {
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

const SERVICES = [
    { id: 'hair', title: 'Hair Training', icon: ScissorsIcon },
    { id: 'spa', title: 'Spa Training', icon: SparklesIcon },
    { id: 'nails', title: 'Nails Training', icon: SparklesIcon },
    { id: 'skin', title: 'Skin Training', icon: SparklesIcon },
    { id: 'makeup', title: 'Makeup Training', icon: SparklesIcon },
    { id: 'brows', title: 'Brows & Lashes', icon: SparklesIcon },
    { id: 'waxing', title: 'Waxing Training', icon: SparklesIcon },
    { id: 'mens', title: "Men's Grooming", icon: ScissorsIcon },
    { id: 'packages', title: 'Packages', icon: SparklesIcon },
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
                Choose Your Service
            </h1>
            <p className="mt-4 text-gray-500 text-lg">
                Select a category to explore specialized training modules.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {SERVICES.map((service) => (
                <button
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[200px]"
                >
                    <div className="h-14 w-14 bg-light-grey rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black">{service.title}</h3>
                    
                    {service.id === 'hair' ? (
                        <span className="mt-4 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            Available Now
                        </span>
                    ) : (
                        <span className="mt-4 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                            In Development
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
