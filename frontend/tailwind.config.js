/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
      'wellness-blue': '#e0f2fe',
      'serene-green': '#f0fdf4',
      'brand-primary': '#0ea5e9', // Trustworthy blue
    }
    },
  },
  plugins: [],
}
