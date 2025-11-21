
import React from 'react';
import { ScissorsIcon, SparklesIcon, ChevronLeftIcon, UserGroupIcon } from '../components/Icons';

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
    <div className="w-full min-h-screen bg-white pt-28 pb-20 px-4 md:px-8 lg:px-12 animate-fade-in">
      <div className="max-w-screen-xl mx-auto text-center relative">
        
        {/* Back Button */}
        <div className="absolute top-0 left-0 z-50">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-5 h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back
            </button>
        </div>

        {/* Header */}
        <div className="mb-16 animate-slide-up pt-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter">
                Service Menu
            </h1>
            <p className="mt-4 text-gray-500 text-lg">
                Select the service requested by the client.
            </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {SALON_SERVICES.map((service) => (
                <button
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[180px]"
                >
                    <div className="h-12 w-12 bg-light-grey rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-black leading-tight">{service.title}</h3>
                    
                    {service.id === 'haircuts-styling' && (
                         <span className="mt-3 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wide">
                            Active
                        </span>
                    )}
                </button>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default CustomerServiceMenuPage;