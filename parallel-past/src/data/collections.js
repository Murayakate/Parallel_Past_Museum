// Collections data structure for the Collections page
// Each collection represents a thematic grouping of artifacts

export const COLLECTIONS = [
  {
    id: "battlefield",
    name: "THE BATTLEFIELD",
    description: "Weapons and armor forged for war",
    searchTerms: ["sword", "armor", "helmet", "shield", "battle axe", "mace", "war hammer"],
    dateRange: { begin: 1200, end: 1800 }
  },
  {
    id: "court",
    name: "THE COURT",
    description: "Ceremonial arms of nobility and royalty",
    searchTerms: ["ceremonial", "parade", "royal", "ornate", "decorated", "gilt", "court"],
    dateRange: { begin: 1400, end: 1800 }
  },
  {
    id: "duel",
    name: "THE DUEL",
    description: "Weapons of personal combat and honor",
    searchTerms: ["rapier", "dagger", "dueling", "pistol", "smallsword", "epee"],
    dateRange: { begin: 1500, end: 1900 }
  }
];
