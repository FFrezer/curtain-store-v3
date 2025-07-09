import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // or wherever it's defined

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; // ✅ Add this line to fix the import error
