"use client";

import { useEffect, useState } from "react";
import { Product, ProductImage, Variant } from "@prisma/client";
import ProductCard from "@/components/ProductCard";


type ProductWithImages = Product & { images: ProductImage[]; variants: Variant[]; };
export default function ShopClient() {
  const [search, setSearch] = useState("");
 const [products, setProducts] = useState<ProductWithImages[]>([]);
 const [filteredProducts, setFilteredProducts] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err: any) {
        console.error(err);
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lower = search.toLowerCase();
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(lower) ||
          product.category.toLowerCase().includes(lower) ||
          product.room?.toLowerCase().includes(lower)
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, products]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (fetchError) return <p className="text-red-500 text-center p-6">Error: {fetchError}</p>;

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
