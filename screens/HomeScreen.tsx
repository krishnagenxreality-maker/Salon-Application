
import React, { useState, useMemo } from 'react';
import { Technique, Category } from '../types';
import { TECHNIQUES, CATEGORIES } from '../constants';
import TechniqueCard from '../components/TechniqueCard';
import { SearchIcon, ChevronDownIcon } from '../components/icons';

interface HomeScreenProps {
  onSelectTechnique: (technique: Technique) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectTechnique }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredTechniques = useMemo(() => {
    return TECHNIQUES.filter(technique => {
      const matchesCategory = selectedCategory === 'all' || technique.category === selectedCategory;
      const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
          Haircut Training Techniques
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Explore our library of virtual reality training modules. Master each technique with step-by-step guidance.
        </p>
      </header>
      
      <div className="sticky top-4 z-20 bg-white/30 backdrop-blur-lg p-4 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border-none rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-shadow"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-64 flex items-center justify-between px-5 py-3 bg-white/80 rounded-2xl text-lg font-medium text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-shadow"
            >
              <span>{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
              <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full sm:w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white overflow-hidden z-30">
                <button onClick={() => { setSelectedCategory('all'); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 hover:bg-purple-100/50 transition-colors">All Categories</button>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }} className="w-full text-left px-5 py-3 hover:bg-purple-100/50 transition-colors">{cat}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main>
        {filteredTechniques.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {filteredTechniques.map(technique => (
              <TechniqueCard key={technique.id} technique={technique} onClick={() => onSelectTechnique(technique)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No Techniques Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeScreen;
