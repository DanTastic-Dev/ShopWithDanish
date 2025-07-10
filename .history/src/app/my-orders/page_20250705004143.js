'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchOrders();
    }
  }, [user, loading]);

  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const orderList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
    setFetching(false);
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded shadow p-4 mb-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <p className="text-sm text-gray-600">
                {order.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-1 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.Name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs. {item.Price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="text-right mt-3 text-purple-700 font-bold">
              Total: Rs. {order.total}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
