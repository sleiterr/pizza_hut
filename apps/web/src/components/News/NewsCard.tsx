import React from "react";
import News from "./News";

const NewsCard = ({ children, className }: NewsCardProps) => {
  return (
    <div
      className={`flex items-center gap-10 w-full max-w-[635px] h-[275px] mx-auto outline-1 outline-black ${className}`}
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
