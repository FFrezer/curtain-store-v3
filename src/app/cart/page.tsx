// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from 'next/image';
import jsPDF from "jspdf";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPreview, setOrderPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    delivery: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const updateCart = (items: any[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems([...items]);
  };

  const changeQty = (id: string, delta: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const buildOrderText = (order: any) => `
🧾 *ADE Curtain Store Order*

🗓️ Date: ${new Date().toLocaleString()}

👤 Name: ${order.name}
📞 Phone: ${order.phone}
🏠 Address: ${order.address}
🚚 Delivery Method: ${order.delivery}

🛒 Items:
${order.items.map((item: any) => `• ${item.name} x${item.quantity} - Br ${item.price * item.quantity}`).join("\n")}

💰 Total: Br ${order.total}
`;

  const sendToWhatsApp = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = { ...formData, items: cartItems, total };
    const text = buildOrderText(order);
    const encoded = encodeURIComponent(text.trim());
    const phoneNumber = "+251939979708";
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    localStorage.removeItem("cart");
    setCartItems([]);
    toast.success(`Thanks ${order.name}, your order was sent to WhatsApp!`);
    setShowModal(false);
  };

  const generatePDF = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = { ...formData, items: cartItems, total };
    const doc = new jsPDF();
    doc.text("ADE Curtain Store Order Receipt", 10, 10);
    doc.text(buildOrderText(order), 10, 20);
    doc.save("order-receipt.pdf");
  };

  const handlePreview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const delivery = data.get("delivery") as string;

    if (!name || !phone || !address || !delivery) return;

    const newFormData = { name, phone, address, delivery };
    setFormData(newFormData);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = { ...newFormData, items: cartItems, total };
    setOrderPreview(buildOrderText(order));
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Image src={item.image || "/placeholder.png"} alt={item.name} width={64} height={64} className="rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Br {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => changeQty(item.id, -1)} className="px-2 py-1 border rounded">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQty(item.id, 1)} className="px-2 py-1 border rounded">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline">Remove</button>
              </div>
            ))}
          </div>

          <form onSubmit={handlePreview} className="mt-8 space-y-4 border-t pt-6">
            <h2 className="text-xl font-bold">Checkout</h2>

            <input name="name" placeholder="Full Name" required className="w-full border p-2 rounded" />
            <input name="phone" type="tel" placeholder="Phone Number" required className="w-full border p-2 rounded" />
            <textarea name="address" placeholder="Delivery Address" required className="w-full border p-2 rounded" />
            <select name="delivery" required className="w-full border p-2 rounded">
              <option value="">Select Delivery Method</option>
              <option value="Pick up">Pick up</option>
              <option value="Delivery">Delivery</option>
            </select>

            <p className="text-lg font-semibold">
              Total: Br {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>

            <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 w-full">
              Preview Order
            </button>
          </form>

          {showModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
              <div className="bg-white p-6 rounded shadow max-w-md w-full">
                <h3 className="text-xl font-semibold mb-2">Confirm Your Order</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-80 whitespace-pre-wrap">{orderPreview}</pre>
                <div className="flex justify-between mt-4">
                  <button onClick={() => { sendToWhatsApp(); generatePDF(); }} className="bg-green-600 text-white px-4 py-2 rounded">
                    Confirm & Send
                  </button>
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:underline">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


