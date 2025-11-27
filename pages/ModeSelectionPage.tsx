
import React from 'react';
import { MonitorIcon, UserGroupIcon } from '@/components/Icons';

interface ModeSelectionPageProps {
  onSelect: (mode: 'with-customer' | 'without-customer') => void;
}

const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ onSelect }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="mb-16 text-center animate-slide-up">
         <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter mb-4 uppercase leading-none">
            TONI&GUY
         </h2>
         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Select Modes
         </h1>
         <p className="mt-4 text-gray-500 text-lg max-w-md mx-auto">
            Choose your preferred training environment to begin your session.
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Training Lobby */}
        <button
          onClick={() => onSelect('without-customer')}
          className="group relative bg-white border border-gray-200 rounded-3xl p-10 text-center hover:shadow-2xl hover:border-black hover:-translate-y-2 transition-all duration-500 flex flex-col items-center"
        >
          <div className="h-24 w-24 bg-light-grey rounded-full flex items-center justify-center mb-8 group-hover:bg-black transition-colors duration-500">
             <MonitorIcon className="w-10 h-10 text-black group-hover:text-white transition-colors duration-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Training Lobby</h2>
          <p className="text-gray-500 leading-relaxed">
            Practice techniques on digital models in a controlled, self-paced environment. Perfect your skills before hitting the floor.
          </p>
        </button>

        {/* Customer Service */}
        <button
          onClick={() => onSelect('with-customer')}
          className="group relative bg-white border border-gray-200 rounded-3xl p-10 text-center hover:shadow-2xl hover:border-black hover:-translate-y-2 transition-all duration-500 flex flex-col items-center"
        >
          <div className="h-24 w-24 bg-light-grey rounded-full flex items-center justify-center mb-8 group-hover:bg-black transition-colors duration-500">
             <UserGroupIcon className="w-10 h-10 text-black group-hover:text-white transition-colors duration-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Customer Service</h2>
          <p className="text-gray-500 leading-relaxed">
             Real-time assistance and step-by-step guidance while working with a live client. Ensure precision with every cut.
          </p>
        </button>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
