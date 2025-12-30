import { create } from 'zustand';
import { fetchObjectDetails } from '../api/metApi';
import { NARRATIVES } from '../data/narratives';

const useDashboardStore = create((set, get) => ({
  // State
  selectedEra: 'renaissance',
  selectedTopic: 'warfare',
  
  // Narrative content from config
  narrativeTitle: '',
  narrativeSummary: '',
  narrativeInsights: '',
  
  // Curate / Saved Items
  savedItems: [],
  isDrawerOpen: false,

  artifactsByRegion: {
    Europe: { armor: null, weapon: null },
    Asia: { armor: null, weapon: null },
    'Middle East': { armor: null, weapon: null }
  },
  
  isLoading: false,
  error: null,
  currentFetchId: null,

  // Actions
  toggleDrawer: () => set(state => ({ isDrawerOpen: !state.isDrawerOpen })),
  
  toggleSavedItem: (item) => {
    set(state => {
      const exists = state.savedItems.find(i => i.id === item.id);
      let newItems;
      if (exists) {
        newItems = state.savedItems.filter(i => i.id !== item.id);
      } else {
        newItems = [...state.savedItems, item];
      }
      // Persist
      localStorage.setItem('parallel_past_saved', JSON.stringify(newItems));
      return { savedItems: newItems };
    });
  },

  // Load saved items from local storage
  initializeSavedItems: () => {
    const saved = localStorage.getItem('parallel_past_saved');
    if (saved) {
      try {
        set({ savedItems: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse saved items', e);
      }
    }
  },

  setSelectedEra: (eraId) => {
    const fetchId = Date.now();
    set({ selectedEra: eraId, currentFetchId: fetchId, isLoading: true, error: null });
    get().fetchArtifacts(fetchId);
  },

  setSelectedTopic: (topicId) => {
    const fetchId = Date.now();
    set({ selectedTopic: topicId, currentFetchId: fetchId, isLoading: true, error: null });
    get().fetchArtifacts(fetchId);
  },

  // THE ENGINE: Curated Narrative Fetch (Hardcoded IDs)
  fetchArtifacts: async (fetchId) => {
    const { selectedEra, selectedTopic } = get();
    
    // Prevent stale requests
    if (!fetchId) fetchId = get().currentFetchId;

    // 1. Construct composite key and lookup narrative
    const narrativeKey = `${selectedEra}-${selectedTopic}`;
    const narrativeConfig = NARRATIVES[narrativeKey];

    if (!narrativeConfig) {
      console.error(`No narrative found for key: ${narrativeKey}`);
      set({ 
        isLoading: false, 
        error: `No content available for this combination.`,
        narrativeTitle: '',
        narrativeSummary: ''
      });
      return;
    }

    console.log(`🚀 Loading Narrative: [${narrativeKey}]`);

    // 2. Immediately update narrative text
    set({
      narrativeTitle: narrativeConfig.title,
      narrativeSummary: narrativeConfig.summary,
      narrativeInsights: narrativeConfig.insights || narrativeConfig.summary
    });

    // 3. Execute parallel ID fetches for each region
    const regions = ['Europe', 'Asia', 'Middle East'];

    const fetchPromises = regions.map(async (region) => {
      // Access specific ID from config
      const objectId = narrativeConfig.objectIds[region];
      
      if (!objectId) {
        console.warn(`No Object ID configured for region: ${region}`);
        return null;
      }

      try {
        console.log(`  [${region}] Fetching Object ID: ${objectId}`);
        
        // Direct ID Fetch (No Search)
        const details = await fetchObjectDetails(objectId);
        
        if (details) {
            console.log(`  ✅ [${region}] Loaded: ${details.title}`);
            return { region, details };
        }
        
        console.warn(`  ❌ [${region}] Failed to load details for ID: ${objectId}`);
        return null;
      } catch (err) {
        console.error(`  ❌ [${region}] Error fetching ID ${objectId}:`, err);
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);

    // Check for race conditions
    if (get().currentFetchId !== fetchId) return;

    // 4. Update state with results
    const newArtifacts = {
      Europe: { armor: null, weapon: null },
      Asia: { armor: null, weapon: null },
      'Middle East': { armor: null, weapon: null }
    };

    results.forEach(res => {
      if (res) {
        newArtifacts[res.region].armor = {
          id: res.details.objectID,
          title: res.details.title,
          subtitle: res.details.culture || res.region,
          description: res.details.medium || res.details.classification,
          imageUrl: res.details.primaryImageSmall,
          objectUrl: res.details.objectURL,
          region: res.region,
          type: 'armor'
        };
      }
    });

    set({ artifactsByRegion: newArtifacts, isLoading: false });
  }
}));

export { useDashboardStore };