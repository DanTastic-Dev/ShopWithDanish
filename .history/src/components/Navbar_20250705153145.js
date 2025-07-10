'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [role, setRole] = useState(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRole(snap.data().role || 'Customer');
        }
      } else {
        setRole(null);
      }
    };
    fetchRole();
  }, [user]);

  return (
    <nav className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text shadow-soft dark:shadow-soft-dark py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 border-b border-border-light dark:border-border-dark">
      <Link href="/" className="text-xl font-bold text-primary dark:text-primary-dark hover:text-secondary dark:hover:text-secondary-dark transition-colors duration-300">
        🛍️ E-Shop
      </Link>

      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link 
          href="/products" 
          className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        >
          Products
        </Link>

        {role === 'Shop Owner' && (
          <Link 
            href="/dashboard" 
            className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
          >
            Dashboard
          </Link>
        )}

        {role === 'Customer' && (
          <Link 
            href="/my-orders" 
            className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
          >
            My Orders
          </Link>
        )}

        <Link 
          href="/cart" 
          className="relative text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        >
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-error text-white text-xs px-2 py-0.5 rounded-full shadow-soft animate-fade-in">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="hidden sm:inline text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="text-primary dark:text-primary-dark border-2 border-primary dark:border-primary-dark px-4 py-2 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark">
                Sign Up
              </button>
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}