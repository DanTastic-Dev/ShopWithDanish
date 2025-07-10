'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-light-surface dark:bg-dark-surface border border-border-light dark:border-border-dark rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.Image}
            alt={product.Name}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
  {product.Name}
</h3>

          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
            {product.Description}
          </p>

          <p className="text-lg font-bold text-primary">
            Rs. {product.Price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary text-black py-3 rounded-lg font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}
