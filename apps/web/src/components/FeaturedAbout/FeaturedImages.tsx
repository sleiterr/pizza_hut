import React from "react";
import clsx from "clsx";
import Image from "next/image";

import type { AboutImageType } from "@/sanity/types";

type FeaturedImagesProps = {
  idx?: number;
  key?: string;
  images?: AboutImageType[];
};

const FeaturedImages = ({ images = [] }: FeaturedImagesProps) => {
  return (
    <>
      <ul className="flex items-center gap-8">
        {images.map((image, idx) => (
          <li key={image._key || idx}>
            {image.image?.asset?.url && (
              <div
                className={clsx(
                  "flex flex-col justify-end",
                  "relative rounded-2xl overflow-visible",
                  "before:content-[''] before:absolute before:inset-2 before:rounded-2xl before:border-4 before:border-border-card before:pointer-events-none",
                )}
              >
                <Image
                  src={image.image.asset.url}
                  alt={image.title || "About Image"}
                  width={415}
                  height={524}
                  className="object-cover object-center w-[415px] h-[524px] block"
                />
                {/* Title badge floats outside image */}
                <div
                  className={clsx(
                    "absolute left-1/2 bottom-9 translate-y-1/2 -translate-x-1/2 z-20 px-8 py-3 bg-border-card rounded-2xl shadow-xl",
                    "font-heading font-bold text-primary text-3xl text-center w-[372px]",
                  )}
                >
                  {image.title}
                </div>
                {/* Optional: overlay for darkening image */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeaturedImages;
