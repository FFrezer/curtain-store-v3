"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import type { ProductWithExtras } from "@/types/product";
import Link from "next/link";


const images = ["/livingroom.png", "/store.png", "/blackout.png"];

export default function Home() {
  const [products, setProducts] = useState<ProductWithExtras[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?page=1&pageSize=8`);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data = await res.json();
        console.log("Fetched products:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
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
     <section className="w-full flex justify-center items-center">
  <div className="relative w-full h-[400px] sm:h-[450px] md:h-[350px] overflow-hidden">
    {images.map((img, i) => (
      <img
        key={i}
        src={img}
        alt={`Slide ${i}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          index === i ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
    <div className="absolute inset-0 flex items-center bg-black/30">
      <div className="text-white px-6 sm:px-10 md:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold leading-snug mb-4 sm:mb-6">
          Transform Your Space<br />
          with the Perfect<br />
          Curtains
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/shop">
            <button className="w-full sm:w-auto px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </Link>
          <Link href="/contact">
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
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
<section className="w-full px-6 py-1 bg-gray-50">
  <h2 className="text-3xl md:text-2xl font-bold text-center mb-5">Our Services</h2>
  <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    <div className="flex flex-col items-center p-6 border rounded-2xl shadow hover:shadow-xl transition-all duration-300 bg-white text-center">
      <div className="text-5xl mb-4">🧑💼</div>
      <h3 className="text-xl font-semibold mb-2">Custom Consultation</h3>
      <p className="text-gray-700">
        Personalized advice for your window treatment needs from our experienced team.
      </p>
    </div>
    <div className="flex flex-col items-center p-6 border rounded-2xl shadow hover:shadow-xl transition-all duration-300 bg-white text-center">
      <div className="text-5xl mb-4">🔧</div>
      <h3 className="text-xl font-semibold mb-2">Curtain Installation</h3>
      <p className="text-gray-700">
        Professional installation to ensure a flawless and secure fit.
      </p>
    </div>
    <div className="flex flex-col items-center p-6 border rounded-2xl shadow hover:shadow-xl transition-all duration-300 bg-white text-center">
      <div className="text-5xl mb-4">🧵</div>
      <h3 className="text-xl font-semibold mb-2">Fabric Matching</h3>
      <p className="text-gray-700">
        Expert help selecting the perfect fabric to suit your space and style.
      </p>
    </div>
  </div>
</section>


        {/* Featured Products */}
        <section className="w-full px-6 py-1">
          <h2 className="text-2xl font-serif font-semibold text-center mb-3">
            Featured Products
          </h2>

          {loading ? (
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
              <Spinner />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
              {products
                .filter((product) => product.featured) // product.featured must exist on ProductWithExtras
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
