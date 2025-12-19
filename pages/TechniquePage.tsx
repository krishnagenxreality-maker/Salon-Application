
import React, { useState } from 'react';
import { Technique } from '../types';
import { ChevronLeftIcon, PhotoIcon } from '../components/AppIcons';

interface TechniquePageProps {
  technique: Technique;
  onStartTraining: (technique: Technique) => void;
  onBack: () => void;
}

const TechniquePage: React.FC<TechniquePageProps> = ({ technique, onStartTraining, onBack }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="mb-8 sm:mb-12">
            <button onClick={onBack} className="text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back to Library
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-16 items-start md:items-center">
          <div className="w-full md:col-span-4 aspect-[4/4.4] bg-light-grey rounded-2xl sm:rounded-3xl overflow-hidden animate-slide-up flex items-center justify-center shadow-lg">
             {!imgError ? (
                <img 
                    src={technique.imageUrl} 
                    alt={technique.title} 
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
             ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <PhotoIcon className="w-10 h-10 sm:w-12 sm:h-12 mb-2" />
                    <span className="text-xs sm:text-sm font-medium">Image Not Available</span>
                </div>
             )}
          </div>
          <div className="md:col-span-6 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-black tracking-tighter leading-tight">
              {technique.title}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed">
              {technique.description}
            </p>
            <div className="mt-8 sm:mt-12">
              <button
                onClick={() => onStartTraining(technique)}
                className="bg-white text-black text-sm sm:text-base font-medium tracking-widest uppercase py-3 px-6 sm:py-5 sm:px-12 w-full sm:w-auto border-2 border-black hover:bg-light-grey transition-colors rounded-full sm:rounded-none"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniquePage;
