# Collections Page

> **File:** `src/pages/CollectionsPage.jsx`  
> **Route:** `/collections`  
> **Last Updated:** December 2024

---

## 📖 Overview

The Collections Page allows users to browse and search the broader artifact catalog. Unlike the curated Dashboard, this page provides a more exploratory experience with filtering by category and live API search functionality.

---

## 🎯 Core Features

### 1. Category Filters
Filter artifacts by usage context:
- **All** - Show everything
- **Battlefield** - Combat armor and weapons
- **Court** - Ceremonial and display pieces
- **Duel** - Personal combat equipment

### 2. Masonry Grid Layout
Variable-sized cards create visual interest:
- `large` items span 2 columns and 2 rows
- `medium` items span 2 columns OR 2 rows
- `small` items occupy single cells

### 3. Archive Search
Live search against the Met Museum API:
- Queries the Arms & Armor department
- Results replace the curated grid
- Fallback filtering for missing images

---

## 🧩 Component Structure

```
CollectionsPage.jsx
├── Header
├── Page Title Section
├── Filter Buttons (All, Battlefield, Court, Duel)
├── Search Input
├── Masonry Grid
│   └── ArtifactCard × n (from local JSON or API)
├── SynthesisPanel (artifact detail panel)
└── Footer
```

---

## 🔌 Data Sources

### Local Data (`src/data/armory.json`)
Pre-curated list of artifacts with:
```json
{
  "id": 25170,
  "title": "Pair of Flintlock Pistols",
  "category": "battlefield",
  "region": "Europe",
  "date": "ca. 1800",
  "image_url": "https://...",
  "size": "large"
}
```

### API Search
When user searches, fetches from Met Museum API:
```javascript
// Search endpoint
https://collectionapi.metmuseum.org/public/collection/v1/search?q={query}&departmentId=4

// Object details
https://collectionapi.metmuseum.org/public/collection/v1/objects/{id}
```

---

## 🎨 Visual Themes

Filters apply subtle background theming:

| Filter | Theme |
|--------|-------|
| All | No special styling |
| Battlefield | Rust/Orange tint (`border-orange-900/50`) |
| Court | Gold tint (`border-yellow-600/50`) |
| Duel | Steel blue tint (`border-slate-600/50`) |

---

## 📱 Responsive Behavior

| Breakpoint | Grid Columns |
|------------|--------------|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3 columns |

Large/medium items still span multiple cells where space allows.

---

## 🔄 State Management

```javascript
const [activeFilter, setActiveFilter] = useState('all');
const [hoveredId, setHoveredId] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);
const [apiItems, setApiItems] = useState([]);
const [isLoading, setIsLoading] = useState(false);
```

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: Collections Grid](../images/placeholder-collections-grid.png)
![Placeholder: Collections Search](../images/placeholder-collections-search.png)

---

## 🔗 Related Files

- `src/data/armory.json` - Local artifact catalog
- `src/api/metApi.js` - API helper functions
- `src/components/collections/SynthesisPanel.jsx` - Detail panel component
