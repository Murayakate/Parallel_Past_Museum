import React, { useEffect } from 'react';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import RegionColumn from '../components/fordashboard/RegionColumn';
import { useDashboardStore } from '../store/useDashboardStore';
import { TOPICS, HISTORICAL_ERAS } from '../data/config';

const DashboardPage = () => {
  const {
    selectedEra,
    setSelectedEra,
    selectedTopic,
    setSelectedTopic,
    artifactsByRegion,
    isLoading,
    error,
    fetchArtifacts,
    narrativeTitle,
    narrativeSummary,
  } = useDashboardStore();

  // Fetch artifacts on initial load
  useEffect(() => {
    console.log('DashboardPage mounted, fetching artifacts');
    fetchArtifacts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEraChange = (e) => {
    setSelectedEra(e.target.value);
  };

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  // Get current config labels for display
  const currentEra = HISTORICAL_ERAS.find(e => e.id === selectedEra);
  const currentTopic = TOPICS.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-sage flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Narrative Section */}
          {narrativeTitle && (
            <div className="mb-10 bg-prussian border-4 border-gold/80 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-gold mb-6 text-center tracking-wide drop-shadow-sm">
                {narrativeTitle}
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg text-white font-body leading-loose text-justify border-l-4 border-gold/30 pl-6">
                  {narrativeSummary}
                </p>
              </div>
            </div>
          )}

          <div className="bg-sage-dark/60 border-4 border-prussian rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[auto,1fr]">
              <div className="bg-sage/60 border-r-4 border-prussian px-4 sm:px-6 py-6 flex flex-col justify-center text-left text-xs sm:text-sm font-heading text-prussian tracking-wide">
                <span>ARTIFACTS</span>
              </div>

              <div className="px-4 sm:px-6 py-6 bg-sage-light/70">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full">
                  {Object.entries(artifactsByRegion).map(([regionName, data]) => (
                    <RegionColumn
                      key={regionName}
                      regionName={regionName}
                      armorArtifact={data.armor}
                      weaponArtifact={data.weapon} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section: Topic Selector & Era Selector */}
          <div className="mt-8 max-w-5xl mx-auto space-y-6">
            
            {/* Topic Selector - Curated Theme Buttons */}
            <div>
              <label className="block text-center text-sm font-heading text-gold mb-4 tracking-widest uppercase">
                Select Topic
              </label>
              <div className="flex flex-wrap justify-center gap-3">
                {TOPICS.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic.id)}
                    disabled={isLoading}
                    className={`px-5 py-3 text-base font-body rounded-xl border-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedTopic === topic.id
                        ? 'bg-gold text-prussian border-gold shadow-lg scale-105'
                        : 'bg-white text-prussian border-sage-dark hover:border-gold hover:shadow-md'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Era Selector Dropdown */}
            <div className="max-w-md mx-auto">
              <label htmlFor="era-select" className="block text-center text-sm font-heading text-gold mb-3 tracking-widest uppercase">
                Select Era
              </label>
              <div className="relative">
                <select
                  id="era-select"
                  value={selectedEra}
                  onChange={handleEraChange}
                  disabled={isLoading}
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
                Loading {currentTopic?.label} artifacts from {currentEra?.label}...
              </p>
            </div>
          )}
          {error && (
            <p className="mt-8 text-center text-xs sm:text-sm font-body text-red-700 bg-red-50 border-2 border-red-300 rounded-lg p-4">
              {error}
            </p>
          )}

          {/* Current Context Info */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm font-body text-prussian">
              <span>
                Exploring <span className="font-semibold text-gold">{currentTopic?.label}</span> during <span className="font-semibold">{currentEra?.label}</span>
              </span>
            </p>
          </div>

          {/* Page Description */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-prussian mb-4">
              Parallel Past Explorer
            </h2>
            <p className="text-base sm:text-lg text-gold/90 font-body leading-relaxed">
              Discover how three great civilizations expressed the same themes differently. 
              Select an era and topic above to explore curated artifacts and historical context.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;