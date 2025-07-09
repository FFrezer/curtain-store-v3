// src/components/ProductEditModal.tsx
'use client';

import { useState } from 'react';
import { ProductWithExtras } from '@/types/ProductWithExtras';

interface ProductEditModalProps {
  product: ProductWithExtras;
  onClose: () => void;
  onUpdated: (updatedProduct: ProductWithExtras) => void;
}

export default function ProductEditModal({
  product,
  onClose,
  onUpdated,
}: ProductEditModalProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState<number | null>(product.price);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    if (res.ok) {
      const updatedProduct = await res.json();
      onUpdated(updatedProduct);
      onClose();
    } else {
      alert('Failed to update product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Edit Product</h2>

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price ?? ""}
            onChange={(e) =>
              setPrice(e.target.value === "" ? null : Number(e.target.value))
            }
            className="w-full border rounded px-2 py-1"
            min={0}
            step={0.01}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
