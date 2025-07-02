// src/app/api/admin/products/[id]/route.ts

import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
