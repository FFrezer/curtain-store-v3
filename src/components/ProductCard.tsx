import { Product, Image as ProductImage } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import ProductDetail from "./ProductDetail";

interface ProductWithExtras extends Product {
  images: ProductImage[]; // images array required
}

interface ProductCardProps {
  product: ProductWithExtras;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const handleAddToCart = () => {
    const cart = [...cartItems];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
      toast.success(`Increased quantity of ${product.name}`);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url ?? "/placeholder.jpg",
        quantity: 1,
      });
      toast.success(`${product.name} added to cart`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart);
    window.dispatchEvent(new Event("storage"));
  };

  // Choose first image or fallback placeholder
  const previewImage = product.images?.[0]?.url ?? "/placeholder.jpg";

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      <Image
        src={previewImage}
        alt={product.name}
        width={400}
        height={300}
        className="object-cover w-full h-60 rounded"
      />
      <div className="mt-3">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-700">ETB {product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
