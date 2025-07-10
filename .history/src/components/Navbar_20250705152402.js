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
      className="p-2 rounded-lg bg-accent dark:bg-accent-dark text-light-text dark:text-dark-text hover:bg-secondary hover:dark:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

// Mock hooks for demo purposes
function useAuth() {
  const [user, setUser] = useState(null);
  
  const login = () => setUser({ email: 'user@example.com', uid: '123' });
  const logout = () => setUser(null);
  
  return { user, login, logout };
}

function useCart() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Product 1', quantity: 2 },
    { id: 2, name: 'Product 2', quantity: 1 }
  ]);
  
  return { cart };
}

// Mock role state
function useRole() {
  const [role, setRole] = useState('Customer');
  
  const toggleRole = () => {
    setRole(prev => prev === 'Customer' ? 'Shop Owner' : 'Customer');
  };
  
  return { role, toggleRole };
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

// Main Navbar Component
function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { role } = useRole();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text shadow-soft dark:shadow-soft-dark py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 border-b border-border-light dark:border-border-dark">
      <Link href="/" className="text-xl font-bold text-primary dark:text-primary-dark hover:text-secondary dark:hover:text-secondary-dark transition-colors duration-300">
        🛍️ E-Shop
      </Link>

      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link 
          href="/products" 
          className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        >
          Products
        </Link>

        {role === 'Shop Owner' && (
          <Link 
            href="/dashboard" 
            className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
          >
            Dashboard
          </Link>
        )}

        {role === 'Customer' && (
          <Link 
            href="/my-orders" 
            className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
          >
            My Orders
          </Link>
        )}

        <Link 
          href="/cart" 
          className="relative text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        >
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-error text-white text-xs px-2 py-0.5 rounded-full shadow-soft animate-fade-in">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="hidden sm:inline text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="text-primary dark:text-primary-dark border-2 border-primary dark:border-primary-dark px-4 py-2 rounded-lg hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300 shadow-soft dark:shadow-soft-dark">
                Sign Up
              </button>
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}

// Demo Component
function Demo() {
  const { role, toggleRole } = useRole();
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-light-surface dark:bg-dark-surface transition-colors duration-300">
      <Navbar />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-light-bg dark:bg-dark-bg rounded-lg shadow-soft dark:shadow-soft-dark p-6 mb-6">
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            🎨 Themed Navbar Demo
          </h1>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={toggleRole}
                className="bg-accent dark:bg-accent-dark text-light-text dark:text-dark-text px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark transition-all duration-300"
              >
                Toggle Role: {role}
              </button>
              
              <button
                onClick={user ? logout : login}
                className="bg-info text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300"
              >
                {user ? 'Logout' : 'Login'} Demo
              </button>
            </div>
            
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              • Theme toggle in the navbar switches between light and dark modes
              • Role-based navigation items appear based on user role
              • Cart badge shows total items with smooth animations
              • All elements use your custom color palette
            </p>
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