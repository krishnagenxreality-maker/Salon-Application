
import React from 'react';

interface WelcomePageProps {
  onExplore: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onExplore }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-8 animate-fade-in relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gray-50 rounded-full blur-3xl opacity-50 animate-subtle-pulse" />
            <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-3xl opacity-50 animate-subtle-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
            <img
                src="https://svgshare.com/i/184T.svg"
                alt="TONI&GUY Logo"
                className="h-12 w-auto mb-12 animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards' }}
            />

            <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter leading-tight mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Welcome to the <br/> Future of Styling.
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Immerse yourself in world-class education. Master precision, creativity, and technique through our advanced VR training platform.
            </p>

            <button
                onClick={onExplore}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black animate-slide-up opacity-0 shadow-lg hover:shadow-xl"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                <span className="mr-2">Explore our services</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default WelcomePage;
