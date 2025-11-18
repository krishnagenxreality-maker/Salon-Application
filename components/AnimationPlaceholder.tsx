import React from 'react';

const AnimationPlaceholder: React.FC = () => {
  return (
    <div className="aspect-square w-full bg-light-grey rounded-2xl flex items-center justify-center border border-gray-200/80">
      <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-gray-400 rounded-full animate-subtle-pulse"></div>
      </div>
    </div>
  );
};

export default AnimationPlaceholder;