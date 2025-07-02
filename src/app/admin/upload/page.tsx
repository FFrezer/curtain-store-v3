"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminUploadPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // ← SESSION HOOK
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("MERKATO");
  const [category, setCategory] = useState("Blackout Grommet");
  const [images, setImages] = useState<File[]>([]);
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Protect route: Wait for session, then redirect if not logged in
  useEffect(() => {
    if (status === "loading") return; // Still checking session
    if (!session) {
      router.push("/auth/login?callbackUrl=/admin/upload");
    }
  }, [session, status, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || images.length === 0) {
      alert("Please provide name and at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("branch", branch);
    formData.append("category", category);
    formData.append("featured", String(featured));
    formData.append("description", description);
    formData.append("price", price);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setUploading(true);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Upload successful!");
        router.push(`/shop/${data.product.id}`);
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  if (status === "loading" || !session) {
    return <p className="text-center py-10">Checking admin access...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Upload Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
        />

        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full border p-2">
          <option value="MERKATO">MERKATO</option>
          <option value="PIASSA">PIASSA</option>
          <option value="GERJI">GERJI</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2">
          <option value="Blackout Grommet">Blackout Grommet</option>
          <option value="Gray Linen Curtain">Gray Linen Curtain</option>
          <option value="Patterned Sheer">Patterned Sheer</option>
          <option value="Blue Velvet Curtain">Blue Velvet Curtain</option>
        </select>

        <label className="block">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span className="ml-2">Mark as Featured</span>
        </label>

        <input type="hidden" name="featured" value={featured ? "true" : "false"} />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        <div className="flex flex-wrap gap-2">
          {images.map((file, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(file)}
              alt="Preview"
              width={100}
              height={100}
              className="object-cover border"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Product"}
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
