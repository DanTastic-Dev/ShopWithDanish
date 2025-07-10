'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';
import PageWrapper from '@/components/PageWrapper';

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

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
      <PageWrapper>
        <div className="min-h-screen flex justify-center items-center text-light-text dark:text-dark-text">
          Loading...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto bg-light-surface dark:bg-dark-surface rounded-lg p-6 shadow-soft dark:shadow-soft-dark">
        <h1 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">✏️ Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Name"
            placeholder="Product Name"
            value={form.Name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          />
          <input
            type="number"
            name="Price"
            placeholder="Price"
            value={form.Price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          />
          <input
            type="text"
            name="Image"
            placeholder="Image URL"
            value={form.Image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          />
          <textarea
            name="Description"
            placeholder="Description"
            value={form.Description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-border-light dark:border-border-dark rounded bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text"
          />

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full bg-primary dark:bg-primary-dark text-white py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition"
          >
            {submitLoading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
