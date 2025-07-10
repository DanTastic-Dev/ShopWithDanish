'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        role,
      });

      router.push('/products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <form
        onSubmit={handleSignup}
        className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-soft dark:shadow-soft-dark w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-light-text dark:text-dark-text">Sign Up</h2>
        {error && <p className="text-error text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-border-light dark:border-border-dark p-2 rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-border-light dark:border-border-dark p-2 rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-border-light dark:border-border-dark p-2 rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
        >
          <option value="Customer">Customer</option>
          <option value="Shop Owner">Shop Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary dark:bg-primary-dark    text-white py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
