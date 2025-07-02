import { NextResponse } from 'next/server';
import db from '@/lib/prisma/db';
import type { ProductWithExtras } from '@/types/product';

export async function GET() {
  try {
    // Fetch products including images (typed as ProductWithExtras[])
    const products: ProductWithExtras[] = await db.product.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      include: { images: true,
                variants: true,},

      
    });

    // You can decide if you want to return full products with images, or a transformed lighter version
    // For example, returning the full product with images:
    return NextResponse.json({ products });

    // OR if you want a light version for frontend use (like your original):
    /*
    const transformed = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0]?.url ?? null,
    }));

    return NextResponse.json({ products: transformed });
    */
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
