# Parallel Past Museum 🧭

A React-based web application that allows users to explore and compare historical artifacts from three major regions—**Europe**, **Asia**, and the **Middle East**—across different historical eras. The app integrates with **The Metropolitan Museum of Art Collection API** to display real artifacts with images and metadata.

> *"History doesn't happen in isolation. See what warriors across Europe, Asia, and the Middle East were wearing at the exact same moment in time."*



## 🎯 Project Overview

**Parallel Past Museum** is an interactive historical comparison tool that visualizes how different cultures expressed similar themes—warfare, fashion, daily life—during the same time periods. Users can select from historical eras and topics, then view curated artifacts side-by-side in a tri-region dashboard with editorial narrative insights.

artifacts are intentionally curated using selected met object ids to ensure historical accuracy, availability of images,and meaningful comparison across regions and eras.raw api search results were too inconsistent and yielded too many irrelevant results for comparative analysis.


### Key Features Implemented
- ✅ **Landing Page** with cinematic video hero, parallax effects, and chiaroscuro design
- ✅ **Dashboard Page** with tri-region artifact grid (Europe, Asia, Middle East)
- ✅ **Era Selector** dropdown to switch between historical periods:
  - 🏛️ Renaissance (1400–1600)
  - 👑 Age of Empires (1750–1900)
- ✅ **Topic Selector** to explore themes: Warfare, Fashion, Daily Life
- ✅ **Editorial Insights** with dynamic narrative injection and drop-cap typography
- ✅ **Metropolitan Museum API Integration** with CORS proxy
- ✅ **Curated Artifact System** using verified object IDs (solving the search chaos)
- ✅ **"My Collection" Feature** - Save/favorite artifacts with localStorage persistence
- ✅ **Collection Drawer** - Slide-over panel showing saved artifacts
- ✅ **Responsive Design** with mobile-first approach
- ✅ **State Management** with Zustand
- ✅ **Routing** with React Router DOM

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** TailwindCSS 3.4.17
- **State Management:** Zustand 5.0.9
- **Routing:** React Router DOM 7.9.6
- **Icons:** Lucide React 0.555.0
- **API:** Metropolitan Museum of Art Collection API

---

## 📂 Project Structure

```
parallel-past/
├── docs/                          # Documentation folder
│   ├── pages/                     # Page-specific READMEs
│   └── images/                    # Screenshot placeholders
├── src/
│   ├── api/
│   │   └── metApi.js              # Met Museum API helper functions
│   ├── assets/
│   │   ├── images/                # Static images (hero, armor photos)
│   │   └── videos/                # Background videos (west-loop, east-loop)
│   ├── components/
│   │   ├── general/               # Shared components
│   │   │   ├── Header.jsx         # Global navigation header with My Collection
│   │   │   ├── Footer.jsx         # Global footer
│   │   │   └── CollectionDrawer.jsx # Slide-over panel for saved artifacts
│   │   ├── fordashboard/          # Dashboard-specific components
│   │   │   ├── ArtifactCard.jsx   # Editorial artifact card with save button
│   │   │   ├── RegionColumn.jsx   # Column for each region
│   │   │   └── TimelineSlider.jsx # (Future feature placeholder)
│   │   ├── home/                  # Landing page components
│   │   │   ├── HeroSplit.jsx      # Interactive split-screen video hero
│   │   │   ├── MissionStatement.jsx # "History is Synchronous" section
│   │   │   ├── Mechanics.jsx      # Explore/Compare/Curate features
│   │   │   ├── BentoGrid.jsx      # Current exhibition grid
│   │   │   ├── DataVisualizer.jsx # Data visualization section
│   │   │   └── InfiniteMarquee.jsx # Scrolling artifact marquee
│   │   └── collections/           # Collections page components
│   │       └── SynthesisPanel.jsx # Artifact synthesis panel
│   ├── data/
│   │   ├── narratives.js          # Curated artifact IDs and narrative insights
│   │   ├── config.js              # Era and topic configuration
│   │   └── armory.json            # Local artifact data for Collections
│   ├── pages/
│   │   ├── LandingPage.jsx        # Home page (cinematic entry)
│   │   ├── DashboardPage.jsx      # Main artifact comparison dashboard
│   │   ├── AboutPage.jsx          # About the project
│   │   ├── CollectionsPage.jsx    # Browse & search artifacts
│   │   ├── ContactPage.jsx        # Contact form
│   │   └── LoginPage.jsx          # Coming Soon placeholder
│   ├── store/
│   │   └── useDashboardStore.js   # Zustand store (artifacts, narratives, saved items)
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── vite.config.js                 # Vite config with API proxy
├── tailwind.config.js             # Custom "Museum Theme" palette
└── package.json
```

---

## 🎨 Design System

### Color Palette (Museum Theme)
| Name | Hex | Usage |
|------|-----|-------|
| **Prussian** | `#910029` | Primary brand color (Dark Red/Burgundy) - Headers, titles, accents |
| **Gold** | `#39404B` | Secondary color (Dark Charcoal) - Text, borders |
| **Sage** | `#ECF4F7` | Primary background (Light Blue-Gray) |
| **Sage Dark** | `#D9E7EC` | Secondary background |
| **Warm Cream** | `#F9F8F4` | Card backgrounds, editorial sections |

### Typography
- **Headings:** Merriweather (serif) - `font-heading`
- **Body:** Roboto (sans-serif) - `font-body`
- **Editorial:** Native serif for drop caps and narrative text

### Design Philosophy: Chiaroscuro
The app follows a "light & dark" aesthetic:
1. **Hero sections** use dark backgrounds (`bg-prussian`, gradients) for drama
2. **Content sections** use warm cream (`#F9F8F4`) for readability
3. **Cards** feature subtle shadows and no heavy borders

---

## 🚀 What's Been Done So Far

### 1. **API Integration**
- ✅ Created `metApi.js` with helper functions:
  - `searchArmsAndArmor()` - Search for artifacts by query, region, and date range
  - `fetchObjectDetails()` - Fetch full artifact metadata by object ID
- ✅ Configured Vite proxy (`/api/met`) to bypass CORS restrictions
- ✅ Implemented error handling and fallback data

### 2. **Curated Artifact System**
- ✅ Built a "Greatest Hits Collection" with verified object IDs
- ✅ Each era has pre-selected artifacts that are guaranteed to have images
- ✅ Implemented artifact validation filters to block non-armor items (books, manuscripts, etc.)
- ✅ Added fallback system for when API calls fail

### 3. **Dashboard Implementation**
- ✅ Created tri-region grid layout (Europe, Asia, Middle East)
- ✅ Integrated era selector dropdown
- ✅ Connected Zustand store to manage state
- ✅ Implemented artifact cards with:
  - High-quality images from Met Museum
  - Title, culture/region, and material description
  - Direct links to Met Museum object pages

### 4. **Landing Page**
- ✅ Hero section with call-to-action button
- ✅ Region cards for visual introduction
- ✅ Responsive layout

### 5. **Routing & Navigation**
- ✅ Set up React Router with routes:
  - `/` - Landing page
  - `/dashboard` - Main dashboard
  - `/about`, `/collections`, `/contact`, `/login` - Placeholder routes

---

## 📖 The Development Journey

This section documents the key challenges, pivots, and solutions that shaped the Parallel Past application. It serves as both a technical record and a learning resource.

---

### 🔄 Phase 1: The Architecture Pivot — From Dynamic Search to Curation
*December 2024*

#### The Original Vision
The initial concept was a dynamic search engine that would query the Met Museum API in real-time (e.g., fetch "Warfare" + "Asia" + "1600") to generate comparisons on the fly.

#### The Challenge: "The Console of Red Warnings"
Our initial implementation revealed the chaos of raw museum data. The console was full of red errors, and the results were historically incoherent:

| Bug Name | Description | Example |
|----------|-------------|---------|
| **The "Hermann" Problem** | Searching for "Warfare" in Europe displayed a merchant portrait simply because his description mentioned a war. | Hermann von Wedigh III appeared instead of actual armor. |
| **The "Stirrups & Fragments" Bug** | Searching for "Guns" in the Age of Empires returned unrelated items. | "Fragments of a Right Shoulder Defense" (Europe) and "Pair of Stirrups" (Asia) instead of actual firearms. |
| **The "Teabowl" Incident** | A query for Asian Fashion returned ceramics instead of garments. | A ceramic teabowl appeared due to loose metadata tagging. |

<!-- TODO: Add screenshot of early prototype showing the disconnect in search results -->
![Placeholder: Early Prototype Search Results](docs/images/placeholder-search-chaos.png)

#### The Solution: The "Curated Parallels" Engine
We pivoted to a deterministic, curated architecture:

1. **Hardcoded ID Map**: Replaced dynamic fetching with a `NARRATIVES` constant in `src/data/narratives.js`, mapping verified Object IDs to each era/topic combination.

2. **The "Whack-a-Mole" ID Hunt**: We faced a secondary challenge where promising items returned 404 errors or had "Restricted" image rights:
   - *Iteration 1*: The European gun was a shoulder fragment. → Fixed with **French Flintlock Pistols (ID 25170)**.
   - *Iteration 2*: The Asian gun had no image. → Fixed by finding the signed **"Kunitomo" masterpiece (ID 22491)**.
   - *Iteration 3*: The Renaissance Middle East weapon was missing. → Fixed with the **Yatagan of Süleyman (ID 24953)**.

```javascript
// src/data/narratives.js - The Curated Parallels Engine
'empires-warfare': {
  title: "The Industrial Sword",
  objectIds: {
    'Europe': 25170,  // Pair of French Flintlock Pistols
    'Asia': 22491,    // Matchlock Gun by Kunitomo
    'Middle East': 32268 // Pair of Miquelet Pistols
  }
}
```

---

### 🎨 Phase 2: The UX Evolution — From "Database" to "Editorial"
*December 2024*

#### The Goal
To move away from a "Search Result" aesthetic and create a "Digital Museum" experience.

#### The Challenge: Visual Dissonance & CSS Bugs

| Bug Name | Description | Solution |
|----------|-------------|----------|
| **The "Red Border" Era** | The initial UI used heavy `border-4` and stark white backgrounds, resembling a database admin panel. | Switched to warm cream `#F9F8F4` backgrounds with subtle shadows. |
| **The "Headless Mannequin" Bug** | Standard CSS `object-fit` settings were cropping the heads off portraits and hilts off swords. | Implemented `object-fit: cover` with `object-position: top center`. |
| **The "Floating Text" Issue** | Typography had too much `line-height` and spacing, causing titles to float away from descriptions. | Tightened typography with `leading-snug` and reduced margins. |
| **The "Clipped Tag" Bug** | When we added region tags (e.g., "EUROPE"), they were cut off because the parent had `overflow: hidden`. | Restructured the image container: nested inner wrapper for zoom, tag positioned outside. |

<!-- TODO: Add screenshot of the transition to the "Editorial" Grid Layout -->
![Placeholder: Editorial Grid Layout Transition](docs/images/placeholder-editorial-transition.png)

#### The Solution: The Magazine Aesthetic

```jsx
// ArtifactCard.jsx - The Editorial Structure
<div className="relative w-full aspect-[4/5] bg-gray-200">
  {/* Inner wrapper with overflow-hidden for zoom effect */}
  <div className="w-full h-full overflow-hidden">
    <img className="object-cover object-top" ... />
  </div>
  
  {/* Tag positioned OUTSIDE overflow container */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
    <span className="bg-white px-3 py-1 border ...">{region}</span>
  </div>
</div>
```

---

### 📝 Phase 3: The Content Challenge — Making History Speak
*December 2024*

#### The Goal
To explain *why* these items were parallel, not just show them.

#### The Challenge: Generic vs. Specific
Once we had the correct images (e.g., the Diana and the Stag automaton), our text was still generic: *"Here is an object from Europe."* This created a disconnect between the specific visual treasure and the vague description.

#### The Solution: Dynamic Narrative Injection
We rewrote the "Insights" component to be context-aware:

1. The app checks the active **Era** and **Topic**.
2. It injects a **specific narrative** for that combination.
3. Added **Drop Cap** styling for a storybook feel.

```jsx
// DashboardPage.jsx - Editorial Insights with Drop Cap
<p className="first-letter:float-left first-letter:text-7xl first-letter:font-serif first-letter:text-prussian first-letter:mr-3">
  {narrativeInsights}
</p>
```

**Example Narrative:**
> *"The German Man and Horse Armor represents the peak of European plate defense—heavy, encasing, and rigid. In contrast, the Tibetan leather helmet and Ottoman Yatagan show a preference for mobility and speed. It is a clash of philosophies: the Fortress vs. the Wind."*

This transformed the app from a "Gallery" into a "Guided Tour."

---

### 📱 Phase 4: Platform Polish — Mobile & The "Black Void"
*December 2024*

#### The Challenge: Responsiveness & Lighting

| Issue | Description | Solution |
|-------|-------------|----------|
| **The "Black Void"** | The Landing Page was initially pitch black. While dramatic, it felt oppressive. | Implemented **Chiaroscuro Design**: Dark hero fades into warm cream features section. |
| **The "Squashed Grid"** | The 3-column "Trigrid" was unreadable on mobile, squashing text into thin strips. | **Responsive Logic**: `grid-cols-1` (mobile) → `grid-cols-3` (desktop). |
| **Broken Typography** | The headline "HISTORY IS SYNCHRONOUS" was overflowing on phones. | **Fluid Type**: `text-4xl md:text-7xl` for mathematical scaling. |

<!-- TODO: Add screenshot showing the Final Polish with Tags, Favorites, and Narrative Engine -->
![Placeholder: Final Polish Screenshot](docs/images/placeholder-final-polish.png)

#### The Solution: Chiaroscuro & Vertical Flow

```jsx
// MissionStatement.jsx - Responsive Hero
<section className="min-h-[60vh] md:min-h-[80vh] ...">
  <h2 className="text-4xl md:text-7xl lg:text-8xl ...">
    HISTORY IS SYNCHRONOUS
  </h2>
</section>

// Mechanics.jsx - Warm Cream Features
<section className="bg-[#F9F8F4] ...">
  <h3 className="text-prussian ...">EXPLORE</h3>
</section>
```

---

### 🔧 Phase 5: Technical Challenges & Solutions

#### CORS Issues with Met Museum API
**Problem:** Direct API calls from the browser were blocked by CORS policy.

**Solution:** Configured Vite development server proxy:
```javascript
// vite.config.js
server: {
  proxy: {
    '/api/met': {
      target: 'https://collectionapi.metmuseum.org',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/met/, ''),
    },
  },
}
```

#### State Management Complexity
**Problem:** Managing artifacts for 3 regions × 3 topics × 2 eras = 18 data points.

**Solution:** Zustand store with structured state:
```javascript
// useDashboardStore.js
artifactsByRegion: {
  Europe: { armor: null },
  Asia: { armor: null },
  'Middle East': { armor: null }
}
```

#### Null/Undefined Artifact Crashes
**Problem:** API failures caused crashes when accessing properties of `null`.

**Solution:** 
- Added null checks in `RegionColumn.jsx`
- Display "Data Unavailable" placeholder
- Implemented optional chaining (`?.`) throughout

---

## � Future Roadmap

### Phase 1: Enhanced Interactivity
- [ ] **Deep Dive Modals** - Clicking an artifact opens a modal with deep-zoom capabilities and full metadata
- [ ] **Timeline Slider** - Replace discrete era buttons with a continuous 1500–1900 slider for fluid exploration
- [ ] **Loading Skeletons** - Better visual feedback during API calls with skeleton screens

### Phase 2: Advanced Visualization
- [ ] **3D Viewer** - Utilize Met photogrammetry data for 360-degree artifact rotation
- [ ] **Comparison Mode** - Side-by-side zoom comparison of two selected artifacts
- [ ] **AR Preview** - Mobile AR feature to "place" artifacts in real-world environments

### Phase 3: Platform Expansion
- [ ] **User Authentication** - Login system with Firebase/Auth0 for cloud-synced collections
- [ ] **Social Sharing** - Share curated collections with custom URLs
- [ ] **Guided Tours** - Pre-built narrative journeys through specific themes

### Technical Improvements
- [ ] **TypeScript Migration** - Add type safety to prevent runtime errors
- [ ] **Unit & E2E Tests** - Comprehensive test coverage with Vitest and Playwright
- [ ] **Performance Optimization** - Lazy loading, image optimization, code splitting
- [ ] **Accessibility Audit** - ARIA labels, keyboard navigation, screen reader support
- [ ] **PWA Support** - Offline capability and installable app

### Completed ✅
- [x] **Curated Artifact System** - Verified object IDs replace chaotic dynamic search
- [x] **Editorial Design** - Magazine-style cards with proper image handling
- [x] **Narrative Engine** - Context-aware insights for each era/topic
- [x] **My Collection Feature** - Save artifacts with localStorage persistence
- [x] **Mobile Responsiveness** - Responsive grid and typography
- [x] **Chiaroscuro Landing** - Light/dark aesthetic balance

---

## 🧪 Testing

A standalone API testing file (`test-api.html`) is included to verify Met Museum API connectivity without running the full React app. Open it directly in a browser to test API endpoints.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app runs on `http://localhost:5173` by default. The Vite proxy handles API requests to avoid CORS issues.

---

## 📝 Notes

- **API Limitations:** The Met Museum API is free but has rate limits. The curated approach minimizes API calls.
- **Image Quality:** Some artifacts have low-resolution images; this is a limitation of the source data.
- **Historical Accuracy:** Artifact dates and classifications come directly from the Met Museum and may not always align perfectly with the selected era.

---

## 📄 License

This project is for educational purposes and uses public domain artifacts from The Metropolitan Museum of Art.

---

## 🙏 Acknowledgments

- **The Metropolitan Museum of Art** for providing free access to their collection API
- **React, Vite, TailwindCSS** communities for excellent documentation
