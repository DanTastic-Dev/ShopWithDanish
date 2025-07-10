'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const { user } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">🛍️ Your Cart</h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text p-4 rounded-lg shadow-soft dark:shadow-soft-dark"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.Image}
                  alt={item.Name}
                  className="h-20 w-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.Name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 text-sm rounded bg-border-light dark:bg-border-dark"
                    >
                      ➖
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 text-sm rounded bg-border-light dark:bg-border-dark"
                    >
                      ➕
                    </button>
                  </div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    Price: Rs. {item.Price}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-md font-semibold text-primary dark:text-primary-dark">
                  Rs. {item.Price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-error text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <h3 className="text-xl font-bold text-primary dark:text-primary-dark">
            Total: Rs. {totalPrice}
          </h3>
          <Link href="/checkout">
            <button className="mt-4 bg-primary dark:bg-primary-dark text-white px-6 py-2 rounded hover:bg-secondary dark:hover:bg-secondary-dark transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
