'use client';

export default function PageWrapper({ children }) {
  return (
    <div className="bg-lightBackground text-darkBlue dark:bg-darkBackground dark:text-lightBlue min-h-screen p-6 transition-colors duration-300">
      {children}
    </div>
  );
}
