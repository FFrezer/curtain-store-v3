// app/room/[room]/page.tsx
import db from '@/lib/prisma/db';
import ProductCard from '@/components/AdminProductCard';
import { notFound } from 'next/navigation';

interface RoomPageProps {
  params: { room: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const {room} = params;

  const products = await db.product.findMany({
    where: { room },
    include: {
      images: {
        select: {
          id: true,
          createdAt: true,
          productId: true,
          url: true,
        },
      },
    },
  });

  if (products.length === 0) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Curtains for {room}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
