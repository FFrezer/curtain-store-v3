// src/app/api/submit-order/route.ts
import { db } from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, address, cart, total } = body;
    console.log("📦 Order body received:", body);
    console.log("🛒 cart:", cart);
console.log("🧾 total:", total);
console.log("👤 name:", name, "📧 email:", email, "🏠 address:", address);


    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = await db.order.create({
      data: {
        name,
        email,
        address,
        total,
        items: {
          create: cart.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            image: item.image,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Order placed", orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("❌ Order Error:", error); // <== this helps us debug
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
