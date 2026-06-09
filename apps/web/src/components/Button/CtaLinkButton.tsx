import React from "react";
import clsx from "clsx";

const CtaLinkButton = ({
  children,
  href,
  className,
  external = true,
  rel,
  target,
  ...rest
}: CtaProps) => {
  const finalTarget = external ? "_blank" : target;
  const finalRel =
    finalTarget === "_blank" ? (rel ?? "noopener noreferrer") : rel;

  return (
    <>
      <div className="inline-block">
        <a
          href={href}
          target={finalTarget}
          rel={finalRel}
          {...rest}
          className={clsx(
            "relative z-10 block",
            "py-4 px-8 md:py-4 md:px-8 cursor-pointer rounded-xl",
            "font-semibold text-quaternary text-base md:text-lg",
            "transition duration-300 ease-in-out",
            className,
          )}
        >
          {children}
        </a>
      </div>
    </>
  );
};

export default CtaLinkButton;

type CtaProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  rel?: string;
  target?: string;
};
