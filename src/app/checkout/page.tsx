"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";

const branchPhoneMap: Record<string, string> = {
  MERKATO: "251939979708",
  PIASSA: "251960231547",
  GERJI: "251940707077",
};

export default function CheckoutPage() {
  const { setOrder } = useCartStore();
  const router = useRouter();
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    branch: "",
    images: [""],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const removeImage = (index: number) => {
    if (form.images.length <= 1) return;
    const newImages = form.images.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, address, branch, images } = form;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !address || !branch || !branchPhoneMap[branch]) {
    toast.error("❗ Please fill in all fields and select a valid branch.");
    return;
  }

  if (!emailRegex.test(email)) {
    toast.error("📧 Please enter a valid email address.");
    return;
  }

  if (cart.length === 0 || total <= 0) {
    toast.error("🛒 Your cart is empty.");
    return;
  }

  // Flattened orderData to match Order type interface
  const orderData = {
    name,
    phone: branchPhoneMap[branch],
    address,
    delivery: branch,
    items: cart,
    total,
    createdAt: new Date().toISOString(),
    images,
    email,
  };

  setOrder(orderData);

  toast.success("✅ Order submitted!");
  clearCart();

  router.push("/shop");
};


  return (
    <div className="max-w-xl mx-auto px-2 py-2">
      <h1 className="text-2xl font-bold mb-2">🧾 Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded resize-none"
        />

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Branch</option>
          {Object.keys(branchPhoneMap).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <div className="space-y-2">
          <label className="font-medium">📸 Optional Image URLs</label>
          {form.images.map((url, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              {form.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-500 hover:underline"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImage}
            className="text-blue-600 text-sm hover:underline"
          >
            ➕ Add Another Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          📨 Submit Order
        </button>
      </form>
    </div>
  );
}
