'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col justify-between">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.Image}
          alt={product.Name}
          className="w-full h-45 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{product.Name}</h2>
          <p className="text-gray-700 text-sm mb-2">{product.Description}</p>
          <p className="text-purple-600 font-bold text-md">Rs. {product.Price}</p>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="bg-purple-600 text-white px-4 py-2 m-4 rounded hover:bg-purple-700 text-sm"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
