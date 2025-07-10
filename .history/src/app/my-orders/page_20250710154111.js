'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper';

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
      const orderList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
    setFetching(false);
  };

  if (loading || fetching) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex justify-center items-center text-lg text-light-text dark:text-dark-text">
          Loading orders...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-light-text-secondary dark:text-dark-text-secondary">You haven&apos;t placed any orders yet.</p>
   ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="rounded-lg border border-border-light dark:border-border-dark bg-light-surface dark:bg-dark-surface shadow-soft dark:shadow-soft-dark p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Order #{order.id}</h2>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {order.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-primary dark:text-primary-dark font-semibold text-lg">
                  Rs. {order.total}
                </div>
              </div>
              <div className="divide-y divide-border-light dark:divide-border-dark">
                {order.items.map(item => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{item.Name}</p>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-primary dark:text-primary-dark font-semibold">
                      Rs. {item.Price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
