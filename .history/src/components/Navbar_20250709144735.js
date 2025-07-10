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
    <nav className="bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary py-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-border-light dark:border-border-dark shadow-md dark:shadow-soft-dark">
      <Link href="/" className="text-2xl font-bold text-primary dark:text-primary hover:opacity-90 transition">
        🛍️ E-Shop
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/products" className="hover:text-primary transition">
          Products
        </Link>

        {role === 'Shop Owner' && (
          <Link href="/dashboard" className="hover:text-primary transition">
            Dashboard
          </Link>
        )}

        {role === 'Customer' && (
          <Link href="/my-orders" className="hover:text-primary transition">
            My Orders
          </Link>
        )}

        <Link href="/cart" className="relative hover:text-primary transition">
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-error text-white text-xs px-2 py-0.5 rounded-full shadow">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="hidden sm:inline text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="bg-primary dark:bg-primary-dark text-black px-4 py-2 rounded-lg hover:brightness-110 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-black transition">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-primary text-black px-4 py-2 rounded-lg hover:brightness-110 transition">
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
