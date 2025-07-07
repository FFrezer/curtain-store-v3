// app/admin/products/[id]/edit/page.tsx
import  db  from "@/lib/prisma/db";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Product</h1>
      <form
        action={`/admin/products/${product.id}/edit`}
        method="POST"
        className="space-y-4"
      >
        <input name="id" type="hidden" value={product.id} />

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" defaultValue={product.name} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input name="price" type="number" step="0.01"
  defaultValue={product.price !== null ? product.price : ''}
  className="w-full border px-3 py-2 rounded"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Branch</label>
          <input name="branch" defaultValue={product.branch ?? ''} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Room</label>
          <input name="room" defaultValue={product.room ?? ''} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input name="category" defaultValue={product.category} className="w-full border px-3 py-2 rounded" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
