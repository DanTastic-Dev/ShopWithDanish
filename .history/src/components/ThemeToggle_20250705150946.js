// components/ThemeToggle.js
'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTheme } from '@/components/ThemeProvider';

export default function ThemeToggle() {
  const { isDark, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="p-2 rounded-full border border-border-light dark:border-border-dark">
        <div className="w-5 h-5 animate-pulse bg-light-text-secondary dark:bg-dark-text-secondary rounded-full"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group p-2 rounded-full border border-border-light dark:border-border-dark 
                 bg-light-bg dark:bg-dark-surface hover:bg-light-surface dark:hover:bg-dark-bg
                 transition-all duration-300 hover:shadow-soft dark:hover:shadow-soft-dark
                 hover:scale-105 active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-secondary-dark group-hover:text-primary-dark 
                      transition-colors duration-300 group-hover:rotate-12 
                      transform transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:text-secondary 
                       transition-colors duration-300 group-hover:-rotate-12 
                       transform transition-transform" />
      )}
    </button>
  );
}