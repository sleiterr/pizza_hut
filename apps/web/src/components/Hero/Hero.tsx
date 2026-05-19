import Image from "next/image";
import CtaPrimary from "@/components/Button/CtaPrimary";
import WeeklySpecial from "@/components/Hero/WeeklySpecial";
import { HeroSectionProps } from "@/sanity/types";

export function Hero({ data, weeklySpecial }: HeroSectionProps) {
  const imageUrl = data?.heroImage?.asset?.url;

  return (
    <section className="relative h-177.5 w-full overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      )}
      <div className="absolute z-10 inset-0 flex flex-col justify-center left-[15%]">
        <div className="flex flex-col w-150 max-w-full">
          <h1 className="font-heading font-medium text-6xl text-quaternary">
            {data?.heroTitle}
          </h1>
          <p className="font-body font-normal text-xl text-quaternary mt-4">
            {data?.heroSubtitle}
          </p>
          <div className="relative mt-14">
            <span
              className="absolute border-[3px] border-cta-primary rounded-xl pointer-events-none"
              style={{
                width: "190px",
                height: "70px",
                bottom: "-5px",
                left: "18px",
              }}
            />
            {data?.heroButtonText && (
              <CtaPrimary href={data.heroButtonLink ?? "#"}>
                {data.heroButtonText}
              </CtaPrimary>
            )}
          </div>
        </div>
        <div className="right-52 absolute -bottom-14 transform -translate-y-1/2">
          <WeeklySpecial data={weeklySpecial} />
        </div>
      </div>
    </section>
  );
}
