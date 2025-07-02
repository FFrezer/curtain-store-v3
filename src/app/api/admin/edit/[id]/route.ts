// src/app/api/admin/products/edit/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/prisma/db';

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await request.json();

  try {
    const updated = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        price: parseFloat(body.price),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Edit Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
