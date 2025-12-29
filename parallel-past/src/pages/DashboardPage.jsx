import React, { useEffect, useState } from 'react';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import RegionColumn from '../components/fordashboard/RegionColumn';
import { useDashboardStore } from '../store/useDashboardStore';
import { HISTORICAL_ERAS } from '../data/historicalEras';

const DashboardPage = () => {
  const {
    selectedEra,
    setSelectedEra,
    searchQuery,
    setSearchQuery,
    artifactsByRegion,
    isLoading,
    error,
    fetchArtifactsForEra,
  } = useDashboardStore();

  // Local state for debounced input
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce effect: Update store only after 600ms of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        setSearchQuery(localSearch);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery, searchQuery]);

  // Sync local state if store updates externally (optional but good practice)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // ✅ FIX #1: Fetch artifacts on initial load
  useEffect(() => {
    console.log('DashboardPage mounted, fetching artifacts for era:', selectedEra);
    fetchArtifactsForEra(selectedEra, searchQuery); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ FIX #2: Only call setSelectedEra (it handles the fetch internally)
  const handleEraChange = (e) => {
    const eraId = e.target.value;
    setSelectedEra(eraId);
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const isBrowseMode = !!searchQuery;

  return (
    <div className="min-h-screen bg-sage flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          <div className="bg-sage-dark/60 border-4 border-prussian rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[auto,1fr]">
              <div className="bg-sage/60 border-r-4 border-prussian px-4 sm:px-6 py-6 flex flex-col justify-center text-left text-xs sm:text-sm font-heading text-prussian tracking-wide">
                <span>{isBrowseMode ? 'RESULTS' : 'ARTIFACTS'}</span>
              </div>

              <div className="px-4 sm:px-6 py-6 bg-sage-light/70">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full">
                  {Object.entries(artifactsByRegion).map(([regionName, data]) => (
                    <RegionColumn
                      key={regionName}
                      regionName={isBrowseMode ? `${regionName}` : regionName}
                      armorArtifact={data.armor}
                      weaponArtifact={data.weapon} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section: Search & Era Selector */}
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Search Bar - BROWSE MODE CONTROLLER */}
            <div>
              <label htmlFor="dashboard-search" className="block text-center text-sm font-heading text-gold mb-3 tracking-widest uppercase">
                Browse Mode (Specific Item)
              </label>
              <div className="relative">
                <input
                  id="dashboard-search"
                  type="text"
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder="e.g. Helmet, Sword, Pottery..."
                  className={`w-full px-6 py-4 text-base font-body text-prussian bg-white border-4 rounded-xl shadow-lg focus:outline-none focus:ring-4 transition-all placeholder-prussian/30 ${
                    isBrowseMode ? 'border-gold ring-gold/20' : 'border-sage-dark'
                  }`}
                />
              </div>
            </div>

            {/* Era Selector Dropdown - ERA MODE CONTROLLER */}
            <div className={isBrowseMode ? 'opacity-50 grayscale' : ''}>
              <label htmlFor="era-select" className="block text-center text-sm font-heading text-gold mb-3 tracking-widest uppercase">
                {isBrowseMode ? 'Era Mode (Disabled)' : 'Era Mode (Timeline)'}
              </label>
              <div className="relative">
                <select
                  id="era-select"
                  value={selectedEra}
                  onChange={handleEraChange}
                  disabled={isLoading || isBrowseMode} 
                  className="w-full px-6 py-4 text-base font-body text-white bg-prussian border-4 border-gold rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-gold/50 cursor-pointer transition-all hover:bg-prussian/90 appearance-none pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
                >
                  {HISTORICAL_ERAS.map(era => (
                    <option key={era.id} value={era.id} className="bg-prussian text-white">
                      {era.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading / Error Feedback */}
          {isLoading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-prussian mb-2"></div>
              <p className="text-xs sm:text-sm font-body text-prussian">
                {isBrowseMode ? `Scanning global archives for "${searchQuery}"...` : 'Loading curated artifacts...'}
              </p>
            </div>
          )}
          {error && (
            <p className="mt-8 text-center text-xs sm:text-sm font-body text-red-700 bg-red-50 border-2 border-red-300 rounded-lg p-4">
              ⚠️ {error}
            </p>
          )}

          {/* Current Context Info */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm font-body text-prussian">
              {isBrowseMode ? (
                <span>
                  Browsing <span className="font-semibold text-gold">"{searchQuery}"</span> across all eras
                </span>
              ) : (
                <span>
                  Currently exploring: <span className="font-semibold">{HISTORICAL_ERAS.find(e => e.id === selectedEra)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {/* Page Description */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-prussian mb-4">
              About Parallel Timelines
            </h2>
            <p className="text-base sm:text-lg text-gold/90 font-body leading-relaxed">
              Compare arms, armor, and artifacts across three civilizations at the same moment in history. 
              Select an era above to see what different cultures were creating simultaneously.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;