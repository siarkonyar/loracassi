import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { ProductPartialSchema, ProductSchema } from "prisma/generated/zod";
import { utapi } from "~/server/uploadthing/utils";


export const productRouter = createTRPCRouter({
  getProduct: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .output(ProductSchema.nullable())
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
      try {
        return await ctx.db.product.create({
          data: {
            name: input.name ?? "",
            price: input.price ?? 0,
            stock: input.stock,
            discount: input.discount ?? 0,
            headImage: input.headImage ?? "",
            images: input.images ?? undefined,
            description: input.description ?? "",
            categoryId: input.categoryId,
          }
        });
      } catch (error: unknown) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : "Failed to create product",
        });
      }
    }),

  updateProduct: adminProcedure
    .input(ProductPartialSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.update({
        where: { id: input.id },
        data: input,
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
