import React from "react";
import clsx from "clsx";
import { SectionPageProps } from "@/sanity/types";

const SectionPage = ({ children, className = "", id }: SectionPageProps) => {
  return (
    <section
      className={clsx(
        "flex items-center justify-center",
        "relative h-screen",
        className,
      )}
      id={id}
    >
      <div
        className={clsx(
          "flex flex-col items-center-center",
          "px-4 py-16 mx-auto md:max-w-7xl",
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionPage;