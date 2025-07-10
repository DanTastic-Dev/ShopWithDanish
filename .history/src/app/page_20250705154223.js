'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function HomePage() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our E-Commerce App</h1>
          <p className="text-xl mb-8 text-white/90">
            Discover amazing products with our modern shopping experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Theme Test Section */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 mb-8 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark">
          <h2 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">
            Theme Test
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            This page should be <strong className="text-light-text dark:text-dark-text">white with dark text</strong> in light mode,
            and <strong className="text-light-text dark:text-dark-text">dark with light text</strong> in dark mode.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary dark:bg-primary-dark rounded-full"></div>
              <span className="text-sm">Primary Color</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-secondary dark:bg-secondary-dark rounded-full"></div>
              <span className="text-sm">Secondary Color</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent dark:bg-accent-dark rounded-full"></div>
              <span className="text-sm">Accent Color</span>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark">
          {user ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-light-text dark:text-dark-text">
                Welcome back!
              </h2>
              <p className="text-lg mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                Hello, <span className="text-primary dark:text-primary-dark font-medium">{user.email}</span>
              </p>
              <div className="space-y-4">
                <Link href="/products" className="block">
                  <button className="w-full bg-primary dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark font-semibold">
                    Browse Products
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="w-full border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark px-6 py-3 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-light-text dark:text-dark-text">
                Get Started
              </h2>
              <p className="text-lg mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                Please log in or sign up to start shopping.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link href="/login" className="block sm:inline-block">
                  <button className="w-full sm:w-auto bg-primary dark:bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark font-semibold">
                    Login
                  </button>
                </Link>
                <Link href="/signup" className="block sm:inline-block">
                  <button className="w-full sm:w-auto border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark px-6 py-3 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark font-semibold">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark text-center">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
              Easy Shopping
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Browse and purchase products with our intuitive interface
            </p>
          </div>
          
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
              Fast Delivery
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Quick and reliable shipping to your doorstep
            </p>
          </div>
          
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
              Secure Payment
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Safe and secure transactions with multiple payment options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}