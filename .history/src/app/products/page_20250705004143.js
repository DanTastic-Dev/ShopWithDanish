import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const productsSnapshot = await getDocs(collection(db, 'products'));

  const products = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
