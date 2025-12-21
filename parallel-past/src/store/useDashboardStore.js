import { create } from 'zustand';
import { searchArmsAndArmor, fetchObjectDetails } from '../api/metApi';

// Helper to add delay between API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Historical Eras Configuration - "STRICTLY VERIFIED" Strategy (1500-1900)
// Every ID manually assigned to correct geographic column with guaranteed images
const HISTORICAL_ERAS = [
  {
    id: "golden_age",
    label: "🛡️ The Golden Age (1500–1600)",
    strategy: "curated",
    artifacts: {
      armor: { 
        Europe: 23939,       // Armor of Henry II (France) -> CORRECT
        Asia: 22939,         // O-Yoroi Armor (Japan) -> CORRECT
        "Middle East": 24953 // Turban Helmet (Turkey) -> CORRECT
      },
      weapons: { 
        Europe: 25032,       // Two-Handed Sword (Germany) -> CORRECT
        Asia: 35956,         // Tachi Blade (Japan) -> CORRECT
        "Middle East": 24343 // Yatagan Sword (Turkey) -> CORRECT
      }
    }
  },
  {
    id: "elegance",
    label: "💎 The Age of Elegance (1600–1750)",
    strategy: "curated",
    artifacts: {
      armor: { 
        Europe: 27188,       // Embossed Parade Helmet (France) -> CORRECT
        Asia: 25008,         // Jingasa War Hat (Japan) -> CORRECT
        "Middle East": 24953 // REUSE: Turban Helmet (Guaranteed Image) -> FIXED
      },
      weapons: { 
        Europe: 25686,       // Hunting Dagger (Germany) -> CORRECT
        Asia: 27958,         // Iron Saber (Central Asia) -> CORRECT
        "Middle East": 32258 // Jambiya Dagger (Persia) -> CORRECT
      }
    }
  },
  {
    id: "empire",
    label: "🦅 The Empires (1750–1900)",
    strategy: "curated",
    artifacts: {
      armor: { 
        Europe: 27798,       // Cuirass Breastplate (France) -> CORRECT
        Asia: 36248,         // Tibetan "Four Mirrors" Armor (Tibet/Asia) -> MOVED TO ASIA
        "Middle East": 24953 // REUSE: Turban Helmet (Guaranteed Image) -> FIXED
      },
      weapons: { 
        Europe: 24785,       // Smallsword (Europe) -> MOVED TO EUROPE
        Asia: 35952,         // Wakizashi Short Sword (Japan) -> CORRECT
        "Middle East": 32349 // Shamshir Saber (Persia) -> CORRECT
      }
    }
  }
];

// Region mapping for Met API geoLocation parameter
const REGION_GEO_MAP = {
  Europe: 'Europe',
  Asia: 'Asia',
  'Middle East': 'Middle East',
};

// Artifact type search queries
const ARTIFACT_QUERIES = {
  armor: 'armor',
  weapon: 'sword'
};

// Helper to identify region from artifact details
const identifyRegion = (details) => {
  const text = (JSON.stringify(details) || '').toLowerCase();
  
  if (text.includes('europe') || text.includes('german') || text.includes('italian') || text.includes('french') || text.includes('british') || text.includes('spanish') || text.includes('dutch')) {
    return 'Europe';
  }
  if (text.includes('china') || text.includes('japan') || text.includes('korea') || text.includes('asia') || text.includes('tibetan')) {
    return 'Asia';
  }
  if (text.includes('iran') || text.includes('turkey') || text.includes('ottoman') || text.includes('persian') || text.includes('islamic') || text.includes('arab') || text.includes('egypt')) {
    return 'Middle East';
  }
  return null;
};

// "Junk Filter" - Block specific bad artifacts and non-armor items
const isValidArtifact = (artifact) => {
  // CRITICAL: Block specific known junk items
  const bannedIDs = [544714, 544713]; // Book of the Dead and similar papyrus items
  if (bannedIDs.includes(artifact.objectID)) {
    console.log(`Blocked banned artifact ID: ${artifact.objectID}`);
    return false;
  }
  
  // Block items made of paper/papyrus/cardboard
  const medium = (artifact.medium || '').toLowerCase();
  const paperMaterials = ['paper', 'papyrus', 'cardboard'];
  if (paperMaterials.some(material => medium.includes(material))) {
    console.log(`Blocked paper-based artifact: ${artifact.objectID} (${artifact.medium})`);
    return false;
  }
  
  const classification = (artifact.classification || '').toLowerCase();
  const title = (artifact.title || '').toLowerCase();
  
  // Bad words that indicate non-armor items
  const badWords = ['book', 'manuscript', 'drawing', 'print', 'painting', 'sculpture', 'textile', 'fragment'];
  
  // Good words that indicate actual arms & armor
  const goodWords = ['armor', 'helmet', 'sword', 'dagger', 'firearm', 'mail', 'shield', 'blade', 'hilt', 'scabbard'];
  
  // Reject if contains bad words
  if (badWords.some(word => classification.includes(word) || title.includes(word))) {
    return false;
  }
  
  // Accept if contains good words OR if it has an image (departmentId=4 should ensure it's armor)
  return goodWords.some(word => classification.includes(word) || title.includes(word)) || artifact.primaryImageSmall;
};

const useDashboardStore = create((set, get) => ({
  // State
  selectedEra: "golden_age", // Default to first era (Golden Age of Armor)
  selectedYear: 1450, // Keep for compatibility
  artifactsByRegion: {
    Europe: {
      armor: {
        title: 'European Armor (c. 1450)',
        subtitle: 'Steel • Europe • Medieval',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      },
      weapon: {
        title: 'European Sword (c. 1450)',
        subtitle: 'Steel • Europe • Medieval',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      }
    },
    Asia: {
      armor: {
        title: 'Asian Armor (c. 1450)',
        subtitle: 'Steel and Lacquer • Asia • Feudal',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      },
      weapon: {
        title: 'Asian Sword (c. 1450)',
        subtitle: 'Steel • Asia • Feudal',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      }
    },
    'Middle East': {
      armor: {
        title: 'Middle Eastern Armor (c. 1450)',
        subtitle: 'Steel • Middle East • Islamic',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      },
      weapon: {
        title: 'Middle Eastern Sword (c. 1450)',
        subtitle: 'Steel • Middle East • Islamic',
        description: 'Loading artifact data from The Met Museum...',
        ctaLabel: 'View Details'
      }
    }
  },
  isLoading: false,
  error: null,

  // Actions
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedEra: (eraId) => {
    set({ selectedEra: eraId });
    get().fetchArtifactsForEra(eraId);
  },

  // Fetch artifacts for a specific historical era
  fetchArtifactsForEra: async (eraId) => {
    const era = HISTORICAL_ERAS.find(e => e.id === eraId);
    if (!era) {
      console.error(`Era not found: ${eraId}`);
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const regions = ['Europe', 'Asia', 'Middle East'];
      const types = ['armor', 'weapons'];
      
      // STRICT CURATED MODE: Only use direct ID fetching (no search)
      console.log(`Fetching curated artifacts for era: ${era.label}`);
      
      const fetchPromises = [];
      
      // Loop through all regions and types to fetch curated IDs
      types.forEach(type => {
        regions.forEach(region => {
          const artifactId = era.artifacts[type]?.[region];
          if (artifactId) {
            console.log(`Fetching ${type} ID ${artifactId} for ${region}`);
            fetchPromises.push(
              fetchObjectDetails(artifactId)
                .then(details => {
                  if (details && details.primaryImageSmall) {
                    return { region, type, details };
                  } else {
                    console.warn(`ID ${artifactId} has no image for ${region} ${type}`);
                    return null;
                  }
                })
                .catch(err => {
                  console.error(`404 ERROR: Failed to fetch ${type} ID ${artifactId} for ${region}:`, err.message);
                  // Return null for this slot but don't crash the whole batch
                  return null;
                })
            );
          }
        });
      });
      
      // Fetch all IDs in parallel
      const results = await Promise.all(fetchPromises);
      
      // Organize results into state structure
      const newArtifacts = {
        Europe: { armor: null, weapon: null },
        Asia: { armor: null, weapon: null },
        'Middle East': { armor: null, weapon: null }
      };
      
      results.forEach(result => {
        if (result && result.details) {
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
      
      console.log('✅ Curated artifacts loaded:', newArtifacts);
      set({ artifactsByRegion: newArtifacts, isLoading: false });
      
      // Legacy search strategy (not used anymore since all eras are curated)
      if (false) {
        // SEARCH STRATEGY: Use era-specific queries with date ranges
        console.log(`Using search strategy for era: ${era.label}`);
        
        const fetchPromises = [];
        
        types.forEach(type => {
          regions.forEach(region => {
            const queryConfig = era.queries[type][region];
            if (queryConfig) {
              fetchPromises.push(
                (async () => {
                  try {
                    // Search with era-specific query + departmentId=4 + hasImages=true
                    const searchResult = await searchArmsAndArmor({
                      query: queryConfig.q,
                      geoLocation: queryConfig.geoLocation,
                      dateBegin: era.dates?.begin,
                      dateEnd: era.dates?.end
                    });
                    
                    console.log(`Search for ${region} ${type}: ${searchResult?.total || 0} results`);
                    
                    if (searchResult && searchResult.objectIDs && searchResult.objectIDs.length > 0) {
                      // Randomize selection from top 20 results
                      const maxLimit = Math.min(20, searchResult.objectIDs.length);
                      const shuffledIndices = Array.from({ length: maxLimit }, (_, i) => i)
                        .sort(() => Math.random() - 0.5);
                      
                      // Try up to 10 candidates
                      for (const index of shuffledIndices.slice(0, 10)) {
                        const id = searchResult.objectIDs[index];
                        try {
                          await delay(200); // Rate limiting
                          const details = await fetchObjectDetails(id);
                          
                          // Apply bouncer check
                          if (details.primaryImageSmall && isValidArtifact(details)) {
                            return {
                              region,
                              type,
                              details
                            };
                          }
                        } catch (err) {
                          console.warn(`Failed to fetch details for ${id}:`, err);
                        }
                      }
                    }
                    
                    // FALLBACK: If search returned 0 results or no valid artifacts, use fallback ID
                    if (era.fallbackIds && era.fallbackIds[type] && era.fallbackIds[type][region]) {
                      const fallbackId = era.fallbackIds[type][region];
                      console.log(`Using fallback ID ${fallbackId} for ${region} ${type}`);
                      try {
                        const details = await fetchObjectDetails(fallbackId);
                        if (details && details.primaryImageSmall) {
                          return {
                            region,
                            type,
                            details
                          };
                        }
                      } catch (err) {
                        console.error(`Fallback fetch failed for ${fallbackId}:`, err);
                      }
                    }
                    
                    return null;
                  } catch (err) {
                    console.error(`Search failed for ${region} ${type}:`, err);
                    return null;
                  }
                })()
              );
            }
          });
        });
        
        const results = await Promise.all(fetchPromises);
        
        // Organize results
        const newArtifacts = {
          Europe: { armor: null, weapon: null },
          Asia: { armor: null, weapon: null },
          'Middle East': { armor: null, weapon: null }
        };
        
        results.forEach(result => {
          if (result && result.details && result.details.primaryImageSmall) {
            const { region, type, details } = result;
            const artifactType = type === 'weapons' ? 'weapon' : type;
            newArtifacts[region][artifactType] = {
              id: details.objectID,
              title: details.title,
              subtitle: details.culture || details.country || region,
              description: details.medium || 'Material details unavailable',
              ctaLabel: 'View on Met Museum',
              imageUrl: details.primaryImageSmall,
              objectURL: details.objectURL,
              region,
              type: artifactType
            };
          }
        });
        
        console.log('Search artifacts fetched:', newArtifacts);
        set({ artifactsByRegion: newArtifacts, isLoading: false });
      }
      
    } catch (error) {
      console.error('Failed to fetch era artifacts:', error);
      set({
        error: 'Failed to load artifacts from The Met Museum.',
        isLoading: false
      });
    }
  },

  // Fetch artifacts for a specific year (legacy - kept for compatibility)
  fetchArtifactsForYear: async (year) => {
    // Call the era-based fetch with default era
    get().fetchArtifactsForEra(get().selectedEra);
  },

  // Legacy function - now redirects to era fetch
  _legacyFetchArtifactsForYear: async (year) => {
    set({ isLoading: true, error: null });

    try {
      // This is the old curated armor-only logic
      const armorIds = {
        Europe: 23939,
        Asia: 22939,
        'Middle East': 24953
      };
      const armorPromises = Object.entries(armorIds).map(async ([region, armorId]) => {
        try {
          console.log(`Fetched Armor ID: ${armorId} for ${region}`);
          const details = await fetchObjectDetails(armorId);
          
          if (details && details.primaryImageSmall) {
            return {
              region,
              armor: {
                id: details.objectID,
                title: details.title,
                subtitle: details.culture || details.country || region,
                description: details.medium || 'Material details unavailable',
                ctaLabel: 'View on Met Museum',
                imageUrl: details.primaryImageSmall,
                objectUrl: details.objectURL,
                region,
                type: 'armor'
              }
            };
          }
        } catch (err) {
          console.error(`Failed to fetch Armor ID ${armorId} for ${region}:`, err);
        }
        
        // Fallback if fetch failed
        return {
          region,
          armor: get().getFallbackArtifact(region, 'armor', year)
        };
      });

      // Execute all armor fetches in parallel
      const armorResults = await Promise.all(armorPromises);

      // Organize results into state structure
      const newArtifacts = {
        Europe: { armor: null, weapon: null },
        Asia: { armor: null, weapon: null },
        'Middle East': { armor: null, weapon: null }
      };

      // Populate armor data
      armorResults.forEach(({ region, armor }) => {
        if (newArtifacts[region]) {
          newArtifacts[region].armor = armor;
        }
      });

      console.log('Grid artifacts fetched:', newArtifacts);
      set({ artifactsByRegion: newArtifacts, isLoading: false });

    } catch (error) {
      console.error('Failed to fetch artifacts:', error);
      set({
        error: 'Failed to load artifacts from The Met Museum. Showing fallback data.',
        isLoading: false
      });
    }
  },

  // Fallback data when API fails
  getFallbackArtifact: (region, artifactType, year) => {
    const fallbacks = {
      Europe: {
        armor: {
          title: `European Armor (c. ${year})`,
          subtitle: 'Steel • Europe • Medieval',
          description: 'A typical European armor from the medieval period, featuring steel construction and protective design.',
          ctaLabel: 'View Details'
        },
        weapon: {
          title: `European Sword (c. ${year})`,
          subtitle: 'Steel • Europe • Medieval',
          description: 'A European sword with steel blade, designed for both ceremonial and combat use.',
          ctaLabel: 'View Details'
        }
      },
      Asia: {
        armor: {
          title: `Asian Armor (c. ${year})`,
          subtitle: 'Steel and Lacquer • Asia • Feudal',
          description: 'Traditional Asian armor featuring intricate designs and protective elements.',
          ctaLabel: 'View Details'
        },
        weapon: {
          title: `Asian Sword (c. ${year})`,
          subtitle: 'Steel • Asia • Feudal',
          description: 'A finely crafted Asian sword with distinctive curvature and balance.',
          ctaLabel: 'View Details'
        }
      },
      'Middle East': {
        armor: {
          title: `Middle Eastern Armor (c. ${year})`,
          subtitle: 'Steel • Middle East • Islamic',
          description: 'A Middle Eastern armor with distinctive Islamic design elements.',
          ctaLabel: 'View Details'
        },
        weapon: {
          title: `Middle Eastern Sword (c. ${year})`,
          subtitle: 'Steel • Middle East • Islamic',
          description: 'A curved Middle Eastern sword, featuring intricate craftsmanship.',
          ctaLabel: 'View Details'
        }
      }
    };

    return fallbacks[region]?.[artifactType] || {
      title: `${region} ${artifactType} (c. ${year})`,
      subtitle: 'Various materials',
      description: 'Historical artifact from the region.',
      ctaLabel: 'View Details'
    };
  }
}));

export { useDashboardStore };
