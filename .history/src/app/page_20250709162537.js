'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 text-black dark:text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to E-Shop</h1>
          <p className="text-xl mb-8 text-black/80 dark:text-black/90">
            Experience shopping like never before – Fast, Secure & Stylish.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/products">
              <button className="bg-black text-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
                Browse Products
              </button>
            </Link>
            {!user && (
              <Link href="/signup">
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Create Account
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { icon: '🛍️', title: 'Shop Smart', desc: 'Browse top deals with ease.' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Delivered right to your door.' },
    { icon: '🔐', title: 'Secure Checkout', desc: '100% safe and reliable.' },
  ].map((f, idx) => (
    <div
      key={idx}
      className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl border border-border-light dark:border-border-dark shadow hover:shadow-lg transition"
    >
      <div className="text-4xl mb-4">{f.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {f.title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{f.desc}</p>
    </div>
  ))}
</div>

    </div>
  );
}
