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
        <AboutLinks />
        <MenuLinks />
        <FooterNewsletter />
      </div>
      <CopyrightFooter />
    </footer>
  );
};

export default Footer;
