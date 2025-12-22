
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../components/AppIcons';

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
  const [openCategory, setOpenCategory] = useState<string | null>(HAIRCUT_OPTIONS[0].title);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const handleOptionSelect = (option: string) => {
      setSelectedOption(option);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col md:flex-row overflow-hidden animate-fade-in">
      
      {/* CINEMATIC BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: `url("/images/auth-bg.jpeg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-[1]" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-[2]" />
      </div>

      {/* CONTENT WRAPPER - Centered focus */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:pl-24 lg:pl-32">
        
        {/* LEFT PANEL: Stationary Heading & Branding */}
        <aside className="w-full md:w-[42%] h-auto md:h-full flex flex-col justify-center px-10 sm:px-16 md:pl-16 md:pr-10 pt-28 pb-8 md:py-0 shrink-0">
          <div className="animate-fade-in-up">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] mb-3 block drop-shadow-lg">
                  Training Module
              </span>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
                  Haircuts<br/><span className="text-white/40">& Styling</span>
              </h1>
              <div className="w-12 h-[1px] bg-white/20 my-8 hidden md:block"></div>
              <p className="hidden md:block text-white/40 text-[10px] font-black uppercase tracking-[0.3em] max-w-[240px] drop-shadow-md leading-relaxed">
                  Refine technical precision through professional salon simulations.
              </p>

              {/* Final Action Button (Desktop Only) */}
              <div className="mt-12 hidden md:block">
                  <button
                      onClick={() => selectedOption ? onStartSession(selectedOption) : null}
                      disabled={!selectedOption}
                      className={`h-14 px-12 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl border ${
                          selectedOption 
                              ? 'bg-white text-black border-white hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(255,255,255,0.15)]' 
                              : 'bg-white/5 text-white/10 border-white/5 cursor-not-allowed'
                      }`}
                  >
                      Start Session
                  </button>
              </div>
          </div>
        </aside>

        {/* RIGHT PANEL: Scrollable Options (Hidden Scrollbar) */}
        <main className="flex-1 h-full overflow-y-auto no-scrollbar px-10 sm:px-16 md:pl-10 md:pr-16 lg:pr-24 pt-12 md:pt-40 pb-40">
          <div className="max-w-md mx-auto md:mx-0 w-full space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-8">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-2">01. Service Menu</p>
                  <div className="h-[1px] w-8 bg-white/10"></div>
              </div>

              {HAIRCUT_OPTIONS.map((category) => (
                  <div key={category.title} className="group">
                      {/* Category Item */}
                      <button 
                          onClick={() => toggleCategory(category.title)}
                          className={`w-full flex items-center justify-between px-7 py-5 rounded-[2rem] transition-all duration-500 border ${
                              openCategory === category.title 
                                  ? 'bg-white/10 border-white/20 shadow-xl scale-[1.01]' 
                                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                          }`}
                      >
                          <span className={`text-xs sm:text-sm font-black tracking-[0.15em] uppercase transition-colors ${openCategory === category.title ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                              {category.title}
                          </span>
                          {openCategory === category.title ? (
                              <ChevronUpIcon className="w-3.5 h-3.5 text-white" />
                          ) : (
                              <ChevronDownIcon className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60" />
                          )}
                      </button>

                      {/* Sub-Options List */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openCategory === category.title ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                          <div className="space-y-2 pl-5 md:pl-7">
                              {category.options.map((option) => (
                                  <button
                                      key={option}
                                      onClick={() => handleOptionSelect(option)}
                                      className={`w-full text-left px-7 py-4 rounded-[1.6rem] text-[9px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-between border ${
                                          selectedOption === option 
                                              ? 'bg-white text-black border-white shadow-lg scale-[1.02]' 
                                              : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:text-white'
                                      }`}
                                  >
                                      <span className="truncate pr-4">{option}</span>
                                      {selectedOption === option && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}

              {/* Mobile-Only Action Button */}
              <div className="pt-10 md:hidden">
                  <button
                      onClick={() => selectedOption ? onStartSession(selectedOption) : null}
                      disabled={!selectedOption}
                      className={`w-full h-14 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl ${
                          selectedOption 
                              ? 'bg-white text-black shadow-[0_15px_30px_rgba(255,255,255,0.15)]' 
                              : 'bg-white/5 text-white/10 border border-white/5 cursor-not-allowed'
                      }`}
                  >
                      Start Training
                  </button>
              </div>
              
              <div className="pt-16 opacity-20 text-right md:text-left">
                  <p className="text-[7px] font-black uppercase tracking-[0.6em] text-white">
                      Academy Platform • GenXReality
                  </p>
              </div>
          </div>
        </main>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default HaircutsSelectionPage;
