import React from 'react';

interface HeaderProps {
  onNavigate: (page: 'HOME') => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onSignOut }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => onNavigate('HOME')} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded">
            <img 
              src="https://svgshare.com/i/184T.svg" 
              alt="TONI&GUY Logo" 
              className="h-7 w-auto"
            />
          </button>
          <button 
            onClick={onSignOut} 
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;