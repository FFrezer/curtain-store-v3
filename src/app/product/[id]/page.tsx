import db  from "@/lib/prisma/db";
import NextImage from "next/image"; // Renamed import for clarity
import { notFound } from "next/navigation";
import type { Image as ImageType } from "@prisma/client";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const decodedId = decodeURIComponent(params.id); // ✅ Safe decode

  const product = await db.product.findUnique({
    where: { id: decodedId },
    include: { images: true },
  });

  if (!product) return notFound();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-2">
      {product.price !== null ? `Br ${product.price.toFixed(2)}` : "Contact for price"}</p>
     <p className="mb-6">{product.description}</p>
     <button
     className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mb-6"
     onClick={() => alert(`Added ${product.name} to cart!`)}>
    Add to Cart 🛒
     </button>
      <div className="grid grid-cols-2 gap-4">
        {product.images.map((img: ImageType) => (
          <NextImage
            key={img.id}
            src={img.url}
            alt={`${product.name} image`}
            width={160}
            height={160}
            className="rounded shadow"
          />
        ))}
      </div>
    </main>
  );
}
