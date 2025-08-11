// src/app/admin/products/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import db from "@/lib/prisma/db";
import EditProductForm from "@/components/EditProductForm";
import prisma from "@/lib/prisma/db";

type EditProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((p) => ({ id: p.id }));
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { images: true, variants: true },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
