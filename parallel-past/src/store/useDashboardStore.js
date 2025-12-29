import { create } from 'zustand';
import { fetchObjectDetails, searchMetObjects } from '../api/metApi';
import { HISTORICAL_ERAS } from '../data/historicalEras';

const useDashboardStore = create((set, get) => ({
  // State
  selectedEra: "golden_age",
  searchQuery: "", 
  artifactsByRegion: {
    Europe: { armor: null, weapon: null },
    Asia: { armor: null, weapon: null },
    'Middle East': { armor: null, weapon: null }
  },
  isLoading: false,
  error: null,
  currentFetchId: null,

  // Actions
  setSelectedEra: (eraId) => {
    const fetchId = Date.now();
    
    set({ 
      selectedEra: eraId,
      currentFetchId: fetchId,
      isLoading: true,
      error: null
    });
    
    get().fetchArtifactsForEra(eraId, get().searchQuery, fetchId);
  },

  setSearchQuery: (query) => {
    const fetchId = Date.now();
    set({ 
      searchQuery: query,
      currentFetchId: fetchId,
      isLoading: true,
      error: null
    });
    get().fetchArtifactsForEra(get().selectedEra, query, fetchId);
  },

  // Fetch artifacts based on Era and Search Query
  fetchArtifactsForEra: async (eraId, query = "", fetchId = null) => {
    const era = HISTORICAL_ERAS.find(e => e.id === eraId);
    if (!era) {
      console.error(`Era not found: ${eraId}`);
      set({ error: `Configuration error: Era "${eraId}" not found`, isLoading: false });
      return;
    }

    if (!get().isLoading) {
      set({ isLoading: true, error: null });
    }

    try {
      const regions = ['Europe', 'Asia', 'Middle East'];
      const types = ['armor', 'weapons']; 
      
      console.log(`🔍 Fetching for era: ${era.label} | Query: "${query}" | (fetchId: ${fetchId})`);

      let fetchPromises;

      // CONDITION A: ERA MODE (Empty Search)
      // Fetch random/curated artifacts for the selected years
      if (!query.trim()) {
        fetchPromises = types.flatMap(type =>
          regions.map(region => {
            const artifactId = era.artifacts[type]?.[region];
            if (!artifactId) return Promise.resolve(null);
            
            return fetchObjectDetails(artifactId)
              .then(details => {
                if (details?.primaryImageSmall) {
                  return { region, type, details };
                }
                return null;
              })
              .catch(err => {
                console.error(`❌ Failed to fetch curated ${region} ${type}:`, err);
                return null;
              });
          })
        );
      } 
      // CONDITION B: BROWSE MODE (Specific Search)
      else {
        fetchPromises = regions.map(async (region) => {
          try {
            // FIX 1: Map "Middle East" to valid MET API countries
            let apiGeoLocation = region;
            if (region === 'Asia') apiGeoLocation = 'China|Japan';
            if (region === 'Middle East') apiGeoLocation = 'Iran|Turkey|Egypt|Syria'; // Specific countries required

            // FIX 2: Relaxed Search (No isHighlight, No Strict Title Match)
            // Trust the MET's search engine to return relevant results for the query.
            const searchResult = await searchMetObjects({
              query: query,
              geoLocation: apiGeoLocation,
              isHighlight: false // Turned off to ensure we get results even for obscure items
            });

            if (searchResult.total > 0 && searchResult.objectIDs) {
              // Fetch top 3 items (Reduced from 10 to prevent Rate Limiting errors)
              const topIds = searchResult.objectIDs.slice(0, 3);
              const detailPromises = topIds.map(id => fetchObjectDetails(id).catch(() => null));
              const candidates = await Promise.all(detailPromises);

              // Just find the first one with an image. 
              // We removed the "title.includes(query)" check because a "Sallet" is a "Helmet".
              const validItem = candidates.find(c => c && c.primaryImageSmall);

              if (validItem) {
                 return { region, type: 'armor', details: validItem };
              }
            }
            return null;
          } catch (e) {
            console.error(`Search failed for ${region}:`, e);
            return null;
          }
        });
      }
      
      const rawResults = await Promise.all(fetchPromises);
      const results = rawResults.flat().filter(Boolean);
      
      if (fetchId && get().currentFetchId !== fetchId) {
        console.log(`⏭️ Discarding stale data for ${fetchId}`);
        return;
      }
      
      const newArtifacts = {
        Europe: { armor: null, weapon: null },
        Asia: { armor: null, weapon: null },
        'Middle East': { armor: null, weapon: null }
      };
      
      results.forEach(result => {
        if (result?.details) {
          const { region, type, details } = result;
          const artifactType = type === 'weapons' ? 'weapon' : 'armor';
          
          newArtifacts[region][artifactType] = {
            id: details.objectID,
            title: details.title,
            subtitle: details.culture || details.country || region,
            description: details.medium || 'Material details unavailable',
            ctaLabel: 'View on Met Museum',
            imageUrl: details.primaryImageSmall,
            objectUrl: details.objectURL,
            region,
            type: artifactType
          };
        }
      });
      
      console.log('✅ Artifacts loaded:', newArtifacts);
      set({ artifactsByRegion: newArtifacts, isLoading: false });
      
    } catch (error) {
      console.error('❌ Failed to fetch artifacts:', error);
      if (!fetchId || get().currentFetchId === fetchId) {
        set({ error: 'Failed to load artifacts.', isLoading: false });
      }
    }
  }
}));

export { useDashboardStore };