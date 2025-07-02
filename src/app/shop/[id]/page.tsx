import { notFound } from "next/navigation";
import db from "@/lib/prisma/db";
import ProductDetail from "@/components/ProductDetail";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage( props : ProductPageProps) {
  const { params } = await props;
  const id = params.id;

  const product = await db.product.findUnique({
    where: { id },
    include: { images: true,  variants: true},
  });

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
