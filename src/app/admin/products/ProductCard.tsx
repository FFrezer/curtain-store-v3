'use client'

import { ProductWithExtras } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: ProductWithExtras; // Replace `any` with your Product type if available
  onEdit?: () => void; // Optional prop
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md relative">
      <div className="absolute top-2 right-2 space-x-2">
        <Link
          href={`/admin/products/edit/${product.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          🗑 Delete
        </button>
      </div>

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-1">💰 ${product.price}</p>
      <p className="text-sm text-gray-500 mb-1">🏢 Branch: {product.branch}</p>
      <p className="text-sm text-gray-500 mb-1">🛏️ Room: {product.room}</p>
      <p className="text-sm text-gray-500 mb-2">📁 Category: {product.category}</p>

      <div className="flex gap-2 overflow-x-auto">
        {product.images.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt={product.name}
            width={100}
            height={100}
            className="rounded object-cover"
          />
        ))}
      </div>
    </div>
  );
}
