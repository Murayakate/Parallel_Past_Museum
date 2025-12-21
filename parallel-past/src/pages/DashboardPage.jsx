import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegionColumn from '../components/fordashboard/RegionColumn';
import { useDashboardStore } from '../store/useDashboardStore';

// Historical Eras - must match the config in the store
const HISTORICAL_ERAS = [
  { id: "golden_age", label: "🛡️ The Golden Age (1500–1600)" },
  { id: "elegance", label: "💎 The Age of Elegance (1600–1750)" },
  { id: "empire", label: "🦅 The Empires (1750–1900)" }
];

// Top-level dashboard screen that shows the tri-region grid and the era selector.
const DashboardPage = () => {
  // Pull the dashboard state and actions out of the Zustand store.
  const {
    selectedEra,
    setSelectedEra,
    artifactsByRegion,
    isLoading,
    error,
    fetchArtifactsForEra,
  } = useDashboardStore();

  // Fetch artifacts on initial load with default era (golden_age)
  useEffect(() => {
    console.log('DashboardPage mounted, fetching artifacts for era:', selectedEra);
    fetchArtifactsForEra(selectedEra);
  }, []); // Empty dependency array = run once on mount

  // When the user selects a different era
  const handleEraChange = (e) => {
    const eraId = e.target.value;
    setSelectedEra(eraId);
    fetchArtifactsForEra(eraId);
  };

  return (
    // Overall layout: full-height column with header, main dashboard content,
    // and footer pinned at the bottom when content is short.
    <div className="min-h-screen bg-sage flex flex-col">
      <Header />

      {/* Main content area that holds the tri-view grid and the timeline slider. */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Outer card that visually groups the region grid. */}
          <div className="bg-sage-dark/60 border-4 border-prussian rounded-2xl overflow-hidden">
            {/* Two-column grid: left column for category labels, right for the 3 region columns. */}
            <div className="grid grid-cols-[auto,1fr]">
              {/* Vertical label rail for ARMOR on the left. */}
              <div className="bg-sage/60 border-r-4 border-prussian px-4 sm:px-6 py-6 flex flex-col justify-center text-left text-xs sm:text-sm font-heading text-prussian tracking-wide">
                <span>ARMOR</span>
              </div>

              {/* Right side: three region columns rendered from artifactsByRegion. */}
              <div className="px-4 sm:px-6 py-6 bg-sage-light/70">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full">
                  {Object.entries(artifactsByRegion).map(([regionName, data]) => (
                    <RegionColumn
                      key={regionName}
                      regionName={regionName}
                      armorArtifact={data.armor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Era Selector Dropdown */}
          <div className="mt-8 max-w-2xl mx-auto">
            <label htmlFor="era-select" className="block text-center text-sm font-heading text-gold mb-3 tracking-widest uppercase">
              Select Historical Era
            </label>
            <div className="relative">
              <select
                id="era-select"
                value={selectedEra}
                onChange={handleEraChange}
                className="w-full px-6 py-4 text-base font-body text-white bg-prussian border-4 border-gold rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-gold/50 cursor-pointer transition-all hover:bg-prussian/90 appearance-none pr-12"
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

          {/* Simple loading / error feedback */}
          {isLoading && (
            <p className="mt-4 text-center text-xs sm:text-sm font-body text-prussian">
              Loading artifacts from The Met API...
            </p>
          )}
          {error && (
            <p className="mt-4 text-center text-xs sm:text-sm font-body text-red-700">
              {error}
            </p>
          )}

          {/* Current era label */}
          <p className="mt-4 text-center text-xs sm:text-sm font-body text-prussian">
            Currently exploring: <span className="font-semibold">
              {HISTORICAL_ERAS.find(e => e.id === selectedEra)?.label || 'Historical Era'}
            </span>
          </p>

          {/* Page Description - Bottom */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-prussian mb-4">
              About Parallel Timelines
            </h2>
            <p className="text-base sm:text-lg text-gold/90 font-body leading-relaxed">
              Compare arms and armor across three civilizations at the same moment in history. 
              Select an era above to see what warriors in Europe, Asia, and the Middle East 
              were wearing and wielding simultaneously—revealing how different cultures approached 
              protection, warfare, and craftsmanship during the same time period.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;