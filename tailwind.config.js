/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Yellow/Black Theme)
        primary: '#facc15',        // Bright yellow (main accent)
        'primary-dark': '#eab308', // Deeper yellow for hover states

        // Light Mode Colors
        'light-bg': '#ffffff',
        'light-surface': '#f9f9f9',
        'light-text-primary': '#0a0a0a',
        'light-text-secondary': '#4b5563',
        'border-light': '#e5e7eb',

        // Dark Mode Colors
        'dark-bg': '#0a0a0a',          // Main background (black)
        'dark-surface': '#1a1a1a',     // Card/section surface
        'dark-text-primary': '#fefce8',
        'dark-text-secondary': '#d4d4d4',
        'border-dark': '#2a2a2a',

        // Semantic Colors
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
        info: '#3b82f6',
      },

      boxShadow: {
        soft: '0 2px 10px rgba(0, 0, 0, 0.1)',
        'soft-dark': '0 2px 10px rgba(255, 255, 255, 0.05)',
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
