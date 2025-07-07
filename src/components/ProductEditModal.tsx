// src/components/ProductEditModal.tsx
'use client';

import { useState } from 'react';
import { ProductWithExtras } from '@/types/ProductWithExtras';


// Define the shape of a product

// Define props for the modal
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
  const [price, setPrice] = useState(product.price);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    if (res.ok) {
  const updatedProduct = await res.json(); // Assuming your API returns the updated product
  onUpdated(updatedProduct); // ✅ pass the updated product
  onClose();
}
 else {
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
          <label>Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
  type="number"
  value={price ?? ""}  // Use empty string if price is null
  onChange={(e) => setPrice(e.target.value === "" ? null : Number(e.target.value))}
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
