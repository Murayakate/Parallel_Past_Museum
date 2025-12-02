/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#BCD4CC',
        'sage-dark': '#A3BCB4',
        prussian: '#002F45',
        'prussian-light': '#004A6E',
        gold: '#E3A500',
        'gold-hover': '#C79100',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}