'use client';

export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  );
}
