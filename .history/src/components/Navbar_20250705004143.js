'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import ThemeToggle from './ThemeToggle';

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
    <nav className="bg-lightBlue dark:bg-darkBlue text-darkBlue dark:text-lightBlue shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <Link href="/" className="text-xl font-bold">
        🛍️ E-Shop
      </Link>

      <div className="flex items-center space-x-4 text-sm font-medium">
        <Link href="/products" className="hover:text-white">
          Products
        </Link>

        {role === 'Shop Owner' && (
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        )}

        {role === 'Customer' && (
          <Link href="/my-orders" className="hover:text-white">
            My Orders
          </Link>
        )}

        <Link href="/cart" className="relative hover:text-white">
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="hidden sm:inline text-sm">{user.email}</span>
            <button
              onClick={logout}
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="text-purple-600 border border-purple-600 px-3 py-1 rounded hover:bg-purple-100 dark:hover:bg-darkBackground">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                Sign Up
              </button>
            </Link>
          </>
        )}

        {/* 🌙 Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
