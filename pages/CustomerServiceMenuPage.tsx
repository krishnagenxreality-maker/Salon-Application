
import React from 'react';
import { ScissorsIcon, SparklesIcon, UserGroupIcon } from '../components/AppIcons';

interface CustomerServiceMenuPageProps {
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

// Salon Services List
const SALON_SERVICES = [
    { id: 'haircuts-styling', title: 'Haircuts & Styling', icon: ScissorsIcon },
    { id: 'colour-services', title: 'Colour Services', icon: SparklesIcon },
    { id: 'colour-bonding', title: 'Colour + Bonding / Protective Add-ons', icon: SparklesIcon },
    { id: 'chemical-texture', title: 'Chemical Services / Texture', icon: SparklesIcon },
    { id: 'hair-treatments', title: 'Hair Treatments & Therapy', icon: SparklesIcon },
    { id: 'extensions', title: 'Hair Extensions & Specialist Services', icon: SparklesIcon },
    { id: 'bridal', title: 'Bridal & Occasion Services', icon: SparklesIcon },
    { id: 'makeup-beauty', title: 'Makeup & Beauty', icon: SparklesIcon },
    { id: 'facials', title: 'Facials & Skin Care', icon: SparklesIcon },
    { id: 'nails', title: 'Nails & Hand/Foot Care', icon: SparklesIcon },
    { id: 'waxing', title: 'Waxing / Threading / Body Care', icon: SparklesIcon },
    { id: 'mens-grooming', title: 'Men’s Grooming', icon: ScissorsIcon },
    { id: 'packages', title: 'Packages & Memberships', icon: UserGroupIcon },
];

const CustomerServiceMenuPage: React.FC<CustomerServiceMenuPageProps> = ({ onSelectService, onBack }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col bg-black overflow-y-auto custom-scrollbar animate-fade-in">
      
      {/* CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            backgroundImage: `url("/images/auth-bg.jpeg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark dim overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/95 z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[2px] z-[2]" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-12 md:px-16 pt-32 pb-24">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
                Service Menu
            </h1>
            <p className="mt-3 text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] drop-shadow-md">
                Select the service requested by the client
            </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {SALON_SERVICES.map((service, idx) => (
                <button
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="group relative flex flex-col items-center justify-center p-8 sm:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 shadow-2xl min-h-[180px] sm:min-h-[220px]"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                >
                    {/* Icon Container */}
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white/5 rounded-full flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 border border-white/5">
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-black transition-colors duration-500" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-sm sm:text-base font-black text-white/90 leading-tight uppercase tracking-widest group-hover:text-white transition-colors">
                        {service.title}
                    </h3>
                    
                    {/* Status Badge for Active Services */}
                    {service.id === 'haircuts-styling' && (
                         <span className="absolute top-4 right-6 text-[8px] font-black text-black bg-white/80 px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg animate-pulse">
                            Active
                        </span>
                    )}
                </button>
            ))}
        </div>

        {/* Brand Signoff */}
        <div className="mt-20 text-center opacity-20">
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white">
                GenXReality • Precision Salon Training
             </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default CustomerServiceMenuPage;
