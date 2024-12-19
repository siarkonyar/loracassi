import { handlers } from "~/server/auth";
import NextAuth from "next-auth"
import prisma from "../../../../server/db"
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { adapter } from "next/dist/server/web/adapter";
import { debug } from "console";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"username" | "password", unknown>> | undefined) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find the user by email
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        })

        if (!user) {
          throw new Error("No user found with the provided email");
        }
        console.log(user)
        /* // Validate the provided password against the stored hashed password
        const isPasswordValid = validatePassword(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        } */

        // Exclude sensitive fields before returning the user object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }

    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session:{
    strategy: "jwt" as const,
    jwt: {
      encryption: true,
    },
  },
  debug: process.env.NODE_ENV !== "production"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}

function validatePassword(password: object, password1: string) {
  throw new Error("Function not implemented.");
}
