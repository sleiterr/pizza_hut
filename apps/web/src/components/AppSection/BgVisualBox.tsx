import React from "react";
import clsx from "clsx";

const BgVisualBox = () => {
  return (
    <div
      className={clsx(
        "relative z-0 md:w-229.25 md:h-98.75 bg-app-section rounded-l-full",
        "xl:w-212 xl:h-98.75",
        "lg:w-238.75 lg:h-105",
      )}
    />
  );
};

export default BgVisualBox;

//? MD:w-[917px] h-[395px]
//? LG:w-[955px] LG:h-[420px]
