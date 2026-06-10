import React from "react";
import GalleryList from "./GalleryList";
import GalleryContent from "./GalleryContent";
import SectionPage from "../Section/SectionPage";

const HeroGallery = () => {
  return (
    <SectionPage
      classSection="before:pointer-events-none before:absolute before:inset-0 before:z-10 before:content-[''] before:bg-[var(--color-overlay-gallery)]"
      className="relative py-0! pb-24!"
    >
      <GalleryList />
      <GalleryContent />
    </SectionPage>
  );
};

export default HeroGallery;

//before:bg-[var(--color-overlay-gallery)]
