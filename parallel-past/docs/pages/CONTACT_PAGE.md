# Contact Page

> **File:** `src/pages/ContactPage.jsx`  
> **Route:** `/contact`  
> **Last Updated:** December 2024

---

## 📖 Overview

The Contact Page provides a form for users to submit suggestions, feedback, or inquiries. It follows the "Parallel Past" editorial design language with elegant typography and a warm, inviting aesthetic.

---

## 🎯 Core Features

### 1. Centered Card Layout
- Maximum width of 600px
- Warm cream background (#F9F8F4)
- Subtle shadow for depth
- Decorative corner borders

### 2. Elegant Form Design
- Underline-only input fields (no box borders)
- Serif font for input text
- Uppercase labels with letter-spacing

### 3. Outline Button
- Transparent background with dark border
- Solid dark red fill on hover
- Smooth transition animation

---

## 🧩 Component Structure

```
ContactPage.jsx
├── Header
├── Main Content (centered)
│   └── Contact Card
│       ├── Decorative Corner Borders
│       ├── Header ("Get in Touch")
│       ├── Divider Line
│       ├── Subtext
│       └── Form
│           ├── Name Input
│           ├── Email Input
│           ├── Message Textarea
│           └── Submit Button
└── Footer
```

---

## 🎨 Design Specifications

### Card Container
```jsx
<div className="w-full max-w-[600px] bg-[#F9F8F4] shadow-xl p-8 sm:p-12 md:p-16">
```

### Input Fields
```jsx
<input className="w-full bg-transparent border-b border-gold/30 py-2 font-heading text-gold 
                  focus:outline-none focus:border-prussian transition-colors" />
```

### Submit Button
```jsx
<button className="px-8 py-3 border border-prussian text-prussian font-heading text-sm 
                   tracking-widest hover:bg-prussian hover:text-white transition-all 
                   duration-300 uppercase">
  Send Message
</button>
```

---

## 🎨 Color Usage

| Element | Color | Class |
|---------|-------|-------|
| Background | Sage (#ECF4F7) | `bg-sage` |
| Card | Warm Cream (#F9F8F4) | `bg-[#F9F8F4]` |
| Heading | Dark Red | `text-prussian` |
| Labels | Muted Charcoal | `text-gold/60` |
| Input Text | Charcoal | `text-gold` |
| Button Border | Dark Red | `border-prussian` |

---

## 📱 Responsive Behavior

| Breakpoint | Padding |
|------------|---------|
| Mobile | `p-8` |
| Small | `p-12` |
| Medium+ | `p-16` |

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: Contact Page](../images/placeholder-contact.png)

---

## 🔗 Related Files

- `src/components/general/Header.jsx`
- `src/components/general/Footer.jsx`
