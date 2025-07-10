'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    Name: '',
    Price: '',
    Image: '',
    Description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          setForm({
            Name: data.Name,
            Price: data.Price,
            Image: data.Image,
            Description: data.Description,
          });
        } else {
          alert('Product not found.');
          router.push('/admin/products');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateDoc(doc(db, 'products', id), {
        Name: form.Name,
        Price: parseInt(form.Price),
        Image: form.Image,
        Description: form.Description,
      });

      alert('Product updated!');
      router.push('/admin/products');
    } catch (err) {
      console.error('Update failed:', err);
    }

    setSaving(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleUpdate} className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
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
        ></textarea>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
