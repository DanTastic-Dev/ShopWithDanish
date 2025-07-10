'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-lightBackground dark:bg-darkBlue border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 group flex flex-col animate-fade-in">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.Image}
            alt={product.Name}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 flex flex-col justify-between flex-1">
          <h2 className="text-xl font-semibold text-darkBlue dark:text-lightBlue group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
            {product.Name}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {product.Description}
          </p>

          <p className="text-lg font-bold text-primary dark:text-primary-dark mt-4">
            Rs. {product.Price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary dark:bg-primary-dark text-white py-3 rounded-xl font-semibold hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 flex items-center justify-center gap-2 shadow hover:shadow-lg"
        >
          <span className="text-lg">🛒</span> Add to Cart
        </button>
      </div>
    </div>
  );
}
