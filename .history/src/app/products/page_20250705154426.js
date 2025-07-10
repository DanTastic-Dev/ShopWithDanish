import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    error = 'Failed to load products. Please try again later.';
    console.error('Error fetching products:', err);
  }

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
            All Products
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error Loading Products
                </h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && products.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 border border-border-light dark:border-border-dark shadow-soft dark:shadow-soft-dark">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
                No Products Found
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                There are no products available at the moment. Please check back later.
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!error && products.length > 0 && (
          <>
            <div className="mb-6">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}