
import React from 'react';
import { Page, UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, currentPage, onNavigate, onSignOut }) => {
  
  const NavLink = ({ target, label }: { target: Page; label: string }) => (
    <button
      onClick={() => onNavigate(target)}
      className={`text-sm font-medium tracking-wide transition-all duration-300 ${
        currentPage === target 
          ? 'text-black font-bold' 
          : 'text-gray-500 hover:text-black'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100 animate-fade-in transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate(userRole === 'admin' ? 'ADMIN' : 'MODE_SELECTION')} 
            className="focus:outline-none opacity-90 hover:opacity-100 transition-opacity"
          >
            <img 
              src="/images/logo.png" 
              alt="GenXReality Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300"
            />
          </button>

          {/* Center Navigation - Hidden on small mobile */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2">
            {userRole === 'candidate' && (
              <NavLink target="MODE_SELECTION" label="Switch Mode" />
            )}
            {userRole === 'admin' && (
              <NavLink target="ADMIN" label="Dashboard" />
            )}
          </nav>

          {/* Right Side (Sign Out) */}
          <button 
            onClick={onSignOut} 
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black border border-gray-300 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
