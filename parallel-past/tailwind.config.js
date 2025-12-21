/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#ECF4F7',
        'sage-dark': '#D9E7EC',
        'sage-light': '#F5F9FA',
        prussian: '#910029',
        'prussian-light': '#B8003A',
        gold: '#39404B',
        'gold-hover': '#2A2F38',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}