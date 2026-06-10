import React from "react";
import { FaInstagram } from "react-icons/fa";

const galleryText = [
  {
    id: 1,
    title: "Follow @shawonetc3",
    subtitle: "Join our community to inspire your desires",
  },
];

const GalleryContent = () => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 bg-tertiary p-6 rounded-full">
        <FaInstagram className=" text-6xl text-quaternary" />
      </div>
      <GalleryItems />
    </div>
  );
};

export default GalleryContent;

const GalleryItems = () => {
  return (
    <>
      {galleryText.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-4">
          <h2 className="font-heading font-semibold text-5xl text-primary">
            {item.title}
          </h2>
          <p className="font-light text-lg text-secondary">{item.subtitle}</p>
        </div>
      ))}
    </>
  );
};
