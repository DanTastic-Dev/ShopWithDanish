'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-light-bg dark:bg-dark-bg shadow-soft dark:shadow-soft-dark rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl border border-border-light dark:border-border-dark group animate-fade-in">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.Image}
            alt={product.Name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
            {product.Name}
          </h2>
          
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3 line-clamp-2">
            {product.Description}
          </p>
          
          <p className="text-primary dark:text-primary-dark font-bold text-lg">
            Rs. {product.Price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary dark:bg-primary-dark text-white px-4 py-3 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark hover:shadow-lg dark:hover:shadow-xl font-medium flex items-center justify-center gap-2 group"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}