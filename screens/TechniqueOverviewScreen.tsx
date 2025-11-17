
import React from 'react';
import { Technique } from '../types';
import AnimationPlaceholder from '../components/AnimationPlaceholder';
import { ArrowLeftIcon } from '../components/icons';

interface TechniqueOverviewScreenProps {
  technique: Technique;
  onStart: () => void;
  onBack: () => void;
}

const TechniqueOverviewScreen: React.FC<TechniqueOverviewScreenProps> = ({ technique, onStart, onBack }) => {
  return (
    <div className="min-h-[80vh] flex flex-col">
      <header className="mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-lg font-semibold text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
          Back to Library
        </button>
      </header>

      <main className="flex-grow grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="font-semibold text-purple-500 text-lg">{technique.category}</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-800">{technique.name}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{technique.description}</p>
        </div>
        <div className="flex justify-center">
            <AnimationPlaceholder className="w-full max-w-md shadow-2xl" />
        </div>
      </main>

      <footer className="mt-12 text-center">
        <button
          onClick={onStart}
          className="bg-purple-600 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Start Training
        </button>
      </footer>
    </div>
  );
};

export default TechniqueOverviewScreen;
