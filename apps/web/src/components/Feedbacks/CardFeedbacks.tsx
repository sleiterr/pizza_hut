import React from "react";

const CardFeedbacks = ({ children, className }: CardFeaturedProps) => {
  return (
    <div
      className={`rounded-[30px] bg-white border-[5px] border-border-card px-10 py-12 w-full max-w-[610px] h-[316px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default CardFeedbacks;

type CardFeaturedProps = {
  children: React.ReactNode;
  className?: string;
};
