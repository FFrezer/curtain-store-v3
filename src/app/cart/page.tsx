"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

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

  const sendOrderToWhatsApp = (order: any) => {
    const orderText = `
🧾 *ADE Curtain Store Order*

🗓️ Date: ${new Date().toLocaleString()}

👤 Name: ${order.name}
📞 Phone: ${order.phone}
🏠 Address: ${order.address}
🚚 Delivery Method: ${order.delivery}

🛒 Items:
${order.items
      .map((item: any) => `• ${item.name} x${item.quantity} - Br ${item.price * item.quantity}`)
      .join("\n")}

💰 Total: Br ${order.total}
`;

    const encoded = encodeURIComponent(orderText.trim());
    const phoneNumber = "+251939979708"; // replace with actual owner's number
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
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
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="px-2 py-1 border rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const phone = formData.get("phone") as string;
                const address = formData.get("address") as string;
                const delivery = formData.get("delivery") as string;

                if (!name || !phone || !address || !delivery) return;

                const order = {
                  name,
                  phone,
                  address,
                  delivery,
                  items: cartItems,
                  total: cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ),
                };

                sendOrderToWhatsApp(order);
                localStorage.removeItem("cart");
                setCartItems([]);
                toast.success(`Thanks ${order.name}, your order was sent to WhatsApp!`);
              }}
              className="mt-8 space-y-4 border-t pt-6"
            >
              <h2 className="text-xl font-bold">Checkout</h2>

              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="+251 9..."
                />
              </div>

              <div>
                <label className="block mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="Street, City, Landmark..."
                />
              </div>

              <div>
                <label className="block mb-1">Delivery Method</label>
                <select
                  name="delivery"
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select one</option>
                  <option value="Pick up">Pick up</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <p className="text-lg font-semibold">
                Total: Br {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </p>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Submit Order
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
