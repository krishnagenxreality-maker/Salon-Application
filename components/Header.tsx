
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
  const isModeSelection = currentPage === 'MODE_SELECTION';
  
  const showBack = ![
    'ROLE_SELECTION', 
    'MODE_SELECTION', 
    'ADMIN', 
    'CREATE_ID', 
    'FORGOT_PASSWORD'
  ].includes(currentPage);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] animate-fade-in">
      <header className="h-16 flex items-center justify-between px-8 sm:px-12 rounded-full glass-header shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10">
        
        {/* Left: Navigation (Back Button) */}
        <div className="flex-1 flex items-center">
          {!isModeSelection && showBack && onBack && (
            <button 
              onClick={onBack}
              className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all group"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>

        {/* Center: Brand Logo (Locked in center for all pages) */}
        <div className="flex-1 flex justify-center">
          <button 
            onClick={() => onNavigate(userRole === 'admin' ? 'ADMIN' : 'MODE_SELECTION')}
            className="hover:scale-105 transition-transform flex-shrink-0"
          >
            <img 
              src="/images/logo.png" 
              alt="GenXReality Logo" 
              className="h-9 w-auto brightness-0 invert opacity-100 object-contain" 
            />
          </button>
        </div>

        {/* Right: Signature Red Sign Out */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={onSignOut}
            title="Sign Out"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 text-red-500 transition-all duration-300 border border-red-500/20 hover:border-red-500/50 hover:scale-110 shadow-lg"
          >
            <LogoutIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
