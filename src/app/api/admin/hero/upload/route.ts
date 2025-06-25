import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma/db";
import path from "path";
import fs from "fs/promises";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false });

  const [fields, files] = await new Promise<any>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  const file = files.image?.[0];
  if (!file || !file.filepath) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  // Create unique filename and set path to /public/uploads/
  const fileExt = path.extname(file.originalFilename || ".png");
const fileName = `${uuidv4()}${fileExt}`;
const destination = path.join(process.cwd(), "public", "uploads", fileName);
const fileBuffer = await fs.readFile(file.filepath);
await fs.mkdir(path.dirname(destination), { recursive: true });
await fs.writeFile(destination, fileBuffer);

const imageUrl = `/uploads/${fileName}`;
const buttonText = fields.buttonText?.[0] || "";
const buttonUrl = fields.buttonUrl?.[0] || "";

// Save to database
await db.heroBanner.create({
  data: {
    imageUrl,
    title: fields.title?.[0] || "",
    subtitle: fields.subtitle?.[0] || "",
    buttonText,
    buttonUrl,
  },
});


  return NextResponse.json({ success: true });
}
