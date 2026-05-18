import React from "react";
import clsx from "clsx";

const WeeklyCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "border-border-card border-2 bg-card-bg py-5 px-7 rounded-[30px]",
        "w-100 h-48",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default WeeklyCard;
