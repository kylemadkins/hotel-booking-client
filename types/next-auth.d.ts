import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: user & {
      roles: string[];
    };
  }
}
