# Dashboard Page (Timelines)

> **File:** `src/pages/DashboardPage.jsx`  
> **Route:** `/dashboard`  
> **Last Updated:** December 2024

---

## 📖 Overview

The Dashboard Page is the core experience of Parallel Past. It displays curated artifacts from three regions (Europe, Asia, Middle East) side-by-side, allowing users to compare how different civilizations expressed the same themes during the same historical periods.

---

## 🎯 Core Features

### 1. Editorial Insights Section
Dynamic narrative text that explains the significance of the current era/topic combination.

**Features:**
- **Drop Cap** styling for storybook feel
- **Serif typography** for elegance
- **Warm cream background** (#F9F8F4)
- **Context-aware content** from `narratives.js`

```jsx
<p className="first-letter:float-left first-letter:text-7xl first-letter:font-serif ...">
  {narrativeInsights}
</p>
```

### 2. Tri-Region Artifact Grid ("Trigrid")
Three columns displaying artifacts from Europe, Asia, and the Middle East.

**Responsive Behavior:**
| Device | Layout |
|--------|--------|
| Mobile | `grid-cols-1` (vertical scroll) |
| Desktop | `grid-cols-3` (side-by-side comparison) |

### 3. Topic & Era Selectors
- **Topic Buttons:** Warfare, Fashion, Daily Life
- **Era Dropdown:** Renaissance (1400–1600), Age of Empires (1750–1900)

---

## 🧩 Component Structure

```
DashboardPage.jsx
├── Header
├── Editorial Insights Section
│   └── narrativeTitle + narrativeInsights
├── Artifact Grid Container
│   ├── "ARTIFACTS" Sidebar (hidden on mobile)
│   └── RegionColumn × 3
│       └── ArtifactCard (with save button)
├── Controls Section
│   ├── Topic Selector Buttons
│   └── Era Selector Dropdown
├── Loading/Error States
└── Footer
```

---

## 📁 Key Components

### ArtifactCard (`src/components/fordashboard/ArtifactCard.jsx`)

**Purpose:** Display a single artifact with editorial styling.

**Features:**
- 4:5 aspect ratio image container
- `object-fit: cover` with `object-position: top`
- Region/culture tag overlapping image edge
- Heart button for saving to collection
- Hover zoom effect on image

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `id` | number | Met Museum object ID |
| `data` | object | Full artifact data for saving |
| `title` | string | Artifact title |
| `subtitle` | string | Culture/region label |
| `description` | string | Materials/medium |
| `imageUrl` | string | Met Museum image URL |
| `objectUrl` | string | Link to Met Museum page |

### RegionColumn (`src/components/fordashboard/RegionColumn.jsx`)

**Purpose:** Wrapper for artifacts from a single region.

**Features:**
- Region header (Europe, Asia, Middle East)
- Null check with "Data Unavailable" fallback
- Passes artifact data to ArtifactCard

---

## 🔄 State Management

The Dashboard uses Zustand (`useDashboardStore.js`) for state:

```javascript
{
  // Selection State
  selectedEra: 'renaissance',
  selectedTopic: 'warfare',
  
  // Narrative Content
  narrativeTitle: '',
  narrativeSummary: '',
  narrativeInsights: '',
  
  // Artifacts
  artifactsByRegion: {
    Europe: { armor: null },
    Asia: { armor: null },
    'Middle East': { armor: null }
  },
  
  // UI State
  isLoading: false,
  error: null,
  
  // Curate Feature
  savedItems: [],
  isDrawerOpen: false
}
```

---

## 🔌 Data Flow

```
1. User selects Era/Topic
   ↓
2. Store constructs key: `${era}-${topic}` (e.g., "renaissance-warfare")
   ↓
3. Lookup in NARRATIVES constant (src/data/narratives.js)
   ↓
4. Fetch artifact details from Met API using hardcoded IDs
   ↓
5. Update artifactsByRegion state
   ↓
6. RegionColumns re-render with new data
```

---

## 🐛 Bugs Fixed

### The "Curated Parallels" Pivot
Replaced dynamic API search with hardcoded verified Object IDs to solve:
- The "Hermann" Problem (wrong artifacts)
- The "Teabowl" Incident (wrong categories)
- Missing/restricted images

### The "Clipped Tag" Bug
Region tags were being cut off due to `overflow: hidden` on parent.

**Solution:** Nested image in inner wrapper with `overflow-hidden`, tag positioned outside.

### The "Headless Mannequin" Bug
Images cropping heads/hilts improperly.

**Solution:** `object-fit: cover` + `object-position: top center`

---

## 📱 Mobile Responsiveness

- Sidebar "ARTIFACTS" label hidden on mobile (`hidden md:flex`)
- Grid stacks vertically with `gap-8` for breathing room
- Touch-friendly topic buttons
- Full-width era dropdown

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: Dashboard Desktop View](../images/placeholder-dashboard-desktop.png)
![Placeholder: Dashboard Mobile View](../images/placeholder-dashboard-mobile.png)

---

## 🔗 Related Files

- `src/data/narratives.js` - Curated artifact IDs and narrative text
- `src/data/config.js` - Era and topic configuration
- `src/store/useDashboardStore.js` - Zustand state management
- `src/api/metApi.js` - Met Museum API helpers
