import React from "react";
import Image from "next/image";
import type { FEATURED_ABOUT_QUERY_RESULT } from "@/sanity/types";
import FeaturedImages from "@/components/FeaturedAbout/FeaturedImages";
import SectionPage from "@/components/Section/SectionPage";

type FeaturedAboutProps = {
  data?: FEATURED_ABOUT_QUERY_RESULT;
};

const FeaturedAbout = ({ data }: FeaturedAboutProps) => {
  return (
    <SectionPage>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-122.5">
          <p className="font-heading font-medium text-xl text-tertiary uppercase leading-7.5">
            {data?.aboutSubtitle}
          </p>
          <h2 className="font-heading font-semibold text-6xl text-primary">
            {data?.aboutTitle}
          </h2>
        </div>
        <div className="">
          <p className="font-normal text-lg text-secondary">
            {data?.aboutText}
          </p>
          <div className="flex flex-row items-center gap-4 mt-7">
            {data?.testimonialAvatar?.asset?.url && (
              <Image
                src={data?.testimonialAvatar?.asset?.url || ""}
                alt={data?.authorName || "Weekly Special"}
                width={80}
                height={80}
              />
            )}
            <div className="">
              <h4 className="font-heading font-medium text-3xl text-primary leading-12.5">
                {data?.authorName}
              </h4>
              <p className="font-normal text-base text-primary">
                {data?.position}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <FeaturedImages images={(data?.aboutImages as any[]) ?? []} />
      </div>
    </SectionPage>
  );
};

export default FeaturedAbout;
