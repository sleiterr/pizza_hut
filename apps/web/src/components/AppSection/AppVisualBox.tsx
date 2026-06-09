import React from "react";
import clsx from "clsx";
import BgVisualBox from "./BgVisualBox";

const overlays = [
  { src: "../../../public/appImage/leaf.png", alt: "leaf", className: "" },
  {
    src: "../../../public/appImage/phone_app.png",
    alt: "phone",
    className: "",
  },
  {
    src: "../../../public/appImage/pizza_leaf.png",
    alt: "pizza",
    className: "",
  },
  { src: "../../../public/appImage/salat.png", alt: "salat", className: "" },
  {
    src: "../../../public/appImage/scooter.png",
    alt: "scooter",
    className: "",
  },
];

const AppVisualBox = () => {
  return (
    <div className="relative">
      <BgVisualBox />
      <div
        className={clsx(
          "absolute inset-0 -top-14 -left-18 z-10 outline-blue-600 outline-1",
          "w-[790px] h-[500px]",
        )}
      ></div>
    </div>
  );
};

export default AppVisualBox;
