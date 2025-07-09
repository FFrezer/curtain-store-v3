// src/app/admin/products/[id]/edit/page.tsx

//import { notFound } from "next/navigation";
//import db from "@/lib/prisma/db";
//import { Metadata } from "next";

// ✅ This works perfectly without any type confusion
//export async function generateMetadata(
  //{ params }: { params: { id: string } }
//): Promise<Metadata> {
  //const product = await db.product.findUnique({ where: { id: params.id } });

  //return {
   // title: product?.name ? `Edit ${product.name}` : "Edit Product",
  //};
//}

// ✅ Still use a shared interface here if you like
//interface EditProductPageProps {
  //params: { id: string };
//}

//export default async function EditProductPage({ params }: EditProductPageProps) {
  //const product = await db.product.findUnique({
    //where: { id: params.id },
  //});

  //if (!product) return notFound();
  //return (
    //<div className="max-w-xl mx-auto p-6">
      //<h1 className="text-2xl font-bold mb-4">✏️ Edit Product</h1>
      //<form
        //action={`/admin/products/${product.id}/edit/submit`}
        //method="POST"
        //className="space-y-4"
      //>
        //<input name="id" type="hidden" value={product.id} />
        //<div>
          //<label className="block text-sm font-medium">Name</label>
          //<input
            //name="name"
            //defaultValue={product.name}
            //className="w-full border px-3 py-2 rounded"
          ///>
        //</div>
        //<div>
          //<label className="block text-sm font-medium">Price</label>
          //<input
            //name="price"
            //type="number"
            //step="0.01"
            //defaultValue={product.price ?? ""}
            //className="w-full border px-3 py-2 rounded"
          ///>
        //</div>
        //<div>
          //<label className="block text-sm font-medium">Branch</label>
          //<input
            //name="branch"
            //defaultValue={product.branch}
            //className="w-full border px-3 py-2 rounded"
          ///>
        //</div>
        //</div>
          //<label className="block text-sm font-medium">Room</label>
          //<input
            //name="room"
            //defaultValue={product.room}
            //className="w-full border px-3 py-2 rounded"
          ///>
        //</div>
        //<div>
          //<label className="block text-sm font-medium">Category</label>
          //<input
            //name="category"
            //defaultValue={product.category}
            //className="w-full border px-3 py-2 rounded"
         // />
        //</div>
        //<button
          //type="submit"
          //className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        //>
          //Save Changes
        //</button>
     // </form>
    //</div>
  //);
//}
export default function Placeholder() {
  return <div className="p-6 text-center text-gray-500">Edit page is temporarily disabled.</div>;
}
