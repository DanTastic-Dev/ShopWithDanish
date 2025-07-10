'use client';

import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <div className="w-full max-w-sm bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-soft dark:shadow-soft-dark">
        <h2 className="text-2xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
          🔐 Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary dark:bg-primary-dark text-white py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
