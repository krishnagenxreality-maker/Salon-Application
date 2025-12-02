
import React from 'react';
import { ChevronLeftIcon } from '../components/AppIcons';

interface WelcomePageProps {
  onExplore: () => void;
  onBack: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onExplore, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in relative transition-colors duration-300">
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-12 z-50">
            <button 
                onClick={onBack}
                className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Change Mode
            </button>
        </div>

        <div className="max-w-4xl text-center px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black dark:text-white tracking-tighter mb-2 sm:mb-4 uppercase leading-none animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                TONI&GUY
            </h2>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 tracking-tight leading-tight mb-4 sm:mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Welcome to the <br/> Future of Styling.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Immerse yourself in world-class education. Master precision, creativity, and technique through our advanced interactive training platform.
            </p>

            <button
                onClick={onExplore}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white bg-black dark:bg-white dark:text-black rounded-full transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 focus:outline-none animate-slide-up opacity-0"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                <span className="mr-2">Explore our services</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default WelcomePage;
