'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';


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
      <h1 className="text-2xl font-bold mb-6">🛍️ Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.Image}
                alt={item.Name}
                className="h-20 w-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.Name}</h2>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    ➖
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    ➕
                  </button>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  Price: Rs. {item.Price}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold text-purple-700">
          Total: Rs. {totalPrice}
        </h3>
        <Link href="/checkout">
  <button className="mt-2 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
    Proceed to Checkout
  </button>
</Link>
      </div>
    </div>
  );
}
