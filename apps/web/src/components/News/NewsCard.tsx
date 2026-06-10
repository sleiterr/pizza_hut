import React from "react";

const NewsCard = ({ children, className }: NewsCardProps) => {
  return (
    <div
      className={`mx-auto flex h-68.75 w-full max-w-158.75 items-center gap-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default NewsCard;

type NewsCardProps = {
  children: React.ReactNode;
  className?: string;
};

// max-w-[413px]
// w-full max-w-[635px] h-[275px]
