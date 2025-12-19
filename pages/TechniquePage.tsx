
import React, { useState } from 'react';
import { Technique } from '../types';
import { PhotoIcon } from '../components/AppIcons';

interface TechniquePageProps {
  technique: Technique;
  onStartTraining: (technique: Technique) => void;
  onBack: () => void;
}

const TechniquePage: React.FC<TechniquePageProps> = ({ technique, onStartTraining }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full flex-1 flex flex-col bg-white pb-16 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in">
      <div className="w-full max-w-screen-2xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-16 items-center py-8">
          <div className="w-full md:col-span-4 aspect-[4/4.4] bg-light-grey rounded-3xl overflow-hidden animate-slide-up flex items-center justify-center shadow-lg">
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
            <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4 block">{technique.category}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-black tracking-tighter leading-[0.95]">
              {technique.title}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
              {technique.description}
            </p>
            <div className="mt-10 sm:mt-12">
              <button
                onClick={() => onStartTraining(technique)}
                className="bg-black text-white text-xs sm:text-sm font-black tracking-[0.2em] uppercase py-4 px-10 sm:py-5 sm:px-14 hover:bg-gray-800 transition-all rounded-full shadow-xl"
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
