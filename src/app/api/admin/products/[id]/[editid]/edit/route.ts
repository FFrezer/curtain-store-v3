// app/api/admin/products/[id]/edit/route.ts
import  db  from "@/lib/prisma/db";
import { NextResponse } from "next/server";
import { Branch } from "@prisma/client"; //

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const formData = await req.formData();

  const id = params.id;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const branch = formData.get("branch") as string;
  const room = formData.get("room") as string;
  const category = formData.get("category") as string;

  if (!name || isNaN(price) || !branch || !room || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await db.product.update({
    where: { id },
    data: {
      name,
      price,
      branch: branch as Branch,
      room,
      category,
    },
  });

  return NextResponse.redirect(new URL("/admin/products", req.url));
}
