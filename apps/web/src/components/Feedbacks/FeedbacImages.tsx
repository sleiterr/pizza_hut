import React from "react";
import Image from "next/image";

const images = [
  {
    src: "/feedback/coffee.jpg",
    alt: "coffee",
    className: "absolute left-[224px] top-0 translate-y-[42%] z-10",
  },
  {
    src: "/feedback/fish.jpg",
    alt: "fish",
    overlay: true,
    className: "relative z-0 translate-y-1/5",
  },
  {
    src: "/feedback/dessert.jpg",
    alt: "dessert",
    className: "absolute -translate-y-1/2 top-0 left-[320px] z-10",
  },
];

const FeedbacImages = () => {
  return (
    <div className="flex flex-col items-start">
      {images.map((image) => (
        <div
          key={image.src}
          className={`relative overflow-hidden ${image.className ?? ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={292}
            height={292}
            className="h-72.5 w-72.5 object-cover rounded-[30px]"
          />
          {image.overlay ? (
            <div className="absolute inset-0 z-10 bg-overlay-img rounded-[30px] w-72.5 h-72.5" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default FeedbacImages;
