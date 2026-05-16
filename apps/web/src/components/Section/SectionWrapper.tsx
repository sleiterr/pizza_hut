import * as React from "react";

const SectionWrapper = ({
  children,
  className = "",
  style = {},
  id,
  bgSrc,
}: SectionWrapperProps) => {
  return (
    <section
      className={`relative min-h-[45vh] w-full min-w-[320px] md:h-screen bg-cover bg-no-repeat bg-center md:aspect-8/5 ${className}`}
      id={id}
      style={{
        backgroundImage: bgSrc ? `url(${bgSrc})` : undefined,
        backgroundPosition: "center center",
        ...style,
      }}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;

type SectionWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  bgSrc?: string;
};
