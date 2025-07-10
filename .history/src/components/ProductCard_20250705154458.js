'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product);
      // Optional: Show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-lg border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400 dark:text-gray-600">
            📦
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-primary dark:text-primary-dark">
            ${product.price?.toFixed(2) || '0.00'}
          </span>
          
          {product.stock && (
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <button className="w-full border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark px-3 py-2 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 text-sm font-medium">
              View Details
            </button>
          </Link>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding || (product.stock && product.stock <= 0)}
            className="flex-1 bg-primary dark:bg-primary-dark text-white px-3 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}