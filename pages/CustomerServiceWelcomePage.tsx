
import React from 'react';
import { UserGroupIcon } from '../components/AppIcons';

interface CustomerServiceWelcomePageProps {
  onDive: () => void;
  onBack: () => void;
}

const CustomerServiceWelcomePage: React.FC<CustomerServiceWelcomePageProps> = ({ onDive }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center animate-fade-in">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
            <img 
                src="/images/service-bg.jpeg" 
                alt="Service" 
                className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
            <h2 className="text-sm font-black text-white/40 tracking-[0.5em] uppercase mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Client Experience
            </h2>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                CUSTOMER<br/>SERVICE
            </h1>

            <p className="text-lg sm:text-xl text-white/60 mb-12 max-w-xl mx-auto opacity-0 animate-fade-in-up font-medium" style={{ animationDelay: '0.3s' }}>
                Real-time consultation and interaction. Deliver a flawless, bespoke journey for every client.
            </p>

            <button
                onClick={onDive}
                className="inline-flex items-center justify-center px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.15)] group opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
            >
                Begin Session
                <UserGroupIcon className="w-5 h-5 ml-4 group-hover:scale-110 transition-transform" />
            </button>
        </div>
    </div>
  );
};

export default CustomerServiceWelcomePage;
