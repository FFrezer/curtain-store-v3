// src/app/admin/products/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import db from "@/lib/prisma/db";
import { Metadata } from "next";
import EditProductForm from '@/components/EditProductForm';

type PageProps = {
  params: { id: string }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { id: params.id } });
  return {
    title: product?.name ? `Edit ${product.name}` : "Edit Product",
  };
}

export default async function EditProductPage({ params }: PageProps) {
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
