'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Optional icons from Lucide

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border dark:border-lightBlue border-darkBlue transition"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="text-lightBlue" /> : <Moon className="text-darkBlue" />}
    </button>
  );
}
