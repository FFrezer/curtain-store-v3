'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { cart, hasMounted } = useCart();
  const handleClose = () => setIsCartOpen(false);

  if (pathname === "/" || pathname === "/en") return null;
  if (!hasMounted) return null;

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <nav className="bg-white border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <span className="text-lg md:text-xl font-bold text-accent font-serif">ADEA</span>
          </Link>

          {/* Always-visible links */}
          <div className="flex flex-wrap gap-4 text-sm md:text-base font-medium text-gray-700">
            <Link href="/shop" className="hover:text-accent">Shop</Link>
            <Link href="/Services" className="hover:text-accent">Services</Link>
            <Link href="/About" className="hover:text-accent">About</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>

            {/* 🛒 Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-accent"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={handleClose} />
    </>
  );
}
