import React from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import BuyNowButton from "../buttons/BuyNowButton";
import AddToCartButton from "../buttons/AddToCartButton";

export default function HomePage({ productId }: { productId: string }) {
  const { data: product } = api.product.getProduct.useQuery({
    id: productId,
  });

  if (!product) return null;

  return (
    <>
      <div className="lc-product-card flex w-full flex-col overflow-hidden rounded-xl">
        <div className="relative aspect-[1] w-full">
          <Image
            src={product.headImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        </div>
        <div className="bg-[#E8E1D6] px-6 py-3">
          <h3 className="mb-6 font-bold">{product.name}</h3>
          <p className="price-green mb-2 font-bold">{product.price} USD</p>
          <div className="flex justify-between">
            <BuyNowButton />
            <AddToCartButton />
          </div>
        </div>
      </div>
    </>
  );
}
