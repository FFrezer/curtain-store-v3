import '@/styles/globals.css';
import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';



export const metadata = {
  title: 'Curtain Store | Custom Drapes & Blinds',
  description: 'Shop high-quality curtains, blinds, and textiles.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartProvider>
          <Navbar />
          <main className="min-h-screen bg-cream p-4">{children}</main>
          <Toaster position="top-right"  />
          <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}