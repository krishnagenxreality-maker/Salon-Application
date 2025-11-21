
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '../components/Icons';

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
    <div className="w-full min-h-screen bg-white pt-28 pb-20 px-4 md:px-8 lg:px-12 animate-fade-in">
      <div className="max-w-2xl mx-auto relative">
        
        {/* Back Button */}
        <div className="absolute top-0 left-0 z-50">
            <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center group">
              <ChevronLeftIcon className="w-5 h-5 mr-1 text-gray-400 group-hover:text-black transition-colors" />
              Back
            </button>
        </div>

        <div className="mt-12 text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tighter">
                Haircuts & Styling
            </h1>
            <p className="mt-2 text-gray-500">
                Select the specific treatment required.
            </p>
        </div>

        <div className="space-y-4 animate-slide-up">
            {HAIRCUT_OPTIONS.map((category) => (
                <div key={category.title} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300 bg-white">
                    <button 
                        onClick={() => toggleCategory(category.title)}
                        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-lg font-bold text-black">{category.title}</span>
                        {openCategory === category.title ? (
                            <ChevronUpIcon className="w-5 h-5 text-black" />
                        ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                    
                    {openCategory === category.title && (
                        <div className="bg-gray-50 border-t border-gray-100 p-4 space-y-2">
                            {category.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                                        selectedOption === option 
                                            ? 'bg-black text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-white hover:shadow-sm'
                                    }`}
                                >
                                    {option}
                                    {selectedOption === option && (
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div className="mt-12 flex justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <button
                onClick={() => selectedOption ? onStartSession(selectedOption) : alert("Please select a specific service option first.")}
                disabled={!selectedOption}
                className={`px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 ${
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
