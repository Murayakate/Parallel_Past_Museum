import { create } from 'zustand';
import { searchArmsAndArmor, fetchObjectDetails } from '../api/metApi';
import { COLLECTIONS } from '../data/collections';

const useCollectionsStore = create((set, get) => ({
  // State
  activeCollection: "battlefield",
  artifacts: [],
  isLoading: false,
  error: null,
  
  // Actions
  setActiveCollection: (collectionId) => {
    set({ activeCollection: collectionId });
    get().fetchCollectionArtifacts(collectionId);
  },
  
  // Fetch artifacts for a specific collection
  fetchCollectionArtifacts: async (collectionId) => {
    const collection = COLLECTIONS.find(c => c.id === collectionId);
    if (!collection) {
      console.error(`Collection not found: ${collectionId}`);
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      console.log(`🔍 Fetching artifacts for collection: ${collection.name}`);
      
      // Search for artifacts using multiple search terms
      const searchPromises = collection.searchTerms.map(term =>
        searchArmsAndArmor({
          query: term,
          dateBegin: collection.dateRange.begin,
          dateEnd: collection.dateRange.end
        })
      );
      
      const searchResults = await Promise.all(searchPromises);
      
      // Combine and deduplicate object IDs
      const allObjectIds = searchResults
        .flatMap(result => result.objectIDs || [])
        .filter((id, index, self) => self.indexOf(id) === index); // Remove duplicates
      
      console.log(`Found ${allObjectIds.length} unique artifacts`);
      
      // Randomly select 20-30 artifacts for display
      const selectedCount = Math.min(25, allObjectIds.length);
      const shuffled = allObjectIds.sort(() => 0.5 - Math.random());
      const selectedIds = shuffled.slice(0, selectedCount);
      
      // Fetch details for selected artifacts
      const detailsPromises = selectedIds.map(id =>
        fetchObjectDetails(id)
          .then(details => {
            if (details?.primaryImage || details?.primaryImageSmall) {
              return {
                id: details.objectID,
                title: details.title || 'Untitled',
                culture: details.culture || 'Unknown',
                period: details.period || details.objectDate || '',
                region: details.country || details.geographyType || '',
                imageUrl: details.primaryImage || details.primaryImageSmall,
                objectUrl: details.objectURL,
                medium: details.medium || '',
                dimensions: details.dimensions || ''
              };
            }
            return null;
          })
          .catch(err => {
            console.warn(`Failed to fetch artifact ${id}:`, err.message);
            return null;
          })
      );
      
      const artifacts = (await Promise.all(detailsPromises)).filter(Boolean);
      
      console.log(`✅ Loaded ${artifacts.length} artifacts with images`);
      set({ artifacts, isLoading: false });
      
    } catch (error) {
      console.error('❌ Failed to fetch collection artifacts:', error);
      set({
        error: 'Failed to load artifacts from The Met Museum.',
        isLoading: false
      });
    }
  },
  
  // Initialize with default collection
  initialize: () => {
    const { activeCollection, artifacts } = get();
    if (artifacts.length === 0) {
      get().fetchCollectionArtifacts(activeCollection);
    }
  }
}));

export { useCollectionsStore };
