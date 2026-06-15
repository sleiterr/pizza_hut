import React from "react";
import clsx from "clsx";
import Image from "next/image";

type FeaturedImagesProps = {
  images?: Array<{
    image?: {
      asset?: {
        url?: string;
      };
    };
    title?: string;
    _key?: string;
  }>;
};

const FeaturedImages = ({ images = [] }: FeaturedImagesProps) => {
  return (
    <>
      <ul className="grid grid-cols-3 gap-8">
        {images.map((image, idx) => (
          <li key={image._key ?? idx} className={idx === 1 ? "mt-[80px]" : ""}>
            {image.image?.asset?.url && (
              <div
                className={clsx(
                  "flex flex-col justify-end",
                  "relative overflow-visible",
                  "before:content-[''] before:absolute before:inset-4 before:rounded-2xl before:border-4 before:border-border-card before:pointer-events-none",
                )}
              >
                <Image
                  src={image.image.asset.url}
                  alt={image.title || "About Image"}
                  width={415}
                  height={524}
                  className="object-cover object-center w-103.75 h-131 rounded-2xl"
                />
                {/* Title badge floats outside image */}
                <div
                  className={clsx(
                    "absolute left-1/2 bottom-11 translate-y-1/2 -translate-x-1/2 z-20 px-8 py-3 bg-border-card rounded-2xl shadow-xl",
                    "font-heading font-bold text-primary text-3xl text-center w-90",
                  )}
                >
                  {image.title}
                </div>
                {/* Optional: overlay for darkening image */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-2xl" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeaturedImages;
