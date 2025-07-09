import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // update if your alias is different

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
