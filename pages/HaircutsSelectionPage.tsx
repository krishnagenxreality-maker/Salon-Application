
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '../components/AppIcons';

interface HaircutsSelectionPageProps {
  onStartSession: (subService: string) => void;
  onBack: () => void;
}

const HAIRCUT_OPTIONS = [
    {
        title: "Women’s Cut",
        options: [
            "Cut & Blow Dry",
            "Cut Only"
        ]
    },
    {
        title: "Men’s Cut",
        options: [
            "Regular",
            "Stylist-Level Pricing Tiers"
        ]
    },
    {
        title: "Specialty Cuts",
        options: [
            "Kids’ Haircut",
            "Fringe Trims",
            "Restyling"
        ]
    },
    {
        title: "Finish Styling",
        options: [
            "Blow-Dry",
            "Finish Styling",
            "Blowout",
            "Updos and Occasion Styling"
        ]
    }
];

const HaircutsSelectionPage: React.FC<HaircutsSelectionPageProps> = ({ onStartSession, onBack }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const handleOptionSelect = (option: string) => {
      setSelectedOption(option);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in relative">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <div className="absolute top-28 md:top-32 left-4 sm:left-6 md:left-12 z-50">
            <button onClick={onBack} className="text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back
            </button>
        </div>

        <div className="mt-12 sm:mt-12 text-center mb-10 sm:mb-16 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tighter">
                Haircuts & Styling
            </h1>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
                Select the specific treatment required.
            </p>
        </div>

        <div className="space-y-3 sm:space-y-4 animate-slide-up pb-8">
            {HAIRCUT_OPTIONS.map((category) => (
                <div key={category.title} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                    <button 
                        onClick={() => toggleCategory(category.title)}
                        className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-lg sm:text-xl font-bold text-black">{category.title}</span>
                        {openCategory === category.title ? (
                            <ChevronUpIcon className="w-5 h-5 text-black" />
                        ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                    
                    {openCategory === category.title && (
                        <div className="bg-gray-50 border-t border-gray-100 p-2 space-y-1">
                            {category.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                                        selectedOption === option 
                                            ? 'bg-black text-white' 
                                            : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {option}
                                    {selectedOption === option && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div className="mt-8 sm:mt-16 flex justify-center animate-slide-up pb-8" style={{ animationDelay: '0.1s' }}>
            <button
                onClick={() => selectedOption ? onStartSession(selectedOption) : alert("Please select a specific service option first.")}
                disabled={!selectedOption}
                className={`px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto ${
                    selectedOption 
                        ? 'bg-black text-white hover:scale-105 hover:bg-gray-800 cursor-pointer' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
                Start Session
            </button>
        </div>

      </div>
    </div>
  );
};

export default HaircutsSelectionPage;
