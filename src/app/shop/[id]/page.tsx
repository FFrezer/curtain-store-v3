import { notFound } from "next/navigation";
import db  from "@/lib/prisma/db";
import ProductDetail from '@/components/ProductDetail';
import Image from "next/image";



interface ProductPageProps {
  params: { locale: string; id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
   const id = decodeURIComponent(params.id);
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: true,
      
    }
  });

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
