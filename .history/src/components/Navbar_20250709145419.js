'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import ThemeToggle from '@/components/ThemeToggle';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary py-4 px-6 border-b border-border-light dark:border-border-dark shadow-md dark:shadow-soft-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Logo + Categories */}
        <div className="flex items-center gap-4 relative">
          <Link href="/" className="text-2xl font-bold text-primary dark:text-primary hover:opacity-90 transition">
            🛍️ E-Shop
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition"
            >
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div
                className="absolute top-full mt-2 w-48 bg-white dark:bg-dark-surface text-black dark:text-dark-text-primary border border-border-light dark:border-border-dark rounded-lg shadow z-50"
                onMouseLeave={() => setShowDropdown(false)}
              >
                {['Mobiles', 'Fashion', 'Electronics', 'Home', 'Beauty'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black transition"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Centered Search */}
        <form onSubmit={handleSearch} className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-full border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/products" className="hover:text-primary transition">Products</Link>

          {role === 'Shop Owner' && (
            <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>
          )}

          {role === 'Customer' && (
            <Link href="/my-orders" className="hover:text-primary transition">My Orders</Link>
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
                className="bg-primary text-black px-4 py-2 rounded-lg hover:brightness-110 transition"
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
      </div>
    </nav>
  );
}
