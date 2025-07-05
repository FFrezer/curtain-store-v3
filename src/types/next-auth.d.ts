// types/next-auth.d.ts

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: "admin" | "user"; // extend this as needed
    };
  }

  interface User {
    role?: "admin" | "user";
  }
}


declare module "next-auth/jwt" {
  interface JWT {
     role?: "admin" | "user";
  }
}
