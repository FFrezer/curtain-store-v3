'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    setCartCount(storedCart.length);

    const handleStorage = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updatedCart);
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (pathname === '/' || pathname === '/en') return null;

  return (
    <>
      <nav className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold text-accent font-serif">ADEA</span>
          </Link>

          <div className="flex space-x-6 text-sm font-medium text-gray-700">
            <Link href="/shop" className="hover:text-accent">Shop</Link>
            <Link href="/Services" className="hover:text-accent">Services</Link>
            <Link href="/About" className="hover:text-accent">About</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>

            {/* 🛒 Cart Drawer Trigger */}
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-accent">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />
    </>
  );
}
