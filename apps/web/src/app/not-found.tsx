import Link from "next/link";
import clsx from "clsx";
import { ArrowIcon } from "../components/icons/ArrowIcon";
import { BurgerIllustration } from "../components/icons/BurgerIllustration";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link>;

// Page content for the not found page
const pageContent = [
  {
    id: 1,
    title: " Oops! This page",
    caption: " got eaten.",
    text: "The page you’re looking for has disappeared from the menu. Let’s get you back to something delicious.",
    titleClass:
      "font-heading font-semibold text-[clamp(52px,7vw,96px)] leading-[0.94] tracking-[-3px]",
    captionClass: "relative mt-2 block w-fit text-tertiary",
    textClass:
      "mt-10 max-w-135 text-[16px] leading-7 text-octonary md:text-[18px]",
  },
];

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F8FD] text-[#151515]">
      <div className="pointer-events-none absolute -left-16 top-32 h-48 w-48 rounded-full border-28 border-[#ffd40d]/30" />
      <div className="pointer-events-none absolute -right-20 bottom-14 h-56 w-56 rounded-full bg-[#f3274c]/10" />
      <div className="pointer-events-none absolute right-[9%] top-32 hidden h-5 w-5 rotate-12 rounded-[5px] bg-[#f3274c] lg:block" />
      <div className="pointer-events-none absolute bottom-[14%] left-[8%] hidden h-4 w-16 -rotate-12 rounded-full bg-[#ffd40d] lg:block" />

      <section className="relative z-1 mx-auto grid min-h-[70vh] max-w-332.5 items-center gap-2 px-5 py-12 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-16 lg:py-16">
        <div className="relative z-10 max-w-167.5">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_8px_30px_rgba(20,20,20,0.06)]">
            <span className="h-2 w-2 rounded-full bg-[#f3274c]" />
            <span className="font-oswald font-semibold text-[13px] uppercase tracking-[2px] text-tertiary">
              Error 404
            </span>
          </div>
          {/* Page content for the not found page */}
          <PageItem />
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
            <ButtonLink
              href="/"
              className="gap-3 bg-cta-primary text-[17px] text-white transition-all hover:-translate-y-1 hover:bg-cta-primary-hover hover:shadow-[0_9px_0_#151515] active:translate-y-0 active:shadow-none"
            >
              <ArrowIcon />
              Back to home
            </ButtonLink>
            <ButtonLink
              href="/#shop"
              className="text-base underline decoration-cta-submit decoration-4 underline-offset-8 transition-colors hover:text-tertiary"
            >
              Browse our menu
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-140 lg:mt-0">
          <div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              textShadow: "0 18px 55px rgba(25,25,25,0.08)",
            }}
          >
            <span className="font-logo font text-[clamp(180px,27vw,390px)] leading-none text-white">
              404
            </span>
          </div>
          <div className="mx-auto w-[82%]">
            <BurgerIllustration />
          </div>
          <div className="absolute right-[2%] top-[8%] rotate-6 rounded-xl bg-[#151515] px-4 py-3 shadow-xl md:right-[5%]">
            <span className="font-oswald font-semibold text-[13px] uppercase tracking-wider text-quaternary">
              Not on the menu
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

const PageItem = () => {
  return (
    <>
      {pageContent.map((i) => (
        <div key={i.id}>
          <h2 className={i.titleClass}>
            {i.title}
            <span className={i.captionClass}>
              {i.caption}
              <span className="absolute -bottom-3 left-0 h-2.5 w-full -rotate-1 rounded-full bg-[#ffd40d]" />
            </span>
          </h2>

          <p className={i.textClass}>{i.text}</p>
        </div>
      ))}
    </>
  );
};

const ButtonLink = ({ children, className, ...rest }: ButtonLinkProps) => {
  return (
    <Link
      {...rest}
      className={clsx(
        "font-heading font-semibold inline-flex min-h-14 items-center justify-center rounded-xl px-7",
        className,
      )}
    >
      {children}
    </Link>
  );
};
