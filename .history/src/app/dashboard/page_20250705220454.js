'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    Name: '',
    Price: '',
    Image: '',
    Description: '',
  });
  const [products, setProducts] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    } else if (user) {
      fetchUserProducts();
    }
  }, [user, loading]);

  const fetchUserProducts = async () => {
    const q = query(collection(db, 'products'), where('OwnerId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setProducts(items);
  };

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
        OwnerId: user.uid,
      });

      setForm({ Name: '', Price: '', Image: '', Description: '' });
      setSuccess(true);
      fetchUserProducts();
    } catch (err) {
      console.error('Error adding product:', err);
    }

    setSubmitLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchUserProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-light-text dark:text-dark-text">
        Loading...
      </div>
    );
  }

  return user ? (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">Shop Dashboard</h1>

      <div className="mb-6 text-right">
        <Link href="/dashboard/analytics">
          <button className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition">
            📊 View Analytics
          </button>
        </Link>
      </div>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text p-6 rounded-lg shadow-soft dark:shadow-soft-dark space-y-4 mb-10"
      >
        {['Name', 'Price', 'Image'].map((field) => (
          <input
            key={field}
            type={field === 'Price' ? 'number' : 'text'}
            name={field}
            placeholder={`Product ${field}`}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border-light dark:border-border-dark bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text rounded"
          />
        ))}
        <textarea
          name="Description"
          placeholder="Product Description"
          value={form.Description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-border-light dark:border-border-dark bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text rounded"
        ></textarea>

        <button
          type="submit"
          disabled={submitLoading}
          className="w-full bg-primary dark:bg-primary-dark text-white py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition"
        >
          {submitLoading ? 'Adding...' : 'Add Product'}
        </button>

        {success && <p className="text-success text-center">Product added successfully!</p>}
      </form>

      {/* Product List */}
      <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Your Products</h2>
      {products.length === 0 ? (
        <p className="text-light-text-secondary dark:text-dark-text-secondary">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text shadow-soft dark:shadow-soft-dark rounded-lg overflow-hidden"
            >
              <img src={product.Image} alt={product.Name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.Name}</h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  {product.Description}
                </p>
                <p className="text-primary dark:text-primary-dark font-bold text-md">Rs. {product.Price}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <Link href={`/dashboard/edit/${product.id}`}>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-error text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  ) : null;
}
