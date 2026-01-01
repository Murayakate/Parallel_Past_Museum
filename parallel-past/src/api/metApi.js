// these are my helping  functions for talking to The Metropolitan Museum of Art Collection API.
// Base URL for all endpoints we care about.
const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Helper: build a full URL from a path and a params object.
// Example:
//   buildUrl('/search', { q: 'helmet', departmentId: 4 })
//   -> "https://.../public/collection/v1/search?q=helmet&departmentId=4"
const buildUrl = (path, params = {}) => {
  const url = new URL(`${MET_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
};

// Search for object IDs with flexible filters
export const searchMetObjects = async ({ 
  query = '', 
  departmentId = null, 
  geoLocation = null, 
  dateBegin = null, 
  dateEnd = null,
  isHighlight = false
}) => {
  const url = buildUrl('/search', {
    q: query || '*',
    hasImages: 'true',
    departmentId: departmentId, 
    geoLocation: geoLocation,
    dateBegin: dateBegin,
    dateEnd: dateEnd,
    isHighlight: isHighlight
  });

  console.log('Calling Met API (Search):', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Met API search failed: ${response.status} ${response.statusText}`);
      return { total: 0, objectIDs: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Met API search error:', error);
    return { total: 0, objectIDs: [] };
  }
};

// Legacy support for specific Arms & Armor search
export const searchArmsAndArmor = async ({ query = 'armor', geoLocation = null, dateBegin = null, dateEnd = null }) => {
  return searchMetObjects({
    query,
    departmentId: 4, // Arms and Armor
    geoLocation,
    dateBegin,
    dateEnd
  });
};

// Fetch full details for a single object ID: title, culture, period, image URL, etc.
export const fetchObjectDetails = async (objectId) => {
  if (!objectId) {
    throw new Error('fetchObjectDetails called without an objectId');
  }

  const url = `${MET_BASE_URL}/objects/${objectId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Object request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default {
  searchArmsAndArmor,
  fetchObjectDetails,
};
