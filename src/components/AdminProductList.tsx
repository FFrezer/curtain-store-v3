'use client';

import { useState } from "react";
import AdminProductCard from "@/components/AdminProductCard"; // ✅ use renamed one
import ProductEditModal from "@/components/ProductEditModal";

export default function AdminProductList({ session, products }: any) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Uploaded Products</h1>
        <div className="text-right">
          <p className="text-sm text-gray-700">
            Logged in as: <strong>{session.user?.name || session.user?.email}</strong>
          </p>
          <form method="post" action="/api/auth/signout">
            <input type="hidden" name="callbackUrl" value="/" />
            <button
              type="submit"
              className="mt-1 text-sm text-red-600 hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Nav links */}
      <div className="mb-6 space-x-4">
        <a href="/admin/upload" className="text-blue-600 underline">Upload Product</a>
        <a href="/admin/products" className="text-blue-600 underline">View All Products</a>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={() => window.location.reload()}
        />
      )}
    </div>
  );
}
