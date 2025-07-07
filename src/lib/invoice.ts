import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { OrderType } from "@/types"; // adjust to your order type

export async function generateInvoicePDF(order: OrderType) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const {  height } = page.getSize();

  let y = height - 50;

  const draw = (text: string, deltaY: number = 20) => {
    page.drawText(text, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
    y -= deltaY;
  };

  draw(`🧾 Invoice for ${order.name}`);
  draw(`Email: ${order.email}`);
  draw(`Address: ${order.address}`);
  draw(`Branch: ${order.delivery}`);
  draw(`Date: ${new Date(order.createdAt).toLocaleString()}`);
  draw(`Total: ${order.total} ETB`);
  draw(` `);
  draw(`Items:`);
  order.items.forEach((item) => {
    draw(`• ${item.name} x${item.quantity} = ${item.price} ETB`);
  });

  return await pdfDoc.save();
}
