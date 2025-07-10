'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    Name: '',
    Price: '',
    Image: '',
    Description: '',
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, 'products'), {
        Name: form.Name,
        Price: parseInt(form.Price),
        Image: form.Image,
        Description: form.Description,
      });

      setForm({ Name: '', Price: '', Image: '', Description: '' });
      setSuccess(true);
    } catch (err) {
      console.error('Error adding product:', err);
    }

    setSubmitLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          name="Name"
          placeholder="Product Name"
          value={form.Name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="Price"
          placeholder="Price (e.g. 1999)"
          value={form.Price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="Image"
          placeholder="Image URL"
          value={form.Image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="Description"
          placeholder="Product Description"
          value={form.Description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {submitLoading ? 'Adding...' : 'Add Product'}
        </button>

        {success && <p className="text-green-600 mt-2 text-center">Product added successfully!</p>}
      </form>
    </div>
  ) : null;
}
