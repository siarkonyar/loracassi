import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../server/db"
import { verifyPassword } from "~/scripts/utils/hash";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"username" | "password", unknown>> | undefined) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) {
          throw new Error("Email and password are required");
        }

        // Find the user by email
        const user = await prisma.user.findFirst({
          where: { email: username },
        });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        if (!user.password) {
          throw new Error("User has no password set");
        }

        // Validate password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Exclude sensitive fields before returning the user object
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    newUser: "/auth/new-user",
  },
  secret: process.env.AUTH_SECRET,
  session:{
    strategy: "jwt" as const,
  },
  debug: process.env.NODE_ENV !== "production"
} satisfies NextAuthConfig;