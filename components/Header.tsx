
import React from 'react';
import { Page, UserRole } from '../types';
import { SunIcon, MoonIcon } from './AppIcons';

interface HeaderProps {
  userRole: UserRole;
  currentPage: Page;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, currentPage, theme, onToggleTheme, onNavigate, onSignOut }) => {
  
  const NavLink = ({ target, label }: { target: Page; label: string }) => (
    <button
      onClick={() => onNavigate(target)}
      className={`text-sm font-medium tracking-wide transition-all duration-300 ${
        currentPage === target 
          ? 'text-black dark:text-white font-bold' 
          : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-100 dark:border-gray-800 animate-fade-in transition-colors duration-300">
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

          {/* Right Side (Sign Out + Theme Toggle) */}
          <div className="flex items-center gap-4">
              <button 
                onClick={onToggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Toggle Theme"
              >
                 {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>

              <button 
                onClick={onSignOut} 
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black dark:text-white border border-gray-300 dark:border-gray-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 whitespace-nowrap"
              >
                Sign Out
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
