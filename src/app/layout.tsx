import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import ConditionalNavbar from '@/components/ConditionalNavbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { ClientComponentsWrapper } from '@/components/ClientComponentsWrapper';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react'; 
import { Providers } from './providers';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Curtain Store | Custom Drapes & Blinds',
  description: 'Shop high-quality curtains, blinds, and textiles.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-cream p-4">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}