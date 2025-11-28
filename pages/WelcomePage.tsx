
import React from 'react';
import { ChevronLeftIcon } from '../components/AppIcons';

interface WelcomePageProps {
  onExplore: () => void;
  onBack: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onExplore, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-8 animate-fade-in relative">
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="absolute top-24 left-8 md:left-12 z-50 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Change Mode
        </button>

        <div className="max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-black tracking-tighter mb-4 uppercase leading-none animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                TONI&GUY
            </h2>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Welcome to the <br/> Future of Styling.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Immerse yourself in world-class education. Master precision, creativity, and technique through our advanced interactive training platform.
            </p>

            <button
                onClick={onExplore}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 focus:outline-none animate-slide-up opacity-0"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                <span className="mr-2">Explore our services</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default WelcomePage;
