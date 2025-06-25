'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadHeroBanner() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("buttonText", buttonText);
    formData.append("buttonUrl", buttonUrl);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("/api/admin/hero/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to upload hero banner.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Upload Hero Banner</h1>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2" />
      <input type="text" placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full border p-2" />
      <input type="text" placeholder="Button Text" value={buttonText} onChange={e => setButtonText(e.target.value)} className="w-full border p-2" />
      <input type="text" placeholder="Button URL" value={buttonUrl} onChange={e => setButtonUrl(e.target.value)} className="w-full border p-2" />
      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full border p-2" />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Upload</button>
    </form>
  );
}
