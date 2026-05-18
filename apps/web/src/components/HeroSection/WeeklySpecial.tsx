import React from "react";
import clsx from "clsx";
import Image from "next/image";
import WeeklyCard from "@/components/HeroSection/WeeklyCard";
import Rating from "@/components/HeroSection/Rating";
import { ProductType } from "@/sanity/types";

type WeeklySpecialProps = {
  data?: ProductType | null;
};

const WeeklySpecial = ({ data }: WeeklySpecialProps) => {
  return (
    <WeeklyCard>
      <div className="flex items-center justify-between h-full">
        <div className="flex flex-col items-start justify-start gap-1">
          {data?.price && (
            <span
              className={clsx(
                "flex items-center",
                "font-bold font-heading text-quaternary text-3xl",
              )}
            >
              <span className="text-tertiary">$</span>
              {data.price}
            </span>
          )}
          {data?.name && (
            <h4 className="font-semibold font-heading text-quaternary text-xl">
              {data.name}
            </h4>
          )}
          <Rating rating={data?.rating} />
        </div>
        <div className="flex items-center justify-center">
          {data?.productImage?.asset?.url && (
            <Image
              src={data?.productImage?.asset?.url || ""}
              alt={data?.name || "Weekly Special"}
              width={150}
              height={150}
            />
          )}
        </div>
      </div>
    </WeeklyCard>
  );
};

export default WeeklySpecial;
