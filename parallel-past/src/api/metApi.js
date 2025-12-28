// these are my helping  functions for talking to The Metropolitan Museum of Art Collection API.
// Base URL for all endpoints we care about.
// Using local proxy /api/met to avoid CORS issues i got.
const MET_BASE_URL = '/api/met/public/collection/v1';

// Helper: build a full URL from a path and a params object.
// Example:
//   buildUrl('/search', { q: 'helmet', departmentId: 4 })
//   -> "https://.../public/collection/v1/search?q=helmet&departmentId=4"
const buildUrl = (path, params = {}) => {
  // Properly concatenate base URL with path
  const fullPath = `${MET_BASE_URL}${path}`;
  // Use window.location.origin as base for relative proxy URLs
  const url = new URL(fullPath, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
};

// Search for object IDs related to Arms & Armor.
export const searchArmsAndArmor = async ({ query = 'armor', geoLocation = null, dateBegin = null, dateEnd = null }) => {
  const url = buildUrl('/search', {
    q: query,
    hasImages: 'true',
    departmentId: 4, //this is the official no (4) for the  Arms and Armor department
    geoLocation: geoLocation,
    dateBegin: dateBegin,
    dateEnd: dateEnd
  });

  console.log('Calling Met API:', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Met API search failed: ${response.status} ${response.statusText}`);
      return { total: 0, objectIDs: [] };
    }

    const data = await response.json();
    console.log(`Met API search response: ${data.total} results for "${query}"`);
    return data;
  } catch (error) {
    console.error('Met API search error:', error);
    return { total: 0, objectIDs: [] };
  }
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
