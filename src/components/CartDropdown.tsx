"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDropdown() {
  const { cart, total } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  if (!visible) return null;

  return (
    <div className="absolute right-4 top-14 bg-white border rounded shadow-lg w-72 p-4 z-50">
      <h2 className="font-semibold text-lg mb-2">🛒 Cart Preview</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-2 mb-2">
          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
          <div className="flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
          </div>
          <p className="text-sm font-semibold">Birr {item.price * (item.quantity || 1)}</p>
        </div>
      ))}
      <div className="flex justify-between mt-2 text-sm font-semibold">
        <span>Total:</span>
        <span>Birr {total}</span>
      </div>
      <Link
        href="/checkout"
        className="mt-3 block text-center bg-black text-white py-1.5 rounded hover:bg-gray-800 transition"
      >
        Go to Checkout
      </Link>
    </div>
  );
}
