// src/lib/getFeaturedProducts.ts
import  db  from "@/lib/prisma/db";

export async function getFeaturedProducts() {
  return await db.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}
