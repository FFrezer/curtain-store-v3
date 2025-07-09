import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma/db';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
  console.error(error); // log it if needed
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}
}
