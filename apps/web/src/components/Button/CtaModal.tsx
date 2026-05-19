import React from "react";
import clsx from "clsx";
import { CtaProps } from "@/sanity/types";

const CtaModal = ({ children, className, ...rest }: CtaProps) => {
  return (
    <button
      className={clsx(
        "py-4 px-8 md:py-4 md:px-12 cursor-pointer rounded-xl",
        "font-oswald font-semibold text-quaternary text-base md:text-lg",
        "transition duration-300 ease-in-out",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CtaModal;
