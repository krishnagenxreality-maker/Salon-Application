
import React from 'react';
import { UserCircleIcon } from '../components/Icons';

interface RoleSelectionPageProps {
  onSelect: (role: 'admin' | 'candidate') => void;
}

const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelect }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="mb-12 text-center animate-slide-up">
         <img 
            src="/images/logo.png" 
            alt="TONI&GUY Logo" 
            className="h-14 w-auto mx-auto mb-6"
         />
         <h1 className="text-4xl font-extrabold text-black tracking-tighter">
            TONI&GUY Portal
         </h1>
         <p className="mt-2 text-gray-500 text-lg">
            Select your role to continue.
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Candidate Option */}
        <button
          onClick={() => onSelect('candidate')}
          className="group relative bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-xl hover:border-black transition-all duration-300 flex flex-col items-center md:items-start"
        >
          <div className="h-16 w-16 bg-light-grey rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black group-hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Candidate</h2>
          <p className="text-gray-500 text-sm leading-relaxed text-center md:text-left">
            Access the training library, start new modules, and track your personal progress.
          </p>
        </button>

        {/* Admin Option */}
        <button
          onClick={() => onSelect('admin')}
          className="group relative bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-xl hover:border-black transition-all duration-300 flex flex-col items-center md:items-start"
        >
          <div className="h-16 w-16 bg-light-grey rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
             <UserCircleIcon className="w-8 h-8 text-black group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Admin</h2>
          <p className="text-gray-500 text-sm leading-relaxed text-center md:text-left">
            Monitor candidate performance, view completion statistics, and manage training data.
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
