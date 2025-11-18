import React from 'react';
import { Technique } from '../types';
import { ChevronLeftIcon } from '../components/Icons';

interface TechniquePageProps {
  technique: Technique;
  onStartTraining: (technique: Technique) => void;
  onBack: () => void;
}

const TechniquePage: React.FC<TechniquePageProps> = ({ technique, onStartTraining, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white pt-28 pb-16 px-4 md:px-8 lg:px-12 animate-fade-in">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Improved Back button alignment */}
        <div className="mb-12">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-5 h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back to Library
            </button>
        </div>
        {/* Adjusted grid to reduce image size */}
        <div className="grid md:grid-cols-10 gap-8 md:gap-16 items-center">
          <div className="w-full md:col-span-4 aspect-[4/4.4] bg-light-grey rounded-3xl overflow-hidden animate-slide-up">
            <img src={technique.imageUrl} alt={technique.title} className="w-full h-full object-cover"/>
          </div>
          <div className="md:col-span-6 text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tighter leading-tight">
              {technique.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              {technique.description}
            </p>
            <div className="mt-12">
              <button
                onClick={() => onStartTraining(technique)}
                className="bg-white text-black text-base font-medium tracking-widest uppercase py-4 px-8 md:py-5 md:px-12 w-full md:w-auto border-2 border-black hover:bg-light-grey transition-colors"
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