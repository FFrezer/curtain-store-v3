// src/app/api/delete/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/db"; // adjust this path to your prisma client

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    // Example: delete an entity by id
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: `Deleted entity ${id}` });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Entity not found or deletion failed" },
      { status: 404 }
    );
  }
}
