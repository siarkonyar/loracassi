import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { UserPartialSchema } from "prisma/generated/zod";
import { hashPassword, verifyPassword } from "~/scripts/utils/hash";
import { signIn } from "~/server/auth";
import { TRPCError } from "@trpc/server";


export const userRouter = createTRPCRouter({
login: publicProcedure
    .input(UserPartialSchema.or(z.null())) // Ensure schema validation
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if user exists
        const user = await ctx.db.user.findUnique({
          where: { email: input?.email ?? "" },
        });

        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          });
        }

        // Ensure email and password are not null
        const email = input?.email ?? "";
        const password = input?.password ?? "";

        if (!email || !password) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email and password must be provided",
          });
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password ?? "");
        if (!isPasswordValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Incorrect password",
          });
        }

        console.log("Attempting signIn with email:", email);

        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        return { success: true };
      } catch (error: unknown) {
        if (error instanceof Error) {
          const message = error.message;
          console.error(message);
        } else {
        console.error("An unknown error occurred.");
    }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),


  register: publicProcedure
    .input(
      UserPartialSchema.or(z.null())
    )
    .mutation(async ({ input, ctx }) => {
      try {

        const user = await ctx.db.user.create({
          data:{
            email: input?.email,
            password: await hashPassword(input?.password ?? ""),
            name: input?.name,
            phoneNumber: input?.phoneNumber,
          }
        })

        return user;
      } catch (error) {
        console.log(error);
      }
    }),

  getCurrentUser: protectedProcedure
    .output(UserPartialSchema.or(z.null()))
    .query(async ({ ctx }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            role: true,
          },
        });

        return user;
      } catch (error) {
        throw new Error(error as string);
      }
    }),
});
