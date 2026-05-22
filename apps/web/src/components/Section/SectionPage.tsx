import React from "react";
import clsx from "clsx";

const SectionPage = ({ children, className = "", id }: SectionPageProps) => {
  return (
    <section
      className={clsx("flex items-center justify-center", "relative")}
      id={id}
    >
      <div
        className={clsx(
          "flex flex-col items-center-center",
          "px-4 py-24 mx-auto md:max-w-7xl",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionPage;

type SectionPageProps = React.PropsWithChildren<{
  className?: string;
  id?: string;
}>;
