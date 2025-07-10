'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="bg-light-surface dark:bg-dark-surface border border-border-light dark:border-border-dark rounded-lg shadow-soft dark:shadow-soft-dark overflow-hidden flex flex-col">
      <img
        src={product.Image}
        alt={product.Name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
            {product.Name}
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
            {product.Description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-primary dark:text-primary-dark">Rs. {product.Price}</p>
          <Link
            href={`/products/${product.id}`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
