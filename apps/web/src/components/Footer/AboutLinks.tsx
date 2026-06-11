import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const aboutLinks: AboutLinks[] = [
  {
    title: "Fredoka One",
    href: "#fredoka",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Special Dish",
    href: "#specialdish",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Reservation",
    href: "#reservation",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Contact",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    href: "#contact",
    type: "#",
  },
];

const AboutLinks = () => {
  return (
    <div className="self-center">
      <div className="mb-11">
        <h4 className="font-heading font-semibold text-2xl text-primary pb-1">
          About
        </h4>
        <span className="block w-18 border-t-[5px] rounded-[30px] border-border-card" />
      </div>
      <ItemLinks />
    </div>
  );
};

const ItemLinks = () => {
  return (
    <>
      <ul className="flex flex-col gap-3">
        {aboutLinks.map((link) => (
          <li key={link.href}>
            {link.type === "#" ? (
              <Link href={link.href} className={link.className}>
                <IoIosArrowForward className={link.iconClassName} />
                <p>{link.title}</p>
              </Link>
            ) : (
              <a href={link.href} className={link.className}>
                <IoIosArrowForward className={link.iconClassName} />
                <p>{link.title}</p>
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AboutLinks;

type AboutLinks = {
  title: string;
  href: string;
  className: string;
  iconClassName: string;
  type: string;
};
