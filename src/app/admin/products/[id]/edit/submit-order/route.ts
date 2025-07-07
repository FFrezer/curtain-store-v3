// app/admin/products/[id]/edit/submit/route.ts
import db  from "@/lib/prisma/db";
import { Branch } from "@prisma/client";


export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const branch = formData.get("branch") as string;
  const room = formData.get("room") as string;
  const category = formData.get("category") as string;

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
}