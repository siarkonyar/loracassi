import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { UserPartialSchema } from "prisma/generated/zod";
import { hashPassword } from "~/scripts/utils/hash";


export const userRouter = createTRPCRouter({
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
