// types/next-auth.d.ts



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
