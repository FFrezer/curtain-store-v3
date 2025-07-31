import { notFound } from "next/navigation";
import db from "@/lib/prisma/db";
import ProductDetail from "@/components/ProductDetail";


export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: true,
      variants: true
    }
  });

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
