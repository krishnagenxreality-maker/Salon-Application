import React, { useEffect, useState } from 'react';
import { CheckIcon } from '../components/Icons';
import { Technique } from '../types';

interface CompletionPageProps {
  technique: Technique;
  onRestart: () => void;
  onBackToLibrary: () => void;
}

const Confetti: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `scale(${Math.random() * 0.5 + 0.5})`,
                    }}
                />
            ))}
        </div>
    );
};


const CompletionPage: React.FC<CompletionPageProps> = ({ technique, onRestart, onBackToLibrary }) => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center text-center px-6 animate-fade-in confetti-container">
      <Confetti />
      <div>
        <div className="w-24 h-24 bg-light-grey rounded-full flex items-center justify-center mx-auto mb-8 animate-slide-up">
            <CheckIcon className="w-12 h-12 text-black animate-draw-check" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Technique Completed
        </h1>
        <p className="mt-4 text-xl text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          You have successfully mastered the <span className="font-semibold text-black">{technique.title}</span> technique.
        </p>
        <div className="max-w-xs mx-auto my-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={technique.imageUrl} alt={technique.title} className="w-full h-full object-cover" />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onRestart}
            className="border border-gray-300 text-black text-sm font-semibold tracking-wide uppercase px-10 py-4 w-full sm:w-auto hover:border-black transition-colors rounded-full"
          >
            Restart Technique
          </button>
          <button
            onClick={onBackToLibrary}
            className="bg-black text-white text-sm font-semibold tracking-wide uppercase px-10 py-4 w-full sm:w-auto hover:bg-gray-800 transition-colors rounded-full"
          >
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;