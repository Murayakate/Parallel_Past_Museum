# About Page

> **File:** `src/pages/AboutPage.jsx`  
> **Route:** `/about`  
> **Last Updated:** December 2024

---

## 📖 Overview

The About Page explains the mission and methodology of Parallel Past. It features a cinematic full-bleed hero image with the tagline "Three Worlds. One Timeline." followed by detailed sections about the project's purpose.

---

## 🎯 Core Features

### 1. Full-Bleed Hero Section
- Full viewport height (`h-screen`)
- Background image with gradient overlay
- Large serif typography headline
- No background boxes on text (clean overlay style)

### 2. Regional Showcase
Three-column layout featuring armor from each civilization:
- Europe (Medieval plate armor)
- Asia (Samurai armor)
- Middle East (Ottoman armor)

### 3. Mission & Methodology
Detailed explanation of:
- Why parallel history matters
- How artifacts are curated
- The Met Museum API integration

---

## 🧩 Component Structure

```
AboutPage.jsx
├── Header
├── Hero Section (full-bleed image)
│   ├── "Three Worlds. One Timeline." headline
│   └── Introductory subtext
├── Regional Armor Showcase (3 columns)
│   ├── Europe Armor Card
│   ├── Asia Armor Card
│   └── Middle East Armor Card
├── Mission Statement Section
├── Methodology Section
└── Footer
```

---

## 🎨 Design Elements

### Hero Image
- Full-bleed background using `bg-cover bg-center`
- Gradient overlay: `from-transparent via-transparent to-black/60`
- Text positioned in "lower third" for cinematic feel

### Typography
- Headline: `text-6xl md:text-8xl lg:text-9xl font-heading`
- Body: `text-xl md:text-2xl font-light`

### Armor Cards
Each regional card features:
- Armor photograph from `src/assets/images/`
- Region name and description
- Hover effects with Framer Motion

---

## 📱 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Single column, stacked cards |
| Tablet | Two-column armor layout |
| Desktop | Three-column side-by-side |

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: About Hero](../images/placeholder-about-hero.png)
![Placeholder: About Armor Grid](../images/placeholder-about-armor.png)

---

## 🔗 Related Files

- `src/assets/images/about-page.jpg` - Hero background
- `src/assets/images/europe-armor.jpg` - European armor photo
- `src/assets/images/asia-armor.jpg` - Asian armor photo
- `src/assets/images/middleeast-armor.jpg` - Middle Eastern armor photo
