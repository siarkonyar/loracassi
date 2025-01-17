import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CategoryPartialSchema } from "prisma/generated/zod";

export const categoryRouter = createTRPCRouter({
  getCategory: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ input, ctx }) => {
      return ctx.db.category.findUniqueOrThrow({
        where: { id: input.id }
      });
    }),

  getAllCategories: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.category.findMany();
    }),

  createCategory: adminProcedure
    .input(CategoryPartialSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.category.create({
          data: {
            name: input.name ?? "",
          }
        });
      } catch (error: unknown) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : "Failed to create category",
        });
      }
    }),

  deleteCategory: adminProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({ where: { id: input.id } });
    }),

  updateCategory: adminProcedure
    .input(CategoryPartialSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.update({
        where: { id: input.id },
        data: input,
      });
    }),
});
