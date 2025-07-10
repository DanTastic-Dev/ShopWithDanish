import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default async function ProductDetailPage({ params }) {
  const productId = params.id;

  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Product not found 😢
      </div>
    );
  }

  const product = docSnap.data();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow max-w-xl w-full">
        <img
          src={product.Image}
          alt={product.Name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <h1 className="text-2xl font-bold mb-2">{product.Name}</h1>
        <p className="text-gray-700 mb-4">{product.Description}</p>
        <p className="text-purple-600 font-bold text-xl">Rs. {product.Price}</p>
      </div>
    </div>
  );
}
