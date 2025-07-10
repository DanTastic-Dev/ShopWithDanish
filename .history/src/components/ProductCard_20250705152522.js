import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context (adapted for artifact environment)
const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check system preference for initial theme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(systemPrefersDark);
    
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    isDark,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-accent dark:bg-accent-dark text-light-text dark:text-dark-text hover:bg-secondary hover:dark:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark z-50"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

// Mock cart hook
function useCart() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return { cart, addToCart };
}

// Link component for demo
function Link({ href, children, className = "" }) {
  return (
    <a 
      href={href} 
      className={`cursor-pointer ${className}`}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

// Main Product Card Component
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-light-bg dark:bg-dark-bg shadow-soft dark:shadow-soft-dark rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl border border-border-light dark:border-border-dark group animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.Image}
            alt={product.Name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold mb-2 text-light-text dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-300">
            {product.Name}
          </h2>
          
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3 line-clamp-2">
            {product.Description}
          </p>
          
          <p className="text-primary dark:text-primary-dark font-bold text-lg">
            Rs. {product.Price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary dark:bg-primary-dark text-white px-4 py-3 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark hover:shadow-lg dark:hover:shadow-xl font-medium flex items-center justify-center gap-2 group"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Demo Component
function Demo() {
  const { cart } = useCart();
  
  // Sample products data
  const products = [
    {
      id: 1,
      Name: "Premium Wireless Headphones",
      Description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
      Price: 15999,
      Image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      Name: "Smart Watch Series X",
      Description: "Advanced smartwatch with health monitoring, GPS tracking, and seamless connectivity. Stay connected and healthy.",
      Price: 25999,
      Image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      Name: "Mechanical Gaming Keyboard",
      Description: "RGB backlit mechanical keyboard with premium switches. Designed for gaming enthusiasts and professionals.",
      Price: 8999,
      Image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      Name: "4K Webcam Pro",
      Description: "Ultra HD webcam with auto-focus and noise reduction. Perfect for streaming, video calls, and content creation.",
      Price: 12999,
      Image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      Name: "Portable Power Bank",
      Description: "High-capacity portable charger with fast charging technology. Keep your devices powered on the go.",
      Price: 3999,
      Image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      Name: "Bluetooth Speaker",
      Description: "Waterproof portable speaker with 360° sound and long battery life. Perfect for outdoor adventures.",
      Price: 6999,
      Image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop"
    }
  ];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-light-surface dark:bg-dark-surface transition-colors duration-300">
      <ThemeToggle />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
            🛍️ Product Gallery
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Discover our amazing collection of products with beautiful themed cards
          </p>
          
          {totalItems > 0 && (
            <div className="mt-4 p-4 bg-accent dark:bg-accent-dark rounded-lg border border-border-light dark:border-border-dark">
              <p className="text-light-text dark:text-dark-text font-medium">
                🛒 Cart: {totalItems} items added
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-light-bg dark:bg-dark-bg rounded-lg shadow-soft dark:shadow-soft-dark border border-border-light dark:border-border-dark">
          <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
            🎨 Theme Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-light-text dark:text-dark-text mb-2">Visual Enhancements:</h3>
              <ul className="text-light-text-secondary dark:text-dark-text-secondary space-y-1">
                <li>• Smooth hover animations</li>
                <li>• Image scaling effects</li>
                <li>• Gradient overlays</li>
                <li>• Shadow transitions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-light-text dark:text-dark-text mb-2">Theme Integration:</h3>
              <ul className="text-light-text-secondary dark:text-dark-text-secondary space-y-1">
                <li>• Custom color palette</li>
                <li>• Dark/light mode support</li>
                <li>• Consistent spacing</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  );
}