import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import armorData from '../data/armory.json';

// Collection filter options
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'battlefield', label: 'Battlefield' },
  { id: 'court', label: 'Court' },
  { id: 'duel', label: 'Duel' }
];

// Theme configurations
const THEMES = {
  all: 'border-transparent',
  battlefield: 'border-orange-900/50 bg-orange-50/10', // Rust/Iron
  court: 'border-yellow-600/50 bg-yellow-50/10',       // Gold
  duel: 'border-slate-600/50 bg-slate-50/10'           // Steel Blue
};

// Get grid span classes based on item size
const getGridClasses = (size, index) => {
  // Create visual variety based on size property
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'medium':
      return index % 3 === 0 ? 'md:col-span-2' : 'md:row-span-2';
    default:
      return '';
  }
};

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [apiItems, setApiItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter items based on active filter and valid image
  const getCuratedItems = () => {
    const baseItems = activeFilter === 'all' 
      ? armorData 
      : armorData.filter(item => item.category === activeFilter);
      
    // Fix Blank/Broken Images: Filter out items without valid images
    return baseItems.filter(item => item.image_url && item.image_url.trim() !== '');
  };

  const displayedItems = isSearching ? apiItems : getCuratedItems();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsSearching(true);
    setActiveFilter('all'); // Reset filter visual state

    try {
      // Fetch from MET API (Arms & Armor department = 4)
      const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=4&q=${encodeURIComponent(searchQuery)}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData.total > 0 && searchData.objectIDs) {
        // Fetch details for first 12 items to avoid rate limits/performance issues
        const topIds = searchData.objectIDs.slice(0, 12);
        const itemPromises = topIds.map(id => 
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then(res => res.json())
        );

        const items = await Promise.all(itemPromises);
        
        // Transform API data to match our schema
        const validItems = items
          .filter(item => item.primaryImage) // Double check for images
          .map((item, index) => ({
            id: item.objectID,
            title: item.title,
            category: item.classification || 'Archive',
            region: item.culture || item.country || 'Unknown',
            date: item.objectDate || 'Unknown Date',
            image_url: item.primaryImage,
            size: index === 0 ? 'large' : (index % 4 === 0 ? 'medium' : 'small') // Mock sizing
          }));

        setApiItems(validItems);
      } else {
        setApiItems([]);
      }
    } catch (error) {
      console.error('Error fetching from Archive:', error);
      setApiItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
    setApiItems([]);
  };

  return (
    <div className="min-h-screen bg-sage flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Modern Header Section */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Title */}
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-prussian mb-4">
                {isSearching ? 'Archive Results' : 'The Collection'}
              </h1>
              <p className="font-body text-gold text-base md:text-lg max-w-2xl mx-auto">
                {isSearching 
                  ? `Exploring global artifacts for "${searchQuery}"`
                  : "Explore centuries of craftsmanship from the world's finest armorers and weaponsmiths"
                }
              </p>
              {isSearching && (
                <button 
                  onClick={handleClearSearch}
                  className="mt-3 px-5 py-2 rounded-full bg-sage border border-sage-dark text-prussian font-body text-sm hover:bg-prussian hover:text-white hover:border-prussian transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  ← Return to Curated Collection
                </button>
              )}
            </div>
            
            {/* Modern Filter Pills - Hide when searching */}
            {!isSearching && (
              <div className="flex flex-wrap justify-center gap-3">
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  const count = filter.id === 'all' 
                    ? armorData.filter(item => item.image_url).length 
                    : armorData.filter(item => item.category === filter.id && item.image_url).length;
                  
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`
                        relative px-6 py-3 rounded-full font-body text-sm md:text-base
                        transition-all duration-300 flex items-center gap-2
                        ${isActive 
                          ? 'bg-prussian text-white shadow-lg' 
                          : 'bg-sage text-gold hover:bg-sage-dark border border-sage-dark'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {filter.label}
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${isActive ? 'bg-white/20 text-white' : 'bg-prussian/10 text-prussian'}
                      `}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        
        {/* The Archive Search Section - Top */}
        <section className="bg-white py-4 border-b border-sage-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-3">
              <h2 className="font-heading text-lg text-prussian mb-1">
                Search the Global Archive
              </h2>
              <p className="font-body text-gold text-xs">
                Access items from the Met Museum's Arms & Armor department
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for 'Katana', 'Plate Armor', 'Dagger'..."
                className="w-full px-4 py-2 rounded-full bg-sage border border-sage-dark text-prussian placeholder-gold/50 focus:outline-none focus:ring-2 focus:ring-prussian/50 focus:border-prussian transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-prussian text-white font-body text-sm hover:bg-prussian-light transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        </section>
        
        {/* Bento Grid */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              layout
              // Visual Distinction (Theming)
              className={`
                grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 
                auto-rows-[200px] md:auto-rows-[250px] p-4 rounded-3xl border-2 transition-colors duration-500
                ${!isSearching ? THEMES[activeFilter] : 'border-prussian/20'}
              `}
            >
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <div className="col-span-full h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prussian"></div>
                  </div>
                ) : (
                  displayedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: { type: "spring", stiffness: 400, damping: 30 },
                        opacity: { duration: 0.2 },
                        delay: index * 0.05
                      }}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer ${getGridClasses(item.size, index)}`}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image */}
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null; 
                          // Hide parent if image fails to load significantly
                          e.target.closest('div').style.display = 'none';
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                          transform: hoveredId === item.id ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                        <motion.div
                          initial={{ y: 10, opacity: 0.8 }}
                          animate={{ 
                            y: hoveredId === item.id ? 0 : 10,
                            opacity: hoveredId === item.id ? 1 : 0.9
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Category Tag */}
                          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white uppercase tracking-wider mb-2 truncate max-w-full">
                            {item.category}
                          </span>
                          
                          {/* Title */}
                          <h3 className="font-heading text-white text-lg md:text-xl lg:text-2xl leading-tight mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          {/* Meta */}
                          <div className="flex items-center gap-2 text-white/70 text-sm font-body">
                            <span className="truncate max-w-[100px]">{item.region}</span>
                            <span className="w-1 h-1 rounded-full bg-white/50 shrink-0" />
                            <span className="truncate max-w-[100px]">{item.date}</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Empty State */}
            {!isLoading && displayedItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gold font-body text-lg">
                  {isSearching ? "No artifacts found in the global archive." : "No artifacts found in this collection."}
                </p>
              </div>
            )}
          </div>
        </section>

        </main>
      
      <Footer />
    </div>
  );
};

export default CollectionsPage;
