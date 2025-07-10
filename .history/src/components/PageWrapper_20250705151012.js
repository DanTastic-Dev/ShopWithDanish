// components/PageWrapper.js
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTheme } from '@/components/ThemeProvider';

export default function PageWrapper({ children, className = '' }) {
  const { isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div className={`
      min-h-screen transition-all duration-300 ease-in-out
      bg-light-bg dark:bg-dark-bg 
      text-light-text dark:text-dark-text
      ${className}
    `}>
      <div className="min-h-screen animate-fade-in">
        {children}
      </div>
    </div>
  );
}