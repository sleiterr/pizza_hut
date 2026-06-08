import React from "react";

const TeamCart = ({ children, className }: TeamCartProps) => {
  return (
    <div
      className={`bg-white px-2 py-2 w-full max-w-103.25 h-188.5 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default TeamCart;

type TeamCartProps = {
  children: React.ReactNode;
  className?: string;
};

// max-w-[413px]
