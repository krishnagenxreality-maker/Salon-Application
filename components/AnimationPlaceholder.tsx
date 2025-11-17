
import React from 'react';
import { ScissorIcon } from './icons';

interface AnimationPlaceholderProps {
  className?: string;
}

const AnimationPlaceholder: React.FC<AnimationPlaceholderProps> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center bg-white/50 border border-white/70 backdrop-blur-sm rounded-3xl overflow-hidden aspect-square ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50 opacity-50"></div>
      <div className="z-10 text-purple-300">
        <ScissorIcon className="w-24 h-24 opacity-50" />
      </div>
      <span className="absolute bottom-4 text-sm font-medium text-purple-400/80">Animation Placeholder</span>
    </div>
  );
};

export default AnimationPlaceholder;
