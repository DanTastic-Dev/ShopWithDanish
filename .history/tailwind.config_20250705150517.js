/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'primary': '#2563eb',        // Modern blue
        'secondary': '#60a5fa',      // Soft blue
        'accent': '#dbeafe',         // Light blue accent
        'light-bg': '#ffffff',       // Clean white
        'light-surface': '#f8fafc',  // Light gray surface
        'light-text': '#1e293b',     // Dark navy text
        'light-text-secondary': '#475569', // Medium gray text
        
        // Dark theme colors
        'primary-dark': '#3b82f6',   // Bright blue
        'secondary-dark': '#60a5fa', // Light blue
        'accent-dark': '#1e40af',    // Dark blue accent
        'dark-bg': '#0f172a',        // Rich dark
        'dark-surface': '#1e293b',   // Dark gray surface
        'dark-text': '#f1f5f9',      // Light gray text
        'dark-text-secondary': '#cbd5e1', // Medium light gray text
        
        // Semantic colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
        
        // Border colors
        'border-light': '#e2e8f0',
        'border-dark': '#334155',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-dark': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};