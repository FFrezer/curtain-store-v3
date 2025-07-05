import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma/db";
import path from "path";
import fs from "fs/promises";
import formidable, { Fields, Files } from "formidable";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: false });

  const [fields, files]: [Fields, Files] = await new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  const file = Array.isArray(files.image) ? files.image[0] : files.image;

  if (!file || !("filepath" in file)) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const fileExt = path.extname(file.originalFilename || ".png");
  const fileName = `${uuidv4()}${fileExt}`;
  const destination = path.join(process.cwd(), "public", "uploads", fileName);

  const fileBuffer = await fs.readFile(file.filepath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, fileBuffer);

  const imageUrl = `/uploads/${fileName}`;

  const getField = (key: keyof Fields) => {
    const val = fields[key];
    return Array.isArray(val) ? val[0] : val || "";
  };

  await db.heroBanner.create({
    data: {
      imageUrl,
      title: getField("title"),
      subtitle: getField("subtitle"),
      buttonText: getField("buttonText"),
      buttonUrl: getField("buttonUrl"),
    },
  });

  return NextResponse.json({ success: true });
}
