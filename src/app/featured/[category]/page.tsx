// app/featured/[category]/page.tsx
import db from "@/lib/prisma/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Product, Image as ProductImage } from "@prisma/client";

type ProductWithExtras = Product & { images: ProductImage[] };

export default async function FeaturedCategory({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = params.category.replace(/-/g, " ");
  const product: ProductWithExtras | null = await db.product.findFirst({
    where: { category: categoryName },
    include: { images: true },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-4 select-none">
      <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>
      <p className="text-gray-600 mb-6 text-center">{product.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(product.images.length > 0 ? product.images : [{ id: "placeholder", url: "/placeholder.jpg" }]).map((img) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded-xl shadow-xl"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={img.url}
              alt={product.name}
              width={600}
              height={800}
              className="w-full h-auto object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
