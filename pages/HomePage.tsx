import React, { useState, useMemo } from 'react';
import { Technique, TechniqueCategory } from '../types';
import { TECHNIQUES, CATEGORIES } from '../constants';
import { SearchIcon } from '../components/Icons';

interface TechniqueCardProps {
  technique: Technique;
  onSelect: (technique: Technique) => void;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(technique)}
      className="group w-full text-left bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl overflow-hidden border border-gray-200/80"
    >
      <div className="w-full aspect-[4/5] bg-light-grey overflow-hidden">
        <img src={technique.imageUrl} alt={technique.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">{technique.category}</p>
        <h3 className="text-lg font-bold tracking-tight text-black mt-1">{technique.title}</h3>
      </div>
    </button>
  );
};


interface HomePageProps {
  onSelectTechnique: (technique: Technique) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTechnique }) => {
  const [activeCategory, setActiveCategory] = useState<TechniqueCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
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

  return (
    <div className="w-full min-h-screen bg-white pt-24">
      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 animate-fade-in">
        {/* Hero Section */}
        <section className="text-left py-16 md:py-24 border-b border-gray-200">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black tracking-tighter leading-tight animate-slide-up">
            TONI&GUY
            <br />
            <span className="text-gray-400">VR Haircut Training</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience the future of hairdressing education. Master iconic techniques with immersive, hands-on VR training designed by industry masters.
          </p>
        </section>

        {/* Filters & Grid */}
        <section className="py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
             <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === 'All' ? 'bg-black text-white' : 'bg-light-grey text-gray-700 hover:bg-gray-200'}`}
                >
                    All
                </button>
                {CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === category ? 'bg-black text-white' : 'bg-light-grey text-gray-700 hover:bg-gray-200'}`}
                >
                    {category}
                </button>
                ))}
            </div>
            <div className="relative w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search techniques..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredTechniques.map(technique => (
              <TechniqueCard key={technique.id} technique={technique} onSelect={onSelectTechnique} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;