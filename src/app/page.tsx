"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import type { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?page=1&pageSize=8`);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products ?? []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const rooms = [
    { name: "Living Room", key: "living", image: "/images/livingroom.jpg" },
    { name: "Bed Room", key: "bed", image: "/images/bedroom.jpg" },
    { name: "Kids Room", key: "kids", image: "/images/kidsroom.jpg" },
    { name: "Office", key: "office", image: "/images/officeroom.jpg" },
  ];

  return (
    <>
      <main className="flex flex-col w-full overflow-y-auto bg-[#f9f6f1] text-[#3d3934]">
        {/* Hero Section */}
        <section className="w-scrren px-0 py-0 flex justify-center items-center">
          <div className="relative max-0 w-screen rounded-lg overflow-hidden shadow-sm">
            <img
              src="/blackout.png"
              alt="Curtains"
              className="w-screen h-[320px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center bg-black/30">
              <div className="text-white px-10 md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold leading-snug mb-6">
                  Transform Your Space<br />
                  with the Perfect<br />
                  Curtains
                </h1>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop">
                    <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                      Shop Now
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
                      Get Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Room */}
        <section className="w-full px-6 py-1">
          <h2 className="text-2xl font-serif font-semibold text-center mb-5">Shop by Room</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <Link key={room.key} href={`/shop?room=${room.key}`}>
                <div className="cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src={room.image} alt={room.name} className="w-full h-[200px] object-cover" />
                  <div className="text-center py-1 font-medium">{room.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full px-6 py-1">
          <h2 className="text-2xl font-bold text-center mb-5">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition text-center">
              <div className="text-4xl mb-4">🧑💼</div>
              <h3 className="text-xl font-semibold mb-2">Custom Consultation</h3>
              <p className="text-gray-700">
                Personalized advice for your window treatment needs from our experienced team.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Curtain Installation</h3>
              <p className="text-gray-700">
                Professional installation to ensure a flawless and secure fit.
              </p>
            </div>
            <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition text-center">
              <div className="text-4xl mb-4">🧵</div>
              <h3 className="text-xl font-semibold mb-2">Fabric Matching</h3>
              <p className="text-gray-700">
                Expert help selecting the perfect fabric to suit your space and style.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
       <section className="w-full px-6 py-1">
  <h2 className="text-2xl font-serif font-semibold text-center mb-5">
    Featured Products
  </h2>

  {loading ? (
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
      <Spinner />
    </div>
  ) : (
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
      {products
        .filter((product) => product.featured) // ✅ correct property name
        .slice(0, 4)
        .map((product) => (
          <div key={product.id} className="p-2">
            <Link href={`/shop/${product.id}`} className="block">
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
    </div>
  )}
</section>


      </main>
    </>
  );
}
