import React from "react";
import Image from "next/image";

import type { FEATURED_DISHES_QUERY_RESULT } from "@/sanity/types";

type FeaturedCardProps = {
  items: FEATURED_DISHES_QUERY_RESULT;
};

const FeaturedCard = ({ items }: FeaturedCardProps) => {
  return (
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((item) => (
        <article
          key={item._id}
          className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="flex h-full flex-col p-6">
            {item.productImage?.asset?.url && (
              <div className="mt-6 flex flex-1 items-center justify-center">
                <Image
                  src={item.productImage.asset.url}
                  alt={item.name || "Featured dish"}
                  width={240}
                  height={240}
                  className="h-auto w-full max-w-60 object-contain"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                {item.name && (
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-primary">
                    {item.name}
                  </h3>
                )}
                {item.price != null && (
                  <span className="font-heading text-3xl font-bold text-primary">
                    <span className="text-tertiary">$</span>
                    {item.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FeaturedCard;
