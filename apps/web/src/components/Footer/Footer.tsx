import React from "react";
import CopyrightFooter from "./CopyrightFooter";
import FooterItems from "./FooterItems";

const Footer = () => {
  return (
    <footer className="relative bg-primary-section px-60 pt-28 flex flex-col items-center justify-center gap-16">
      <FooterItems />
          <div className="grid grid-cols-4">
              
      </div>
      <CopyrightFooter />
    </footer>
  );
};

export default Footer;
