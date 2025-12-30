import { create } from 'zustand';
import { fetchObjectDetails, searchMetObjects } from '../api/metApi';
import { HISTORICAL_ERAS, TOPICS } from '../data/config';

const useDashboardStore = create((set, get) => ({
  // State
  selectedEra: 'renaissance', // Default Era
  selectedTopic: 'warfare',   // Default Topic (Replaces searchQuery)
  
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
    set({ selectedEra: eraId, currentFetchId: fetchId, isLoading: true, error: null });
    get().fetchArtifactsForEra(eraId, get().selectedTopic, fetchId);
  },

  setSelectedTopic: (topicId) => {
    const fetchId = Date.now();
    set({ selectedTopic: topicId, currentFetchId: fetchId, isLoading: true, error: null });
    get().fetchArtifactsForEra(get().selectedEra, topicId, fetchId);
  },

  // THE ENGINE: Unified Fetch Logic with Keyword Injection Strategy
  fetchArtifactsForEra: async (eraId, topicId, fetchId) => {
    // 1. Resolve Configs (Safety Check)
    const era = HISTORICAL_ERAS.find(e => e.id === eraId) || HISTORICAL_ERAS[0];
    const topic = TOPICS.find(t => t.id === topicId) || TOPICS[0];
    
    // Prevent stale requests overwriting new ones
    if (!fetchId) fetchId = get().currentFetchId;

    console.log(`🚀 Fetching: [${era.label}] + [${topic.label}]`);

    const regions = ['Europe', 'Asia', 'Middle East'];

    const fetchPromises = regions.map(async (region) => {
      try {
        // 2. Define Region Keywords (The "Keyword Injection" Strategy)
        // Replaces strict geoLocation filtering
        let regionKeyword = region;
        if (region === 'Asia') regionKeyword = 'China'; // "China" has the largest dataset
        if (region === 'Middle East') regionKeyword = 'Islamic'; // Covers Ottoman, Persian, Arab
        if (region === 'Europe') regionKeyword = 'Europe';

        // Common API parameters (No geoLocation)
        const baseParams = {
          departmentId: topic.apiParams.departmentId || null,
          dateBegin: era.dateBegin,
          dateEnd: era.dateEnd,
        };

        // --- ATTEMPT 1: The Perfect Match ---
        // Query: "Topic Region" (e.g. "Furniture Europe")
        // Filter: Highlight TRUE
        const querySpecific = `${topic.apiParams.q} ${regionKeyword}`;
        
        console.log(`  [${region}] Attempt 1: Perfect Match ("${querySpecific}")`);
        let searchResult = await searchMetObjects({
          ...baseParams,
          query: querySpecific,
          isHighlight: true 
        });

        // --- ATTEMPT 2: The Volume Match ---
        // If Attempt 1 failed -> Same Query
        // Filter: Highlight FALSE
        if (!searchResult.objectIDs || searchResult.objectIDs.length === 0) {
           console.log(`  [${region}] Attempt 2: Volume Match (No Highlight)`);
           searchResult = await searchMetObjects({
              ...baseParams,
              query: querySpecific,
              isHighlight: false 
           });
        }

        // --- ATTEMPT 3: The Region Backup (Desperation Mode) ---
        // If Attempt 2 failed -> Query: Just Region (e.g. "Islamic")
        // Filter: Highlight TRUE (Show best of region)
        // Goal: "Topic failed, just show me the best stuff from this place."
        if (!searchResult.objectIDs || searchResult.objectIDs.length === 0) {
           console.log(`  [${region}] Attempt 3: Region Backup ("${regionKeyword}")`);
           searchResult = await searchMetObjects({
              ...baseParams,
              query: regionKeyword,
              isHighlight: true 
           });
        }

        // 3. Validation Loop (Find the first valid image)
        if (searchResult.objectIDs && searchResult.objectIDs.length > 0) {
          // Check the top 5 candidates
          const topIds = searchResult.objectIDs.slice(0, 5); 
          const detailsList = await Promise.all(topIds.map(id => fetchObjectDetails(id).catch(() => null)));
          
          // Filter for valid items with images
          const validItem = detailsList.find(item => item && item.primaryImageSmall);
          
          if (validItem) {
             console.log(`  ✅ [${region}] Found: ${validItem.title}`);
             // CRITICAL MAPPING HACK: 
             // We assign EVERYTHING to 'armor' so the UI displays it.
             return { region, type: 'armor', details: validItem };
          }
        }
        
        console.warn(`  ❌ [${region}] Gave up. No results found.`);
        return null;
      } catch (err) {
        console.error(`Error fetching ${region}:`, err);
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);

    // Check for race conditions
    if (get().currentFetchId !== fetchId) return;

    // 4. Update State
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
  },

  // Alias for backward compatibility if any components still call fetchArtifacts()
  fetchArtifacts: (fetchId) => {
      const state = get();
      get().fetchArtifactsForEra(state.selectedEra, state.selectedTopic, fetchId || state.currentFetchId);
  }
}));

export { useDashboardStore };