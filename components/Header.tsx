
import React from 'react';
import { Page, UserRole } from '../types';
import { ChevronLeftIcon, LogoutIcon } from './AppIcons';

interface HeaderProps {
  userRole: UserRole;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, currentPage, onNavigate, onSignOut, onBack }) => {
  
  // Pages where a back button makes sense in the global nav
  const showBack = ![
    'ROLE_SELECTION', 
    'MODE_SELECTION', 
    'ADMIN', 
    'CREATE_ID', 
    'FORGOT_PASSWORD'
  ].includes(currentPage);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 animate-fade-in">
      <header className="h-16 bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-full shadow-lg px-8 sm:px-12 flex items-center justify-between">
        
        {/* Left Side: Back Navigations */}
        <div className="flex-1 flex items-center justify-start">
          {showBack && onBack && (
            <button 
              onClick={onBack}
              className="group flex items-center text-[10px] sm:text-xs font-semibold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em]"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden xs:block">Back</span>
            </button>
          )}
        </div>

        {/* Center: Logo - Increased size slightly for visibility */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <button 
            onClick={() => onNavigate(userRole === 'admin' ? 'ADMIN' : 'MODE_SELECTION')} 
            className="focus:outline-none hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo.png" 
              alt="GenXReality" 
              className="h-9 w-auto object-contain"
            />
          </button>
        </div>

        {/* Right Side: Switch Mode & Signout */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-6">
          {userRole === 'candidate' && currentPage !== 'MODE_SELECTION' && (
            <button
              onClick={() => onNavigate('MODE_SELECTION')}
              className="hidden md:block text-[10px] font-semibold tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase"
            >
              Switch Mode
            </button>
          )}

          <button 
            onClick={onSignOut} 
            title="Sign Out"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-100 text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
          >
            <LogoutIcon className="w-4 h-4" />
          </button>
        </div>

      </header>
    </div>
  );
};

export default Header;
