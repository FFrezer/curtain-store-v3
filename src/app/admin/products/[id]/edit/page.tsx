// src/app/admin/products/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import db from "@/lib/prisma/db";
import { Metadata } from "next";
import EditProductForm from "@/components/EditProductForm";

// Don't define PageProps — just use plain object
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { id: true } });
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { id: params.id } });
  return { title: product?.name ? `Edit ${product.name}` : "Edit Product" };
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: {
      images: true,
      variants: true,
    },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
