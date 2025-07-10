// app/admin/products/[id]/edit/submit/route.ts
import db from "@/lib/prisma/db";
import { Branch } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const branch = formData.get("branch") as string;
    const room = formData.get("room") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    if (!id || !name || !priceStr || !branch || !room || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    // Optionally validate branch enum
    if (!Object.values(Branch).includes(branch as Branch)) {
      return NextResponse.json({ error: "Invalid branch value" }, { status: 400 });
    }

    await db.product.update({
      where: { id },
      data: {
        name,
        price,
        branch: branch as Branch,
        room,
        category,
        description,
      },
    });

    // Return a redirect or success message
   return NextResponse.json({ success: true, redirectUrl: `/admin/products/${id}` });

  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
