# Parallel Past Documentation

Welcome to the Parallel Past documentation! This folder contains detailed technical documentation for each page and component of the application.

---

## 📚 Table of Contents

### Page Documentation

| Page | Route | Description |
|------|-------|-------------|
| [Landing Page](pages/LANDING_PAGE.md) | `/` | Cinematic entry with video hero and features |
| [Dashboard Page](pages/DASHBOARD_PAGE.md) | `/dashboard` | Main artifact comparison view |
| [About Page](pages/ABOUT_PAGE.md) | `/about` | Project mission and methodology |
| [Collections Page](pages/COLLECTIONS_PAGE.md) | `/collections` | Browse and search artifacts |
| [Contact Page](pages/CONTACT_PAGE.md) | `/contact` | User feedback form |
| [Login Page](pages/LOGIN_PAGE.md) | `/login` | Coming Soon placeholder |

### Other Resources

| Resource | Description |
|----------|-------------|
| [Images README](images/README.md) | Screenshot requirements and specifications |
| [Main README](../README.md) | Project overview and development journey |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                             │
│                    (React Router DOM)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Landing    │ │  Dashboard  │ │   About     │  ...      │
│  │    Page     │ │    Page     │ │    Page     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│         │              │                                    │
│         │              │                                    │
│  ┌──────┴──────┐ ┌─────┴─────┐                             │
│  │   Home      │ │ Dashboard │                              │
│  │ Components  │ │Components │                              │
│  │             │ │           │                              │
│  │ HeroSplit   │ │ArtifactCard│                            │
│  │ Mission     │ │RegionColumn│                            │
│  │ Mechanics   │ │           │                              │
│  └─────────────┘ └───────────┘                             │
│                        │                                    │
│                        │                                    │
│              ┌─────────┴─────────┐                         │
│              │  Zustand Store    │                          │
│              │ useDashboardStore │                          │
│              └─────────┬─────────┘                         │
│                        │                                    │
│              ┌─────────┴─────────┐                         │
│              │   Data Layer      │                          │
│              │ narratives.js     │                          │
│              │ config.js         │                          │
│              │ metApi.js         │                          │
│              └───────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System Quick Reference

### Colors
| Name | Hex | Tailwind |
|------|-----|----------|
| Prussian (Dark Red) | `#910029` | `text-prussian`, `bg-prussian` |
| Gold (Charcoal) | `#39404B` | `text-gold`, `bg-gold` |
| Sage (Light) | `#ECF4F7` | `bg-sage` |
| Warm Cream | `#F9F8F4` | `bg-[#F9F8F4]` |

### Typography
| Use | Font | Tailwind |
|-----|------|----------|
| Headings | Merriweather | `font-heading` |
| Body | Roboto | `font-body` |
| Editorial | System Serif | `font-serif` |

---

## 🔄 Data Flow

```
User Action (select era/topic)
       │
       ▼
┌──────────────────┐
│ useDashboardStore│
│  setSelectedEra  │
│  setSelectedTopic│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  fetchArtifacts  │
│ (reads NARRATIVES)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Met Museum API  │
│ fetchObjectDetails│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update State    │
│ artifactsByRegion│
│ narrativeInsights│
└────────┬─────────┘
         │
         ▼
    UI Re-renders
```

---

## 📝 Contributing

When adding new features or pages:

1. Create the page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Create documentation in `docs/pages/`
4. Update this index file
5. Add any required screenshots to `docs/images/`
