import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, Admin 👑</h1>
      {/* Admin content here */}
    </div>
  );
}
