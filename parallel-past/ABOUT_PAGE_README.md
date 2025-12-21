# About Page - Implementation Guide

## 🎨 Design Overview

The About page for Parallel Past features a **Modern 2025 Museum** aesthetic with:
- **Dark mode** slate/zinc palette with glassmorphism effects
- **Site colors maintained**: Burgundy (#910029), Dark Gray (#39404B), Light Blue-Gray (#ECF4F7)
- **Cutting-edge animations** using Framer Motion with spring physics
- **Fully responsive** mobile-first design

## 📁 Files Created

### 1. **AnimatedSection.jsx** (`src/components/`)
Reusable component for scroll-reveal animations:
- Fade-up and float-in effects
- Spring-based physics transitions
- Configurable delay and duration
- InView detection with margin offset

**Usage:**
```jsx
<AnimatedSection delay={0.2}>
  <YourContent />
</AnimatedSection>
```

### 2. **AnimatedText.jsx** (`src/components/`)
Word-by-word text reveal component:
- Staggered animation for each word
- Spring-based transitions
- Perfect for headlines and hero text

**Usage:**
```jsx
<AnimatedText text="Three Worlds. One Timeline." delay={0.2} />
```

### 3. **AboutPage.jsx** (`src/pages/`)
The main About page with 5 sections:

#### **Section 1: Hero**
- Large animated headline: "Three Worlds. One Timeline."
- Parallax background effects
- Animated scroll indicator
- Gradient overlays with site colors

#### **Section 2: The Mission**
- "History, Aligned." headline
- Two-column layout (text + interactive mockup)
- Glassmorphism card with mock timeline UI
- Hover effects on mock cards

#### **Section 3: Current Focus**
- "Beta Focus: Arms & Armor" headline
- Centered glassmorphism card
- Icon integration (Swords from Lucide)
- Met Museum API credit badge

#### **Section 4: Tech Stack (Bento Grid)**
- 4 cards in asymmetric grid layout
- React (large), Zustand (medium), Tailwind (medium), API Challenges (large)
- Magnetic hover effects with rotation
- Icon badges with gradient backgrounds

#### **Section 5: Closing CTA**
- "Ready to Explore?" call-to-action
- Link to dashboard
- Hover scale animation

## 🎭 Animation Features

### Scroll Reveals
- Elements fade up and float into view as you scroll
- Triggered 100px before entering viewport
- Spring physics (stiffness: 100, damping: 20)

### Text Animations
- Word-by-word stagger effect
- 0.08s delay between words
- Smooth spring transitions

### Hover States
- Cards scale and rotate slightly on hover
- Border color transitions
- Icon scale effects
- Button scale/tap animations

### Background Effects
- Parallax gradient animation (20s loop)
- Radial gradient overlays
- Glassmorphism with backdrop-blur

## 🎨 Color Usage

The page maintains your site's color scheme:

- **Burgundy (#910029)**: Primary accents, headings, gradients
- **Dark Gray (#39404B)**: Secondary accents (gold variable)
- **Light Blue-Gray (#ECF4F7)**: Text, borders (sage variable)
- **Slate tones**: Background layers (950, 900, 800)

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts collapse on small screens
- Text sizes scale (7xl → 9xl on desktop)
- Padding/spacing adjusts per breakpoint

## 🔧 Customization

### Adjust Animation Speed
In `AnimatedSection.jsx`:
```jsx
duration={0.8}  // Change to 0.5 for faster, 1.2 for slower
```

### Change Hover Effects
In `AboutPage.jsx`, modify whileHover props:
```jsx
whileHover={{ scale: 1.05 }}  // Increase/decrease scale
```

### Modify Colors
All colors use Tailwind classes referencing your theme:
- `text-prussian` → Burgundy
- `text-gold` → Dark Gray
- `text-sage` → Light Blue-Gray

## 🚀 Next Steps

1. **Test the page**: Navigate to `/about` in your browser
2. **Adjust animations**: Tweak delays/durations to your preference
3. **Add content**: Replace placeholder text with your actual copy
4. **Extend AnimatedSection**: Use it on other pages for consistency

## 💡 Reusability

The `AnimatedSection` component can be used throughout your site:

```jsx
// On any page
import AnimatedSection from '../components/AnimatedSection';

<AnimatedSection delay={0.3}>
  <div className="your-content">
    Content will animate in on scroll
  </div>
</AnimatedSection>
```

## 🎯 Performance Notes

- Animations use GPU-accelerated transforms
- InView detection prevents off-screen animations
- Spring physics are optimized by Framer Motion
- Glassmorphism uses backdrop-blur (modern browsers only)

---

**Built with**: React, Framer Motion, Tailwind CSS, Lucide Icons
**Optimized for**: Modern browsers (Chrome, Firefox, Safari, Edge)
