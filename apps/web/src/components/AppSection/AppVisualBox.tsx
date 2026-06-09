import React from "react";
import clsx from "clsx";
import Image from "next/image";
import BgVisualBox from "./BgVisualBox";

const overlays = [
  {
    id: 1,
    src: "/appImage/leaf.png",
    alt: "leaf",
    width: 51,
    height: 92,
    className: "absolute lg:top-14 md:top-8 left-12 bg-transparent",
  },
  {
    id: 2,
    src: "/appImage/phone_app.png",
    alt: "phone",
    width: 400,
    height: 487,
    className:
      "absolute md:-bottom-0 lg:-bottom-1 md:left-62 lg:left-62 bg-transparent",
  },
  {
    id: 3,
    src: "/appImage/pizza_leaf.png",
    alt: "pizza",
    width: 279,
    height: 159,
    className: "absolute top-14 right-36 bg-transparent",
  },
  {
    id: 4,
    src: "/appImage/salat.png",
    alt: "salat",
    width: 285,
    height: 237,
    className: "absolute bottom-32 right-4 bg-transparent",
  },
  {
    id: 5,
    src: "/appImage/scooter.png",
    alt: "scooter",
    width: 241,
    height: 242,
    className:
      "absolute md:bottom-24 md:left-5 lg:bottom-22 lg:left-6  bg-transparent",
  },
];

const AppVisualBox = () => {
  return (
    <div className="relative">
      <BgVisualBox />
      <div
        className={clsx(
          "absolute inset-0 -top-28 -left-18 z-10",
          "w-228.75 h-155",
        )}
      >
        {overlays.map((item) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className={item.className}
          />
        ))}
      </div>
    </div>
  );
};

export default AppVisualBox;
