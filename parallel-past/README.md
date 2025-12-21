# Parallel Past Museum 🧭

A React-based web application that allows users to explore and compare historical artifacts (armor and weapons) from three major regions—**Europe**, **Asia**, and the **Middle East**—across different historical eras. The app integrates with **The Metropolitan Museum of Art Collection API** to display real artifacts with images and metadata.

---

## 🎯 Project Overview

**Parallel Past Museum** is an interactive historical comparison tool that visualizes how different cultures developed military technology during the same time periods. Users can select from three historical eras and view curated artifacts side-by-side in a tri-region dashboard.

### Key Features Implemented
- ✅ **Landing Page** with hero section and region cards
- ✅ **Dashboard Page** with tri-region artifact grid (Europe, Asia, Middle East)
- ✅ **Era Selector** dropdown to switch between historical periods:
  - ⚔️ The Crusades (1000–1300)
  - 🏆 The Golden Age (1400–1600)
  - 🔫 Gunpowder Empires (1600–1800)
- ✅ **Metropolitan Museum API Integration** with CORS proxy
- ✅ **Curated Artifact System** using verified object IDs
- ✅ **Responsive Design** with TailwindCSS
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
├── src/
│   ├── api/
│   │   └── metApi.js              # Met Museum API helper functions
│   ├── components/
│   │   ├── Header.jsx             # Global navigation header
│   │   ├── Footer.jsx             # Global footer
│   │   ├── fordashboard/
│   │   │   ├── ArtifactCard.jsx   # Individual artifact display card
│   │   │   ├── RegionColumn.jsx   # Column for each region
│   │   │   └── TimelineSlider.jsx # (Placeholder for future feature)
│   │   └── forlanding/
│   │       ├── Hero.jsx           # Landing page hero section
│   │       └── RegionCards.jsx    # Region selection cards
│   ├── pages/
│   │   ├── LandingPage.jsx        # Home page
│   │   └── DashboardPage.jsx      # Main artifact comparison dashboard
│   ├── store/
│   │   └── useDashboardStore.js   # Zustand store for dashboard state
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── vite.config.js                 # Vite config with API proxy
├── tailwind.config.js             # Custom color palette and fonts
├── test-api.html                  # Standalone API testing file
└── package.json
```

---

## 🎨 Design System

### Color Palette
- **Sage** (`#BCD4CC`) - Primary background
- **Prussian Blue** (`#002F45`) - Text and borders
- **Gold** (`#E3A500`) - Accent and CTAs

### Typography
- **Headings:** Merriweather (serif)
- **Body:** Roboto (sans-serif)

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

## 🐛 Challenges Encountered

### 1. **CORS Issues with Met Museum API**
**Problem:** Direct API calls from the browser were blocked by CORS policy.

**Solution:** Configured Vite development server proxy to route requests through `/api/met` and rewrite them to the actual API endpoint.

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

### 2. **Inconsistent API Data Quality**
**Problem:** Many artifacts returned by search queries had:
- Missing images (`primaryImageSmall` was empty)
- Incorrect classifications (books, manuscripts labeled as armor)
- 404 errors for certain object IDs

**Solution:** 
- Switched from dynamic search to **curated artifact IDs** (verified "Greatest Hits")
- Implemented `isValidArtifact()` filter to block non-armor items
- Added banned ID list for known problematic objects
- Created fallback data structure for graceful degradation

### 3. **State Management Complexity**
**Problem:** Managing artifacts for 3 regions × 2 types × 3 eras = 18 data points became complex.

**Solution:** 
- Used Zustand for centralized state management
- Structured data as nested objects: `artifactsByRegion[region][type]`
- Implemented `fetchArtifactsForEra()` to batch-fetch all artifacts in parallel

### 4. **Rate Limiting & API Performance**
**Problem:** Met Museum API has rate limits, and fetching too many objects too quickly caused failures.

**Solution:** 
- Reduced to curated IDs only (no random searches)
- Used `Promise.all()` for parallel fetching (faster than sequential)
- Added delay helper function for future use if needed

### 5. **Null/Undefined Artifact Crashes**
**Problem:** When API calls failed, `RegionColumn` tried to access properties of `null`, causing crashes.

**Solution:** 
- Added null checks in `RegionColumn.jsx`
- Display "Data Unavailable" placeholder when artifacts are missing
- Implemented optional chaining (`?.`) throughout components

---

## 📋 Next Steps & To-Do List

### High Priority
- [ ] **Add Weapons Row** - Currently only showing armor; need to display weapons in a second row
- [ ] **Implement Timeline Slider** - Replace dropdown with interactive timeline component
- [ ] **Add Loading States** - Better visual feedback during API calls (skeleton screens, spinners)
- [ ] **Error Boundaries** - Catch and display errors gracefully without crashing the app

### Medium Priority
- [ ] **Expand Artifact Database** - Add more curated IDs for each era/region
- [ ] **Detail Modal/Page** - Click on artifact to see full details, larger images, and more metadata
- [ ] **Search Functionality** - Allow users to search for specific artifacts
- [ ] **Favorites System** - Let users save artifacts to a personal collection
- [ ] **About Page** - Explain the project's purpose and historical context
- [ ] **Collections Page** - Browse artifacts by category (helmets, swords, shields, etc.)

### Low Priority
- [ ] **User Authentication** - Login system for saving favorites
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Accessibility Improvements** - ARIA labels, keyboard navigation, screen reader support
- [ ] **Performance Optimization** - Lazy loading, image optimization, code splitting
- [ ] **Unit Tests** - Add tests for API functions and components
- [ ] **Deployment** - Deploy to Netlify/Vercel with production build

### Technical Debt
- [ ] **Clean Up Legacy Code** - Remove unused `_legacyFetchArtifactsForYear()` function
- [ ] **Refactor Store** - Simplify state structure and reduce complexity
- [ ] **TypeScript Migration** - Add type safety to prevent runtime errors
- [ ] **Environment Variables** - Move API base URL to `.env` file
- [ ] **Better Error Messages** - More descriptive error handling for users

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
