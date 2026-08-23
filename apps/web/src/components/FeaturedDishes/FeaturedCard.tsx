import React from "react";
import clsx from "clsx";
import Image from "next/image";

import CardFeatured from "./CardFeatured";
import AddToCartButton from "./AddToCartButton";

import type { FEATURED_DISHES_QUERY_RESULT } from "@/sanity/types";

type FeaturedCardProps = {
  items: FEATURED_DISHES_QUERY_RESULT;
};

const FeaturedCard = ({ items }: FeaturedCardProps) => {
  return (
    <ul className="mt-4 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((item) => (
        <li key={item._id} className="flex h-full justify-center">
          <CardFeatured>
            <div className="relative flex h-full w-full flex-col justify-between">
              <span
                className={clsx(
                  "absolute -left-8 -top-3 z-10 flex h-17.5 w-17.5 rounded-full bg-discount-price items-center justify-center",
                  "font-heading text-lg font-semibold uppercase leading-none text-black",
                )}
              >
                sale
              </span>
              <div className="relative mt-6 flex h-72.5 items-center justify-center">
                <span className="absolute h-37.25 w-83.25 rounded-full bg-cta-primary-hover" />
                {item.productImage?.asset?.url && (
                  <Image
                    src={item.productImage.asset.url}
                    alt={item.name || "Featured dish"}
                    width={330}
                    height={290}
                    className="relative h-72.5 w-82.5 object-contain"
                  />
                )}
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-col items-start">
                  {item.name && (
                    <h3 className="mt-2  font-heading text-2xl font-semibold text-primary">
                      {item.name}
                    </h3>
                  )}
                  {item.price != null && (
                    <div className="flex items-baseline justify-center gap-2">
                      <span
                        className={clsx(
                          "font-heading text-lg font-bold text-secondary",
                          "line-through decoration-2 decoration-secondary/80",
                        )}
                      >
                        <span className="text-secondary">$</span>
                        {item.price}
                      </span>
                      <span className="font-heading text-3xl font-bold text-secondary">
                        <span className="text-tertiary">$</span>
                        {item.discountPrice != null && item.discountPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 z-10 translate-x-1/2 translate-y-2">
                <AddToCartButton
                  productId={item._id}
                  slug={item.slug ?? ""}
                  name={item.name ?? ""}
                  description={item.description ?? undefined}
                  imageUrl={item.productImage?.asset?.url ?? ""}
                  price={item.price ?? 0}
                  discountPrice={item.discountPrice ?? undefined}
                  rating={item.rating ?? undefined}
                />
              </div>
            </div>
          </CardFeatured>
        </li>
      ))}
    </ul>
  );
};

export default FeaturedCard;
