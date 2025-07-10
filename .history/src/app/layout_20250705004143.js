import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce App',
  description: 'Built with Next.js and Firebase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-lightBackground text-darkBlue dark:bg-darkBackground dark:text-lightBlue transition-colors duration-300 min-h-screen ${inter.className}`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
