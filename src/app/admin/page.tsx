import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // ⛔️ If not logged in or not an admin, redirect
  if (!session?.user || session.user.role !== "admin") {
    redirect("/unauthorized"); // Or show a 403 page
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Admin content here */}
    </div>
  );
}
