import Image from "next/image";
import CtaPrimary from "@/components/Button/CtaPrimary";

export function HeroSection({ data }: HeroSectionProps) {
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
          <div className="relative inline-block mt-14">
            {data?.heroButtonText && (
              <CtaPrimary href={data.heroButtonLink ?? "#"}>
                {data.heroButtonText}
              </CtaPrimary>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroSectionProps = {
  data: {
    heroTitle?: string | null;
    heroSubtitle?: string | null;
    heroButtonText?: string | null;
    heroButtonLink?: string | null;
    heroImage?: { asset?: { url?: string | null } | null } | null;
  } | null;
};
