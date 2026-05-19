import React from "react";
import Link from "next/link";
import { ButtonProps } from "@/sanity/types";
import clsx from "clsx";

const CtaPrimary = ({ children, href, className, ...rest }: ButtonProps) => {
  return (
    <>
      <div className="inline-block">
        <Link
          href={href}
          {...rest}
          className={clsx(
            "relative z-10 block bg-cta-primary",
            "py-4 px-8 md:py-4 md:px-8 cursor-pointer rounded-xl",
            "font-semibold text-quaternary text-base md:text-lg",
            "transition duration-300 ease-in-out",
            "hover:bg-cta-primary-hover",
            className,
          )}
        >
          {children}
        </Link>
      </div>
    </>
  );
};

export default CtaPrimary;
