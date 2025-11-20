
import React from 'react';
import { ChevronLeftIcon } from '../components/Icons';

interface CustomerServiceWelcomePageProps {
  onDive: () => void;
  onBack: () => void;
}

const CustomerServiceWelcomePage: React.FC<CustomerServiceWelcomePageProps> = ({ onDive, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-8 animate-fade-in relative overflow-hidden">
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="absolute top-28 left-8 md:left-12 z-50 flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Change Mode
        </button>

        {/* Abstract Background Elements - Different positioning for distinction */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gray-50 rounded-full blur-3xl opacity-50 animate-subtle-pulse" />
            <div className="absolute -bottom-[10%] left-[10%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-3xl opacity-50 animate-subtle-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-black tracking-tighter mb-6 uppercase leading-none animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                TONI&GUY
            </h2>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight leading-tight mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Elevate the <br/> Client Experience.
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Seamlessly integrate advanced consultation tools and live technical guidance directly into your client sessions.
            </p>

            <button
                onClick={onDive}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black animate-slide-up opacity-0 shadow-lg hover:shadow-xl"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                <span className="mr-2">Dive into customer services</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default CustomerServiceWelcomePage;
