
import React from 'react';
import { CloseIcon } from './icons';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = ["English (US)", "Español", "Français", "Deutsch", "日本語", "한국어"];

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-lg border border-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all duration-300 ease-in-out scale-95"
           style={isOpen ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.95)', opacity: 0 }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-700">Select Language</h3>
        <div className="space-y-3">
          {LANGUAGES.map((lang) => (
            <button key={lang} className="w-full text-left py-3 px-5 bg-white/50 hover:bg-white transition-all duration-200 rounded-xl text-lg font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300">
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
