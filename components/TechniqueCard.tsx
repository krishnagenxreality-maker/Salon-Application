
import React from 'react';
import { Technique } from '../types';
import { ScissorIcon } from './icons';

interface TechniqueCardProps {
  technique: Technique;
  onClick: () => void;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-white/60 backdrop-blur-sm border border-white/80 p-6 rounded-3xl text-left shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110">
          <ScissorIcon className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="font-semibold text-lg text-gray-800 flex-grow">{technique.name}</h3>
        <p className="text-sm font-medium text-purple-500 mt-2">{technique.category}</p>
      </div>
    </button>
  );
};

export default TechniqueCard;
