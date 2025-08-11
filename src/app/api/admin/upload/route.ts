// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/prisma/db";
import { Branch } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust path to your authOptions

export async function POST(req: NextRequest) {
  try {
    // ✅ 1. Auth check: either NextAuth session with admin role OR ADMIN_SECRET header
    const session = await getServerSession(authOptions);
    const adminSecret = process.env.ADMIN_SECRET;
    const incomingSecret = req.headers.get("x-admin-secret");

    const isAdminSession = session && session.user?.role === "admin";
    const isAdminSecret = adminSecret && incomingSecret === adminSecret;

    if (!isAdminSession && !isAdminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2. Parse multipart form data
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const branch = (formData.get("branch")?.toString() as Branch) || Branch.MERKATO;
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const featured = formData.get("featured") === "true";
    const room = formData.get("room")?.toString() || "General";

    // ✅ 3. Validate required fields
    const imageEntries = formData.getAll("images") as File[];
    if (!name || !category || imageEntries.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ 4. Validate and save files
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const mimeToExt: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    const imageUrls: string[] = [];

    for (const file of imageEntries) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }
      if (file.size > maxSize) {
        return NextResponse.json({ error: "File too large (max 2MB)" }, { status: 400 });
      }

      let ext = path.extname(file.name);
      if (!ext) {
        ext = mimeToExt[file.type] || ".jpg";
      }

      const fileName = `${uuidv4()}${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), buffer);
      imageUrls.push(`/uploads/${fileName}`);
    }

    // ✅ 5. Save product to DB
    const product = await db.product.create({
      data: {
        name,
        category,
        branch,
        room,
        description,
        price,
        featured,
        image: imageUrls[0],
        images: {
          createMany: {
            data: imageUrls.map((url) => ({ url })),
          },
        },
      },
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
