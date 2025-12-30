export const TOPICS = [
  {
    id: 'warfare',
    label: '⚔️ Warfare',
    // Logic: Arms & Armor Department.
    apiParams: { departmentId: 4, q: '*' } 
  },
  {
    id: 'daily_life',
    label: '⚱️ Daily Life',
    // Logic: Household objects. Single strong keyword.
    apiParams: { q: 'Furniture' }
  },
  {
    id: 'fashion',
    label: '👘 Fashion',
    // Logic: Wearable history. Single strong keyword.
    apiParams: { q: 'Jewelry' }
  },
  {
    id: 'faith',
    label: '🕌 Faith',
    // Logic: Religious artifacts. Single strong keyword.
    apiParams: { q: 'Sculpture' }
  },
  {
    id: 'knowledge',
    label: '📖 Knowledge',
    // Logic: Science and writing tools. Single strong keyword.
    apiParams: { q: 'Book' }
  }
];

export const HISTORICAL_ERAS = [
  { id: 'medieval', label: 'The Age of Steel (1000–1400)', dateBegin: 1000, dateEnd: 1400 },
  { id: 'renaissance', label: 'Renaissance & Discovery (1400–1600)', dateBegin: 1400, dateEnd: 1600 },
  { id: 'elegance', label: 'The Age of Elegance (1600–1750)', dateBegin: 1600, dateEnd: 1750 },
  { id: 'empires', label: 'The Age of Empires (1750–1900)', dateBegin: 1750, dateEnd: 1900 }
];
