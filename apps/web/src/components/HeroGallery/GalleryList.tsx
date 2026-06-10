import React from "react";
import clsx from "clsx";
import Image from "next/image";

const galleryItems: GalleryItem[] = [
  {
    // Left column, top cell
    id: 1,
    src: "/heroGallery/img_1.jpg",
    alt: "beef_steak",
    width: 370,
    height: 360,
    className: "md:col-start-1 md:row-start-1",
  },
  {
    // Left column, bottom cell
    id: 2,
    src: "/heroGallery/img_2.jpg",
    alt: "grill",
    width: 370,
    height: 190,
    className: "md:col-start-1 md:row-start-2",
  },
  {
    // Center column, spans both rows
    id: 3,
    src: "/heroGallery/img_3.jpg",
    alt: "steak",
    width: 377,
    height: 572,
    className:
      "col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2",
  },
  {
    // Third column, top cell
    id: 4,
    src: "/heroGallery/img_4.jpg",
    alt: "pasta",
    width: 374,
    height: 200,
    className: "md:col-start-3 md:row-start-1",
  },
  {
    // Third column, bottom cell
    id: 5,
    src: "/heroGallery/img_5.jpg",
    alt: "wings",
    width: 375,
    height: 365,
    className: "md:col-start-3 md:row-start-2",
  },
  {
    // Fourth column, top cell
    id: 6,
    src: "/heroGallery/img_6.jpg",
    alt: "coffee",
    width: 374,
    height: 364,
    className: "md:col-start-4 md:row-start-1",
  },
  {
    // Fourth column, bottom cell
    id: 7,
    src: "/heroGallery/img_7.jpg",
    alt: "app_order",
    width: 375,
    height: 185,
    className: "md:col-start-4 md:row-start-2",
  },
];

const GalleryList = () => {
  return (
    <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
      {galleryItems.map((item) => (
        <li
          key={item.id}
          className={clsx("overflow-hidden rounded-[30px]", item.className)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="h-full w-full object-cover"
          />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;

// Define the GalleryItem type to ensure type safety for gallery items
type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};
