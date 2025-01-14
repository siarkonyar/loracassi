import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ProductSchema } from "prisma/generated/zod";


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
});
