'use client';

import { useState } from "react";
import Link from "next/link";
import AdminProductCard from "@/components/AdminProductCard";
import ProductEditModal from "@/components/ProductEditModal";
import { Product, Branch, Image } from "@prisma/client";

// ✅ Define the full type that includes relations
export interface ProductWithExtras extends Product {
  images: Image[];
  branch: Branch;
}

// ✅ Props now expect fully populated product objects
interface AdminProductListProps {
  session: {
    user: {
      name?: string;
      email?: string;
    };
  };
  products: ProductWithExtras[];
}

export default function AdminProductList({ session, products }: AdminProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductWithExtras | null>(null);
  const [productList, setProductList] = useState<ProductWithExtras[]>(products);

  // ✅ Handle update from modal
  const handleProductUpdate = (updatedProduct: ProductWithExtras) => {
    setProductList((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Uploaded Products</h1>
        <div className="text-right">
          <p className="text-sm text-gray-700">
            Logged in as:{" "}
            <strong>{session.user?.name || session.user?.email}</strong>
          </p>
          <form
            method="post"
            action="/api/auth/signout"
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to log out?")) e.preventDefault();
            }}
          >
            <input type="hidden" name="callbackUrl" value="/" />
            <button
              type="submit"
              className="mt-1 text-sm text-red-600 hover:underline"
              aria-label="Log out"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-6 space-x-4">
        <Link href="/admin/upload" className="text-blue-600 underline">
          Upload Product
        </Link>
        <Link href="/admin/products" className="text-blue-600 underline">
          View All Products
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
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
          onUpdated={handleProductUpdate}
        />
      )}
    </div>
  );
}
