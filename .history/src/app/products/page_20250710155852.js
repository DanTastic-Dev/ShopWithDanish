'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchQuery) ||
    product.Description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
  Browse Products
</h1>

           <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
    Explore a wide variety of items you&apos;ll love
  </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-light-surface dark:bg-dark-surface border border-border-light dark:border-border-dark rounded-lg p-8 shadow-soft dark:shadow-soft-dark">
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Try a different search or check back later.
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        {!error && filteredProducts.length > 0 && (
          <>
            <div className="mb-6 text-right">
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
