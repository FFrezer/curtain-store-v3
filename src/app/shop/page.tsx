'use client';

import { useEffect, useState } from 'react';
import ProductCard from "@/components/ProductCard";
import Link from 'next/link';
import useDebounce from '@/hooks/useDebounce';
import { CATEGORIES } from '@/constants/categories';
import type { Product as PrismaProduct, Image as ProductImage } from '@prisma/client';

type ProductWithExtras = PrismaProduct & {
  images: ProductImage[];
};

type Product = {
  id: string;
  name: string;
  price: number | null;
  category: string;
  room?: string;
  featured?: boolean;
  images: { url: string }[]; // ✅ match ProductImage structure
};


export default function ShopPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<ProductWithExtras[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithExtras[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [roomFilter, setRoomFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
   const fetchProducts = async () => {
  setLoading(true);
  try {
    const res = await fetch(`/api/products?page=${page}&pageSize=12${roomFilter ? `&room=${roomFilter}` : ''}`);
    const data = await res.json();
    // Optional safety check / transform:
    const prods: ProductWithExtras[] = Array.isArray(data.products)
      ? data.products.map((p: any) => ({
          ...p,
          images: Array.isArray(p.images) ? p.images : [],
        }))
      : [];
    setProducts(prods);
  } catch (err) {
    console.error('Failed to fetch products', err);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

    fetchProducts();
  }, [roomFilter, page, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const fetchFeatured = async () => {
  try {
    const res = await fetch(`/api/products/featured`);
    const data = await res.json();
    const prods: ProductWithExtras[] = data.products?.map((p: any) => ({
      ...p,
      images: Array.isArray(p.images) ? p.images : [],
    })) || [];
    setFeaturedProducts(prods);
  } catch (err) {
    console.error('Failed to fetch featured products', err);
  }
};

    fetchFeatured();
  }, [isMounted]);

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isMounted) return null;

  return (
    <div className="p-0">
      <div className="mb-2">
        <label className="block mb-1 font-medium">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full md:w-64"
        >
          <option value="All">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['Bedroom', 'Livingroom', 'Kidsroom', 'Office'].map((room) => (
          <button
            key={room}
            onClick={() => setRoomFilter(room)}
            className={`px-3 py-1 rounded-full border ${roomFilter === room ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            {room}
          </button>
        ))}
        {roomFilter && (
          <button
            onClick={() => setRoomFilter('')}
            className="px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300"
          >
            Clear Room Filter
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border mb-6 rounded"
      />

      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🌟 Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="block">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="block">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${page}`}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
