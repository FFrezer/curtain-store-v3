// app/admin/products/page.tsx

import db from "@/lib/prisma/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminProductList from "@/components/AdminProductList";


export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login?callbackUrl=/admin/products");
  }

  const products = await db.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return <AdminProductList session={session} products={products} />;
}
