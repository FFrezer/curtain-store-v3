// app/api/admin/products/[id]/route.ts
import db  from "@/lib/prisma/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Delete related images first
    await db.image.deleteMany({
      where: {
        productId: id,
      },
    });

    // Then delete the product
    await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
