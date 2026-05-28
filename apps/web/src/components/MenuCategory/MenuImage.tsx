import React from "react";
import Image from "next/image";

const MenuImage = ({ image }: MenuImageProps) => {
  if (!image?.asset?.url) return null;

  return (
    <>
      <Image
        src={image.asset?.url}
        alt="Menu"
        width={520}
        height={540}
        className="object-cover absolute top-18 left-5 -translate-x-1/2 "
      />
    </>
  );
};

export default MenuImage;

type MenuImageProps = {
  image: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
};
