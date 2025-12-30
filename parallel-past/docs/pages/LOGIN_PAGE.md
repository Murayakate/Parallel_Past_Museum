# Login Page

> **File:** `src/pages/LoginPage.jsx`  
> **Route:** `/login`  
> **Last Updated:** December 2024

---

## 📖 Overview

The Login Page currently serves as a "Coming Soon" placeholder. It maintains the Parallel Past brand identity while indicating that user authentication features are planned for future development.

---

## 🎯 Current State

### Coming Soon Display
- Full dark background using the brand's `prussian` color
- Large centered "COMING SOON" headline
- Subtle divider line
- Explanatory subtext

---

## 🧩 Component Structure

```
LoginPage.jsx
├── Header
├── Main Content (flex centered)
│   └── Coming Soon Card
│       ├── "Coming Soon" Headline
│       ├── Decorative Divider
│       └── Explanatory Subtext
└── Footer
```

---

## 🎨 Design Specifications

### Background
```jsx
<div className="min-h-screen bg-prussian flex flex-col">
```

### Typography
```jsx
<h1 className="font-heading text-4xl sm:text-6xl text-white mb-6 tracking-widest uppercase">
  Coming Soon
</h1>
```

### Divider
```jsx
<div className="w-24 h-1 bg-gold/50 mx-auto mb-6"></div>
```

---

## 🚀 Planned Features

When authentication is implemented, this page will include:

- [ ] **Email/Password Login** - Traditional authentication
- [ ] **Social Login** - Google, GitHub, etc.
- [ ] **Sign Up Flow** - New user registration
- [ ] **Password Recovery** - Forgot password flow
- [ ] **Cloud Sync** - Sync saved collections across devices

---

## 📱 Responsive Behavior

- Headline scales from `text-4xl` (mobile) to `text-6xl` (desktop)
- Content remains centered on all screen sizes
- Full viewport height maintained

---

## 📸 Screenshots

<!-- TODO: Add screenshots -->
![Placeholder: Login Coming Soon](../images/placeholder-login.png)

---

## 🔗 Related Files

- `src/components/general/Header.jsx`
- `src/components/general/Footer.jsx`
- `src/store/useDashboardStore.js` - Currently handles local-only collection storage
