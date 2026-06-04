import React from "react";

const CardFeatured = ({ children, className }: CardFeaturedProps) => {
  return (
    <div
      className={`rounded-[30px] bg-white border-[5px] border-border-card px-10 py-5 w-full max-w-103.25 h-114.75 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default CardFeatured;

type CardFeaturedProps = {
  children: React.ReactNode;
  className?: string;
};

// max-w-[413px]
