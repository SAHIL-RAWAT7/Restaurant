/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF6B6B',
          dark: '#FF8E8E'
        },
        secondary: {
          light: '#4ECDC4',
          dark: '#6CE5DC'
        },
        // Add other color variations as needed
      },
    },
  },
  plugins: [],
}