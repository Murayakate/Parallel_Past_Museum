import { create } from 'zustand';
import { fetchObjectDetails } from '../api/metApi';
import { HISTORICAL_ERAS } from '../data/historicalEras';

const useDashboardStore = create((set, get) => ({
  // State
  selectedEra: "golden_age",
  artifactsByRegion: {
    Europe: { armor: null, weapon: null },
    Asia: { armor: null, weapon: null },
    'Middle East': { armor: null, weapon: null }
  },
  isLoading: false,
  error: null,
  currentFetchId: null,  // ✅ Track which fetch is current

  // Actions
  setSelectedEra: (eraId) => {
    const fetchId = Date.now();  // ✅ Generate unique fetch ID
    
    set({ 
      selectedEra: eraId,
      currentFetchId: fetchId,
      isLoading: true,    // ✅ Set loading immediately
      error: null         // ✅ Clear previous errors
    });
    
    get().fetchArtifactsForEra(eraId, fetchId);
  },

  // Fetch artifacts for a specific historical era
  fetchArtifactsForEra: async (eraId, fetchId = null) => {
    const era = HISTORICAL_ERAS.find(e => e.id === eraId);
    if (!era) {
      console.error(`Era not found: ${eraId}`);
      set({ 
        error: `Configuration error: Era "${eraId}" not found`,
        isLoading: false 
      });
      return;
    }

    // Only set loading if not already set (for initial load from component)
    if (!get().isLoading) {
      set({ isLoading: true, error: null });
    }

    try {
      const regions = ['Europe', 'Asia', 'Middle East'];
      const types = ['armor', 'weapons'];
      
      console.log(`🔍 Fetching Arms & Armor for era: ${era.label} (fetchId: ${fetchId || 'none'})`);
      
      // Fetch all curated artifact IDs in parallel
      const fetchPromises = types.flatMap(type =>
        regions.map(region => {
          const artifactId = era.artifacts[type]?.[region];
          if (!artifactId) return Promise.resolve(null);
          
          return fetchObjectDetails(artifactId)
            .then(details => {
              if (details?.primaryImageSmall) {
                return { region, type, details };
              }
              console.warn(`⚠️ No image for ${region} ${type} (ID: ${artifactId})`);
              return null;
            })
            .catch(err => {
              console.error(`❌ Failed to fetch ${region} ${type} (ID: ${artifactId}):`, err.message);
              return null;
            });
        })
      );
      
      const results = await Promise.all(fetchPromises);
      
      // ✅ CRITICAL: Check if this fetch is still relevant
      if (fetchId && get().currentFetchId !== fetchId) {
        console.log(`⏭️ Discarding stale data for ${eraId} (user selected a different era)`);
        return;
      }
      
      // Organize results by region and type
      const newArtifacts = {
        Europe: { armor: null, weapon: null },
        Asia: { armor: null, weapon: null },
        'Middle East': { armor: null, weapon: null }
      };
      
      results.forEach(result => {
        if (result?.details) {
          const { region, type, details } = result;
          const artifactType = type === 'weapons' ? 'weapon' : type;
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
      
      console.log('✅ Arms & Armor loaded:', newArtifacts);
      set({ artifactsByRegion: newArtifacts, isLoading: false });
      
    } catch (error) {
      console.error('❌ Failed to fetch era artifacts:', error);
      
      // ✅ Only set error if this is still the current fetch
      if (!fetchId || get().currentFetchId === fetchId) {
        set({
          error: 'Failed to load artifacts from The Met Museum.',
          isLoading: false
        });
      }
    }
  }
}));

export { useDashboardStore };