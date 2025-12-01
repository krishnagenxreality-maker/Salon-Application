
import React from 'react';
import { ChevronLeftIcon, UserGroupIcon } from '../components/AppIcons';

interface CustomerServiceWelcomePageProps {
  onDive: () => void;
  onBack: () => void;
}

const CustomerServiceWelcomePage: React.FC<CustomerServiceWelcomePageProps> = ({ onDive, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-24 sm:left-12 z-50">
            <button 
                onClick={onBack}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Back
            </button>
        </div>

        <div className="max-w-4xl text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6 animate-slide-up">
                Customer Service <br/> Lobby
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Customer requirements, Consultation, and Real-time interaction. Provide a world-class experience for every client.
            </p>

            <button
                onClick={onDive}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white bg-black rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 focus:outline-none animate-slide-up shadow-lg"
                style={{ animationDelay: '0.4s' }}
            >
                <span className="mr-2">Dive into customer services</span>
                <UserGroupIcon className="w-5 h-5" />
            </button>
        </div>
    </div>
  );
};

export default CustomerServiceWelcomePage;
