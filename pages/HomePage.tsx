
import React, { useState, useMemo, useEffect } from 'react';
import { Technique, TechniqueCategory } from '../types';
import { TECHNIQUES, CATEGORIES } from '../constants';
import { SearchIcon } from '../components/AppIcons';

const DEFAULT_BG = '/images/auth-bg.jpeg';

interface TechniqueCardProps {
  technique: Technique;
  onSelect: (technique: Technique) => void;
  onHover: (imageUrl: string | null) => void;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onSelect, onHover }) => {
  return (
    <button
      onClick={() => onSelect(technique)}
      onMouseEnter={() => onHover(technique.imageUrl)}
      onMouseLeave={() => onHover(null)}
      className="group w-full text-left transition-all duration-500 hover:-translate-y-2 focus:outline-none"
    >
      {/* Precision Card Ratio */}
      <div className="aspect-[4/5] bg-white/[0.03] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 shadow-2xl border border-white/[0.08] relative">
        <img 
          src={technique.imageUrl} 
          alt={technique.title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="px-1 md:px-2">
        <p className="text-[8px] md:text-[9px] font-black text-white/50 tracking-[0.4em] uppercase mb-1 md:mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {technique.category}
        </p>
        <h3 className="text-sm md:text-base lg:text-lg font-black text-white tracking-widest leading-tight uppercase group-hover:text-silver transition-colors line-clamp-2">
          {technique.title}
        </h3>
      </div>
    </button>
  );
};

interface HomePageProps {
  onSelectTechnique: (technique: Technique) => void;
  onBack: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTechnique }) => {
  const [activeCategory, setActiveCategory] = useState<TechniqueCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Dual-layer state for pure cross-fading
  const [bg1, setBg1] = useState<string | null>(DEFAULT_BG);
  const [bg2, setBg2] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<1 | 2>(1);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Synchronize background layers when hoveredImage changes
  useEffect(() => {
    // On mobile, always use the default background. On desktop, toggle between hovered and default.
    const targetImage = isMobile ? DEFAULT_BG : (hoveredImage || DEFAULT_BG);
    
    if (activeLayer === 1) {
      if (bg1 === targetImage) return; // Prevent redundant triggers
      setBg2(targetImage);
      const timer = setTimeout(() => setActiveLayer(2), 50);
      return () => clearTimeout(timer);
    } else {
      if (bg2 === targetImage) return; // Prevent redundant triggers
      setBg1(targetImage);
      const timer = setTimeout(() => setActiveLayer(1), 50);
      return () => clearTimeout(timer);
    }
  }, [hoveredImage, isMobile]);

  const filteredTechniques = useMemo(() => {
    let techniques = TECHNIQUES;
    if (activeCategory !== 'All') {
        techniques = techniques.filter(t => t.category === activeCategory);
    }
    if (searchTerm) {
        techniques = techniques.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return techniques;
  }, [activeCategory, searchTerm]);

  const getCategoryImage = (category: TechniqueCategory | 'All') => {
    if (category === 'All') return TECHNIQUES[0]?.imageUrl || null;
    return TECHNIQUES.find(t => t.category === category)?.imageUrl || null;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex flex-col md:flex-row overflow-hidden animate-fade-in">
      
      {/* DYNAMIC BACKGROUND SYSTEM - 80% Visibility Full Screen PURE Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1 */}
        <div 
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${activeLayer === 1 ? 'opacity-80' : 'opacity-0'}`}
          style={{ 
            backgroundImage: bg1 ? `url("${bg1}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Layer 2 */}
        <div 
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${activeLayer === 2 ? 'opacity-80' : 'opacity-0'}`}
          style={{ 
            backgroundImage: bg2 ? `url("${bg2}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlays for depth while keeping background visible */}
        <div className={`absolute inset-0 transition-colors duration-[1200ms] ${hoveredImage ? 'bg-black/10' : 'bg-black/20'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/10 z-[2]" />
        <div className="absolute inset-0 bg-radial-gradient-overlay z-[3]" />
      </div>

      <style>{`
        .bg-radial-gradient-overlay {
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* NAVIGATION PANEL: No border, seamless blend */}
      <aside className={`relative w-full md:w-[45%] lg:w-[38%] xl:w-[32%] h-auto md:h-full flex flex-col px-8 md:pl-24 md:pr-12 lg:pl-32 lg:pr-16 z-30 shrink-0 overflow-hidden transition-all duration-[1200ms] bg-black/10 backdrop-blur-[2px] pt-24 md:pt-0`}>
        
        {/* Branding & Navigation */}
        <div className="md:mt-32 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-0.5 mb-8 md:mb-10 shrink-0">
                <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tighter leading-none uppercase select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    TECHNIQUE
                </h1>
                <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white/50 tracking-tighter leading-none uppercase select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                    LIBRARY
                </h1>
            </div>

            {/* Collections Label - Visible on desktop, subtle on mobile */}
            <div className="flex items-center mb-5 shrink-0">
                <p className="text-[10px] xl:text-[11px] font-black text-white/80 uppercase tracking-[0.5em] drop-shadow-md">Collections</p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-col space-y-2 lg:space-y-3 xl:space-y-4">
              <button
                  onClick={() => setActiveCategory('All')}
                  onMouseEnter={() => setHoveredImage(getCategoryImage('All'))}
                  onMouseLeave={() => setHoveredImage(null)}
                  className={`group flex items-center gap-4 py-1 text-left transition-all duration-300 shrink-0 ${activeCategory === 'All' ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                  <div className={`w-1 h-1 rounded-full transition-all duration-500 shrink-0 ${activeCategory === 'All' ? 'bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,1)]' : 'bg-white/40'}`} />
                  <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-lg">View All</span>
              </button>

              {CATEGORIES.map(category => (
                  <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      onMouseEnter={() => setHoveredImage(getCategoryImage(category))}
                      onMouseLeave={() => setHoveredImage(null)}
                      className={`group flex items-center gap-4 py-1 text-left transition-all duration-300 shrink-0 ${activeCategory === category ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                      <div className={`w-1 h-1 rounded-full transition-all duration-500 shrink-0 ${activeCategory === category ? 'bg-white scale-150 shadow-[0_0_8px_rgba(255,255,255,1)]' : 'bg-white/40'}`} />
                      <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-lg">{category}</span>
                  </button>
              ))}
            </nav>

            {/* Mobile Filter Strip - Perfectly Aligned Pill Buttons */}
            <div className="md:hidden w-full flex overflow-x-auto gap-3 py-2 px-1 no-scrollbar shrink-0 mb-6 justify-start">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${activeCategory === 'All' ? 'bg-white text-black' : 'bg-white/10 backdrop-blur-md text-white border border-white/10'}`}
                >
                    All
                </button>
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${activeCategory === category ? 'bg-white text-black' : 'bg-white/10 backdrop-blur-md text-white border border-white/10'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Search Input - Optimized Alignment */}
            <div className="relative w-full mb-8 md:mb-12 md:mt-10">
                <p className="hidden md:block text-[9px] font-black text-white/50 uppercase tracking-[0.5em] mb-3 ml-1 drop-shadow-md">Identify Search</p>
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="FIND MODULE..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 md:py-4.5 bg-white/95 rounded-xl md:rounded-2xl text-black placeholder-black/60 focus:outline-none focus:ring-4 focus:ring-white/40 transition-all text-[11px] font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
                    />
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-focus-within:text-black transition-colors" />
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN GALLERY: Seamless transition from sidebar */}
      <main className="relative flex-1 h-full overflow-y-auto custom-scrollbar bg-transparent px-8 sm:px-14 md:px-16 lg:px-20 md:pt-32 pb-40 z-10">
        <div className="max-w-[1400px] mx-auto">
            {filteredTechniques.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-12 lg:gap-x-14 gap-y-16 md:gap-y-20 lg:gap-y-24">
                    {filteredTechniques.map((technique, idx) => (
                        <div key={technique.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                            <TechniqueCard 
                              technique={technique} 
                              onSelect={onSelectTechnique} 
                              onHover={(img) => setHoveredImage(img)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center opacity-70">
                    <SearchIcon className="w-12 h-12 md:w-16 md:h-16 mb-8 text-white/20" />
                    <h3 className="text-xl font-black uppercase tracking-[0.6em] text-white drop-shadow-lg">No Results</h3>
                    <p className="text-[10px] mt-4 uppercase tracking-[0.2em] text-white/90 drop-shadow-md">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
      </main>

    </div>
  );
};

export default HomePage;
