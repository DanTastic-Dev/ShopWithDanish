'use client';

import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-10 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text text-center">
        🛒 Browse Products
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
  