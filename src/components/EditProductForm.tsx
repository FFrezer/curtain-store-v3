// src/components/EditProductForm.tsx
'use client';
import type { ProductWithExtras } from '@/types/product';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductForm({ product }: { product: ProductWithExtras}) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to update product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Product Name</label>
        <input
          className="border px-3 py-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Price</label>
        <input
           className="border px-3 py-2 w-full rounded"
           type="number"
           value={price ?? 0}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
           />

      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
