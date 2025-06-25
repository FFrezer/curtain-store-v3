import db  from "@/lib/prisma/db";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const whereClause =
    category.toLowerCase() === "all"
      ? {}
      : {
          category: {
            contains: category,
            mode: "insensitive",
          },
        };

  const products = await db.product.findMany({
    where: whereClause,
    include: { images: true },
  });

  if (products.length === 0) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{category} Curtains</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
<ProductCard
  key={product.id}
  product={{
    ...product,
    image: product.images[0]?.url ?? null,
    images: product.images,
  }}
/>

))}

      </div>
    </div>
  );
}
