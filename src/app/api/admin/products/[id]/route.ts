// app/api/admin/products/[id]/route.ts
import  db  from "@/lib/prisma/db";
import { NextResponse } from "next/server";

// OPTIONAL: use your actual auth logic here
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Example: mock admin check
  const isAdmin = true; // replace with real auth check
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    // Delete related images first
    await db.image.deleteMany({ where: { productId: id } });

    // Then delete the product
    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
