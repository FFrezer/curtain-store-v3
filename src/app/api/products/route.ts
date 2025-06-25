import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/lib/prisma/db';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const room = searchParams.get("room");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "8");

    const filters: Prisma.ProductWhereInput = {};

    if (room) filters.room = { equals: room };
    if (category) filters.category = { equals: category };

    const totalCount = await db.product.count({ where: filters });

    const products = await db.product.findMany({
      where: filters,
      include: {
        images: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

 const transformed = products.map((product) => ({
  id: product.id,
  name: product.name,
  description: product.description ?? "",
  price: product.price,
  room: product.room ?? "",
  category: product.category,
  branch: product.branch,
  featured: product.featured,
  createdAt: product.createdAt,
  images: product.images.map((img) => ({ url: img.url })), // ✅ match ProductCard props
}));


    return NextResponse.json({
      products: transformed,
      total: totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    console.error("API /products error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
