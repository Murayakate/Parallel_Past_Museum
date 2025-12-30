# Landing Page (Home)

> **File:** `src/pages/LandingPage.jsx`  
> **Route:** `/`  
> **Last Updated:** December 2024

---

## 📖 Overview

The Landing Page serves as the cinematic entry point to Parallel Past. It establishes the dramatic tone of the application while introducing users to the core concept: exploring history across civilizations simultaneously.

---

## 🎨 Design Philosophy

### Chiaroscuro Aesthetic
The page follows a deliberate "light and dark" progression:

1. **Dark Opening** - The video hero and "History is Synchronous" sections use dark backgrounds for drama
2. **Bright Transition** - The "Explore, Compare, Curate" features section uses warm cream (#F9F8F4)
3. **Content Flow** - Subsequent sections alternate to maintain visual rhythm

---

## 🧩 Component Structure

```
LandingPage.jsx
├── Header (fixed, transparent overlay)
├── HeroSplit.jsx          # Interactive split-screen video
├── MissionStatement.jsx   # "HISTORY IS SYNCHRONOUS" parallax section
├── Mechanics.jsx          # Explore/Compare/Curate features
├── BentoGrid.jsx          # Current exhibition showcase
├── DataVisualizer.jsx     # Data visualization section
├── InfiniteMarquee.jsx    # Scrolling artifact ticker
└── Footer
```

---

## 📁 Key Components

### 1. HeroSplit (`src/components/home/HeroSplit.jsx`)

**Purpose:** Interactive split-screen video hero with mouse-controlled divide.

**Features:**
- Two looping videos (West/East) playing simultaneously
- Mouse position controls the split percentage (20%–80%)
- Resets to 50/50 on mouse leave
- "EXPLORE HISTORY SIDE BY SIDE" overlay text with `mix-blend-difference`

**Technical Notes:**
```jsx
// Video sources with fallbacks
<source src="/videos/west-loop.webm" type="video/webm" />
<source src={westLoopMp4} type="video/mp4" />
```

---

### 2. MissionStatement (`src/components/home/MissionStatement.jsx`)

**Purpose:** The dramatic "HISTORY IS SYNCHRONOUS" headline with parallax background.

**Features:**
- Parallax scrolling background image
- Animated gradient text using Framer Motion
- Responsive typography: `text-4xl md:text-7xl lg:text-8xl`

**Bug Fixes Applied:**
| Issue | Solution |
|-------|----------|
| Text overflowing on mobile | Reduced to `text-4xl` base size |
| Image squashed on mobile | Set `min-h-[60vh] md:min-h-[80vh]` |
| Pure black felt oppressive | Changed gradient to `from-gray-900` |

---

### 3. Mechanics (`src/components/home/Mechanics.jsx`)

**Purpose:** The "Explore, Compare, Curate" features explanation section.

**Features:**
- Three-column grid (stacks on mobile)
- Large background numbers (01, 02, 03)
- Staggered animation on scroll

**Design Evolution:**
| Before | After |
|--------|-------|
| `bg-zinc-950` (pitch black) | `bg-[#F9F8F4]` (warm cream) |
| `text-white` | `text-prussian` (titles), `text-gray-600` (body) |
| `gap-8` | `gap-16` on mobile for breathing room |

---

## 📱 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Single column, stacked sections, `text-4xl` headlines |
| Tablet (768px+) | Two-column where applicable |
| Desktop (1024px+) | Full three-column layout, `text-7xl` headlines |

---

## 🎬 Animations Used

- **Framer Motion** for scroll-triggered reveals
- **Parallax** effect on MissionStatement background
- **Gradient animation** on "SYNCHRONOUS" text
- **Scroll indicator** pulse at bottom of hero

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: Hero Section](../images/placeholder-landing-hero.png)
![Placeholder: Features Section](../images/placeholder-landing-features.png)

---

## 🔗 Related Files

- `src/assets/videos/west-loop.mp4` - Western civilization video
- `src/assets/videos/east-loop.mp4` - Eastern civilization video
- `src/assets/images/hero-image-1.webp` - Mission statement background
