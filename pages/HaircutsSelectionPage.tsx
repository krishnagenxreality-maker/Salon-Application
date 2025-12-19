
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
    <div className="flex-1 flex flex-col bg-white pb-20 px-4 sm:px-6 md:px-8 lg:px-12 animate-fade-in relative">
      <div className="max-w-2xl mx-auto w-full">
        
        <div className="text-center mt-6 sm:mt-10 mb-8 sm:mb-12 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tighter">
                Haircuts & Styling
            </h1>
            <p className="mt-2 text-gray-500 text-sm sm:text-base font-medium">
                Select the specific treatment required.
            </p>
        </div>

        <div className="space-y-3 sm:space-y-4 animate-slide-up pb-8">
            {HAIRCUT_OPTIONS.map((category) => (
                <div key={category.title} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                    <button 
                        onClick={() => toggleCategory(category.title)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-lg sm:text-xl font-bold text-black tracking-tight">{category.title}</span>
                        {openCategory === category.title ? (
                            <ChevronUpIcon className="w-5 h-5 text-black" />
                        ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-300" />
                        )}
                    </button>
                    
                    {openCategory === category.title && (
                        <div className="bg-gray-50/50 border-t border-gray-50 p-2 space-y-1">
                            {category.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left px-5 sm:px-6 py-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-between ${
                                        selectedOption === option 
                                            ? 'bg-black text-white shadow-lg' 
                                            : 'text-gray-500 hover:bg-gray-200'
                                    }`}
                                >
                                    {option}
                                    {selectedOption === option && (
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div className="mt-6 sm:mt-10 flex justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <button
                onClick={() => selectedOption ? onStartSession(selectedOption) : alert("Please select a specific service option first.")}
                disabled={!selectedOption}
                className={`h-14 px-12 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl w-full sm:w-auto ${
                    selectedOption 
                        ? 'bg-black text-white hover:scale-105 hover:bg-gray-800' 
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
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
