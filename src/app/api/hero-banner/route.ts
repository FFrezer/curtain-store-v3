// app/api/hero-banner/route.ts
import db  from "@/lib/prisma/db"; // your Prisma instance
import { NextResponse } from "next/server";

export async function GET() {
  const banner = await db.heroBanner.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(banner);
}
