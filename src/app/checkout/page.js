'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

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
      OwnerId: item.OwnerId || null,
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
      router.push('/my-orders');
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Try again.');
    }

    setCheckoutLoading(false);
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center text-light-text dark:text-dark-text">
          <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
          <Link href="/products">
            <button className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition">
              Go to Products
            </button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-soft dark:shadow-soft-dark text-light-text dark:text-dark-text">
        <h1 className="text-2xl font-bold mb-6">🧾 Checkout</h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-border-light dark:border-border-dark pb-2">
              <div>
                <p className="font-semibold">{item.Name}</p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-medium text-primary dark:text-primary-dark">
                Rs. {item.Price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right mt-6 text-xl font-bold text-primary dark:text-primary-dark">
          Total: Rs. {total}
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="mt-6 w-full bg-primary dark:bg-primary-dark text-white py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition"
        >
          {checkoutLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </PageWrapper>
  );
}
