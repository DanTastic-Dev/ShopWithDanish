'use client';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default async function ProductDetailPage({ params }) {
  const productId = params.id;
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Product not found 😢
      </div>
    );
  }

  const product = docSnap.data();

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-12 px-4 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 md:flex gap-8">
        <img
          src={product.Image}
          alt={product.Name}
          className="w-full md:w-1/2 h-72 object-cover rounded-lg"
        />
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.Name}</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">{product.Description}</p>
          <p className="text-yellow-600 dark:text-yellow-400 font-bold text-2xl mb-6">
            Rs. {product.Price.toLocaleString()}
          </p>
          <button className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
