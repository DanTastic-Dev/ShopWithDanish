'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper';

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchAnalytics();
    }
  }, [user, loading]);

  const fetchAnalytics = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    const productMap = {};
    let revenue = 0;
    let ordersWithOwnerProducts = 0;

    snapshot.forEach((doc) => {
      const order = doc.data();
      let orderHasOwnerProduct = false;

      order.items.forEach((item) => {
        if (item.OwnerId === user.uid) {
          orderHasOwnerProduct = true;

          if (!productMap[item.id]) {
            productMap[item.id] = {
              Name: item.Name,
              quantity: 0,
              revenue: 0,
            };
          }

          productMap[item.id].quantity += item.quantity;
          productMap[item.id].revenue += item.Price * item.quantity;
          revenue += item.Price * item.quantity;
        }
      });

      if (orderHasOwnerProduct) {
        ordersWithOwnerProducts++;
      }
    });

    setAnalytics(Object.values(productMap));
    setTotalRevenue(revenue);
    setTotalOrders(ordersWithOwnerProducts);
    setLoadingData(false);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-light-text dark:text-dark-text">
        Loading analytics...
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen px-4 md:px-8 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">📊 Shop Analytics</h1>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-soft dark:shadow-soft-dark">
            <p className="text-lg text-light-text dark:text-dark-text font-medium">🧾 Total Orders</p>
            <p className="text-3xl font-bold text-primary dark:text-primary-dark mt-2">{totalOrders}</p>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-soft dark:shadow-soft-dark">
            <p className="text-lg text-light-text dark:text-dark-text font-medium">💰 Total Revenue</p>
            <p className="text-3xl font-bold text-primary dark:text-primary-dark mt-2">Rs. {totalRevenue}</p>
          </div>
        </div>

        {/* Product Breakdown */}
        <h2 className="text-2xl font-semibold mb-6 text-light-text dark:text-dark-text">📦 Product Sales</h2>

        {analytics.length === 0 ? (
          <p className="text-light-text-secondary dark:text-dark-text-secondary">No sales yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.map((item, idx) => (
              <div
                key={idx}
                className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg shadow-soft dark:shadow-soft-dark"
              >
                <h3 className="text-lg font-semibold mb-1 text-light-text dark:text-dark-text">
                  {item.Name}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  Units Sold: {item.quantity}
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                  Revenue: Rs. {item.revenue}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
