'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleCheckout = async () => {
    if (!user) return;

    setCheckoutLoading(true);

    const enrichedItems = cart.map((item) => ({
      id: item.id,
      Name: item.Name,
      Price: item.Price,
      quantity: item.quantity,
      OwnerId: item.OwnerId || null, // Include owner
    }));

    const order = {
      userId: user.uid,
      userEmail: user.email,
      items: enrichedItems,
      total,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      clearCart();
      router.push('/my-orders'); // ✅ Redirect after order
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Try again.');
    }

    setCheckoutLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
        <Link href="/products">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Go to Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <div>
            <p className="font-semibold">{item.Name}</p>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
          </div>
          <p className="font-medium">Rs. {item.Price * item.quantity}</p>
        </div>
      ))}
      <div className="text-right mt-4 text-lg font-bold text-purple-700">
        Total: Rs. {total}
      </div>
      <button
        onClick={handleCheckout}
        disabled={checkoutLoading}
        className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        {checkoutLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}
