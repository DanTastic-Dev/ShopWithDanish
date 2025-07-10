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
    <div className="min-h-screen flex items-center justify-center bg-lightBackground dark:bg-darkBackground px-4 transition-colors duration-300">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-darkBlue p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-darkBlue dark:text-lightBlue">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBackground text-darkBlue dark:text-lightBlue focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBackground text-darkBlue dark:text-lightBlue focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBackground text-darkBlue dark:text-lightBlue focus:outline-none"
        >
          <option value="Customer">Customer</option>
          <option value="Shop Owner">Shop Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary dark:bg-primary-dark text-white py-2 rounded-md font-semibold hover:bg-secondary dark:hover:bg-secondary-dark transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
