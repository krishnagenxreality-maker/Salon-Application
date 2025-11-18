import React from 'react';
import { Technique } from '../types';

interface TechniquePageProps {
  technique: Technique;
  onStartTraining: (technique: Technique) => void;
  onBack: () => void;
}

const TechniquePage: React.FC<TechniquePageProps> = ({ technique, onStartTraining, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center pt-24 px-6 md:px-12 animate-fade-in">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="absolute top-28">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
              &larr; Back to Library
            </button>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="w-full aspect-[4/5] bg-light-grey rounded-3xl overflow-hidden animate-slide-up">
            <img src={technique.imageUrl} alt={technique.title} className="w-full h-full object-cover"/>
          </div>
          <div className="text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter leading-tight">
              {technique.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md">
              {technique.description}
            </p>
            <div className="mt-12">
              <button
                onClick={() => onStartTraining(technique)}
                className="bg-white text-black text-base font-medium tracking-widest uppercase px-12 py-5 w-full md:w-auto border-2 border-black hover:bg-light-grey transition-colors"
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