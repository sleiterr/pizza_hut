import React from "react";
import Image from "next/image";

const FooterItems = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute right-0 bottom-0">
        <Image
          src="/footer/footer-right.png"
          alt="pizza"
          width={290}
          height={517}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute left-0 bottom-0">
        <Image
          src="/footer/footer-left.png"
          alt="mushrooms"
          width={274}
          height={440}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default FooterItems;
