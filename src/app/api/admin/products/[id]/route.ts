import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import db from "@/lib/prisma/db";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = params.id;

    // Optional: check if product exists
    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete related images first
    await db.productImage.deleteMany({
      where: { productId: id },
    });

    // Then delete the product
    await db.product.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error: unknown) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
      console.error("Error deleting product:", message, error);
    } else {
      console.error("Unknown error deleting product:", error);
    }

    return NextResponse.json(
      {
        error: "Failed to delete product",
        detail: message,
      },
      { status: 500 }
    );
  }
}
