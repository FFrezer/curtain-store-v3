import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; //
  Description: string | null;
};
export async function POST(req: Request) {
  const data = await req.json();

  const { name, phone, address, cartItems, total } = data;

  const orderText = `
🧾 ADE Curtain Store - New Order

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}

🛒 Items:
${cartItems
  .map((item: CartItem) =>
    `• ${item.name} x${item.quantity} - Br ${item.price * item.quantity}`
  )
  .join("\n")}


💰 Total: Br ${total}
`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_RECEIVER, // your email (where orders go)
      subject: "🧾 New Curtain Order - ADE Store",
      text: orderText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ success: false, error });
  }
}
