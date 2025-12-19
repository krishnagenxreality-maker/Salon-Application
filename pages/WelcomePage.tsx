
import React from 'react';

interface WelcomePageProps {
  onExplore: () => void;
  onBack: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onExplore }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in relative">
        <div className="max-w-4xl text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black tracking-tighter mb-2 uppercase leading-none animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                TONI&GUY
            </h2>

            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Welcome to the <br/> Future of Styling.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Immerse yourself in world-class education. Master precision, creativity, and technique through our advanced interactive platform.
            </p>

            <button
                onClick={onExplore}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold text-white bg-black rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 focus:outline-none animate-slide-up opacity-0 shadow-lg"
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
