/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '640px',
      // => @media (min-width: 640px) { ... }
      // Small devices like phones (e.g., iPhone X)
    
      'tablet': '768px',
      // => @media (min-width: 768px) { ... }
      // Medium devices like tablets (e.g., iPad Mini, Galaxy Tab)
    
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      // Large devices like laptops (e.g., MacBook Air, Dell XPS 13)
    
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      // Extra-large devices like desktops (e.g., 1080p monitors)
    
      'wide-screen': '1536px',
      // => @media (min-width: 1536px) { ... }
      // Ultra-wide or high-resolution screens (e.g., 4K monitors)
    },
    extend: {
      colors: {
        primary: {
          50: '#F2F2F2', // Lightest
          100: '#E8E8EA', // Slightly darker
          200: '#E2E2E6',
          300: '#D4D4D8',
          400: '#8A8A9C', // Vibrant mid-range
          500: '#6F6F78', // Slightly more vivid
          600: '#52525B',
          700: '#3F3F46',
          800: '#26262A', // More contrast with 700
          900: '#18181B',
          950: '#0F0F12',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'infinite-scroll-v': 'infinite-scroll-vertical 5s linear infinite',
        'infinite-scroll-h': 'infinite-scroll-horizontal 30s linear infinite',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'around': 'around 5s linear infinite',
        'letter-spacing-compress': 'letter-spacing-compress 0.5s linear',
      },
      keyframes: {
        'infinite-scroll-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(10%)' },
        },
        'infinite-scroll-horizontal': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        around: {
          '0%': { left: '0', top: '0' }, // Top-left
          '25%': { left: '98%', top: '0' }, // Top-right
          '50%': { left: '98%', top: '95%' }, // Bottom-right
          '75%': { left: '0', top: '95%' }, // Bottom-left
          '100%': { left: '0', top: '0' }, // Back to Top-left
        },
        'letter-spacing-compress': {
          from: { letterSpacing: '500px' },
          to: { letterSpacing: '0em' },
        },
      },
      boxShadow: {
        'solid' : '0px 5px 0px 0px #3F3F46'
      }
    },
  },
  plugins: [],
}