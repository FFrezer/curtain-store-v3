import db from "@/lib/prisma/db";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);


  // Protect route
  if (!session) {
    redirect("/auth/login?callbackUrl=/admin/products");
  }

  const products = await db.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      {/* Header with user info and logout */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Uploaded Products</h1>
        <div className="text-right">
          <p className="text-sm text-gray-700">
            Logged in as: <strong>{session.user?.name || session.user?.email}</strong>
          </p>
          <form method="post" action="/api/auth/signout">
            <input type="hidden" name="callbackUrl" value="/" />
            <button
              type="submit"
              className="mt-1 text-sm text-red-600 hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Navigation links */}
      <div className="mb-6 space-x-4">
        <Link href="/admin/upload" className="text-blue-600 underline">
          Upload Product
        </Link>
        <Link href="/admin/products" className="text-blue-600 underline">
          View All Products
        </Link>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
