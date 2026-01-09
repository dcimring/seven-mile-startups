/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cayman-deep': '#050b14',      // Almost black blue
        'cayman-ocean': '#0a192f',     // Rich deep blue
        'cayman-surface': '#112240',   // Lighter deep blue for cards
        'cayman-blue': '#0077be',      // Original brand blue (accent)
        'cayman-cyan': '#64ffda',      // High-tech accent
        'cayman-coral': '#ff7f50',     // Original coral
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}