"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";


export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  console.log("🧺 Cart at checkout:", cart);
console.log("💵 Total:", total);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (cart.length === 0 || total <= 0) {
    alert("🛒 Your cart is empty.");
    return;
  }

  try {
    const res = await fetch("/api/submit-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cart, total }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`❌ Error: ${data.error || "Something went wrong"}`);
      return;
    }

    clearCart();
    setSubmitted(true);
  } catch (err) {
    alert("❌ Network error. Please try again.");
    console.error("Submit failed:", err);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {submitted ? (
          <div className="text-green-600 font-semibold">
            ✅ Thank you, {form.name}! Your order has been received.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border px-3 py-2 rounded"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border px-3 py-2 rounded"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-semibold">Shipping Address</label>
              <textarea
                name="address"
                required
                className="w-full border px-3 py-2 rounded"
                rows={3}
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <h2 className="text-xl font-bold mt-6">🧾 Order Summary</h2>
            <ul className="border rounded p-4 space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </li>
              ))}
              <li className="font-bold flex justify-between pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </li>
            </ul>

            <button
              type="submit"
              className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Place Order
            </button>
          </form>
        )}
      </main>
      
    </div>
  );
}
