'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';


export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        Name: '',
        Price: '',
        Image: '',
        Description: '',
    });
    const [products, setProducts] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!loading && user === null) {
            router.push('/login');
        } else if (user) {
            fetchUserProducts();
        }
    }, [user, loading]);

    const fetchUserProducts = async () => {
        const q = query(collection(db, 'products'), where('OwnerId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        setProducts(items);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setSuccess(false);

        try {
            await addDoc(collection(db, 'products'), {
                Name: form.Name,
                Price: parseInt(form.Price),
                Image: form.Image,
                Description: form.Description,
                OwnerId: user.uid,
            });

            setForm({ Name: '', Price: '', Image: '', Description: '' });
            setSuccess(true);
            fetchUserProducts(); // ✅ Refresh product list
        } catch (err) {
            console.error('Error adding product:', err);
        }

        setSubmitLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            fetchUserProducts(); // ✅ Refresh after delete
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Loading...
            </div>
        );
    }

    return user ? (
        <PageWrapper>
    <h1 className="text-3xl font-bold mb-6">Shop Dashboard</h1
        
        <div className="mb-6 text-right">
  <Link href="/dashboard/analytics">
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      📊 View Analytics
    </button>
  </Link>
</div>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow space-y-4 mb-10">
                <input type="text" name="Name" placeholder="Product Name" value={form.Name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="Price" placeholder="Price" value={form.Price} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="Image" placeholder="Image URL" value={form.Image} onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="Description" placeholder="Product Description" value={form.Description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>

                <button type="submit" disabled={submitLoading} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    {submitLoading ? 'Adding...' : 'Add Product'}
                </button>

                {success && <p className="text-green-600 mt-2 text-center">Product added successfully!</p>}
            </form>

            {/* Product List */}
            <h2 className="text-2xl font-bold mb-4">Your Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                            <img src={product.Image} alt={product.Name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.Name}</h2>
                                <p className="text-gray-700 text-sm">{product.Description}</p>
                                <p className="text-purple-600 font-bold text-md">Rs. {product.Price}</p>
                                <div className="flex items-center mt-4">
                                    <Link href={`/dashboard/edit/${product.id}`}>
                                        <button className="text-sm text-blue-600 hover:underline">Edit</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    ) : null;
}
