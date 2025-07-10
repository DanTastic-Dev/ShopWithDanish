'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';


export default function EditProductPage() {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    Name: '',
    Price: '',
    Image: '',
    Description: '',
  });

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          Name: data.Name,
          Price: data.Price,
          Image: data.Image,
          Description: data.Description,
        });
      } else {
        alert('Product not found.');
        router.push('/dashboard');
      }

      setLoadingProduct(false);
    }

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...form,
        Price: parseInt(form.Price),
      });
      alert('Product updated!');
      router.push('/dashboard');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating product.');
    }

    setSubmitLoading(false);
  };

  if (loading || loadingProduct) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

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
          placeholder="Price"
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
          placeholder="Description"
          value={form.Description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {submitLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
