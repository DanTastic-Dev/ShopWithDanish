'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <div className="min-h-screen flex items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📊 Shop Analytics</h1>

      <div className="mb-8 bg-white p-4 rounded shadow">
        <p className="text-lg font-medium text-gray-700">
          🧾 Total Orders: <span className="font-bold">{totalOrders}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          💰 Total Revenue: <span className="font-bold">Rs. {totalRevenue}</span>
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📦 Product Sales</h2>
      {analytics.length === 0 ? (
        <p>No sales yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {analytics.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{item.Name}</h3>
              <p className="text-gray-700">Units Sold: {item.quantity}</p>
              <p className="text-gray-700">Revenue: Rs. {item.revenue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
