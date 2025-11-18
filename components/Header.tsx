import React from 'react';

interface HeaderProps {
  onNavigate: (page: 'HOME') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-24">
          <button onClick={() => onNavigate('HOME')} className="text-2xl font-extrabold tracking-wider text-black uppercase">
            TONI&GUY
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;