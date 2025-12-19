
import React from 'react';
import { MonitorIcon, UserGroupIcon } from '../components/AppIcons';

interface ModeSelectionPageProps {
  onSelect: (mode: 'with-customer' | 'without-customer') => void;
}

const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="mb-6 sm:mb-8 text-center animate-slide-up w-full px-4">
         <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tighter mb-1 sm:mb-2 uppercase leading-none">
            TONI&GUY
         </h2>
         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Select Training Mode
         </h1>
         <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-base max-w-md mx-auto">
            Choose how you'd like to practice today.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
        {/* Training Lobby */}
        <button
          onClick={() => onSelect('without-customer')}
          className="group relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
        >
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-light-grey rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-500">
             <MonitorIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-black mb-1">Training Lobby</h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-[280px]">
            Practice on digital models in a controlled, self-paced environment.
          </p>
        </button>

        {/* Customer Service */}
        <button
          onClick={() => onSelect('with-customer')}
          className="group relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center"
        >
          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-light-grey rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-500">
             <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-black mb-1">Customer Service</h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-[280px]">
             Step-by-step guidance while working with a live client.
          </p>
        </button>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
