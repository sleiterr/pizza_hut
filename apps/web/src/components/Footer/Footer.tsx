import React from "react";
import CopyrightFooter from "./CopyrightFooter";
import FooterInfoCard from "./FooterInfoCard";
import FooterItems from "./FooterItems";
import AboutLinks from "./AboutLinks";
import MenuLinks from "./MenuLinks";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <footer className="relative bg-primary-section px-60 pt-28 flex flex-col items-center justify-center gap-16">
      <FooterItems />
      <div className="flex w-full flex-row items-start justify-start gap-12">
        <FooterInfoCard />
        <div className="flex w-full items-start justify-between gap-12 pt-12 self-start">
          <AboutLinks />
          <MenuLinks />
          <FooterNewsletter />
        </div>
      </div>
      <CopyrightFooter />
    </footer>
  );
};

export default Footer;
