'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been successfully placed. Thank you!
      </p>
      <Link href="/products">
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
