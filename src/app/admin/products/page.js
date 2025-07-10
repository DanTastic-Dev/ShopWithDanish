'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    await deleteDoc(doc(db, 'products', id));
    fetchProducts(); // refresh list
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10">Loading products...</div>;

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Admin: Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <img src={product.Image} alt={product.Name} className="h-48 w-full object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{product.Name}</h2>
            <p className="text-sm text-gray-600">{product.Description}</p>
            <p className="font-bold text-purple-600 mb-2">Rs. {product.Price}</p>

            <div className="flex gap-2">
              <Link href={`/admin/edit/${product.id}`}>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  ✏️ Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
