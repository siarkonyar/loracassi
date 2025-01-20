import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ProductPartialSchema } from "prisma/generated/zod";
import { utapi } from "~/server/uploadthing/utils";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  getProduct: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input, ctx }) => {
      const product = await ctx.db.product.findUniqueOrThrow({
        where: { id: input.id }
      });
      return product;
    }),

  getAllProducts: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.product.findMany();
    }),

  createProduct: adminProcedure
    .input(ProductPartialSchema)
    .mutation(async ({ ctx, input }) => {
      const { ...data } = input;
      try {
        return await ctx.db.product.create({
          data: {
            name: data.name ?? "",
            price: data.price ?? 0,
            headImage: data.headImage ?? "",
            stock: data.stock ?? 0,
            images: data.images ?? [],
            discount: data.discount ?? null,
            description: data.description ?? null,
            categoryId: data.categoryId ?? null,
          },
        });
      } catch (err) {
        const error = err as Error;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message ?? "Failed to create product",
        });
      }
    }),

  updateProduct: adminProcedure
    .input(ProductPartialSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.product.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }),

  deleteProduct: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUniqueOrThrow({
        where: { id: input.id }
      });
      if (product.headImage) {
        await utapi.deleteFiles(product.headImage);
      }
      return ctx.db.product.delete({ where: { id: input.id } });
    }),
});
