import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Deleted entity ${id}`,
    });
  } catch (error) {
    console.error("Delete error:", error); // ✅ this avoids the ESLint unused var error
    return NextResponse.json(
      {
        success: false,
        message: "Entity not found or deletion failed",
      },
      { status: 404 }
    );
  }
}
