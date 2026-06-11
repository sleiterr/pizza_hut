import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const menuLinks: MenuLinks[] = [
  {
    title: "Steaks",
    href: "#steaks",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Burgers",
    href: "#burgers",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Coctails",
    href: "#coctails",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    type: "#",
  },
  {
    title: "Bar B Q",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    href: "#bar",
    type: "#",
  },
  {
    title: "Desserts",
    className: clsx(
      "flex items-center gap-2",
      "font-normal text-base text-primary",
      "hover:text-hover-secondary transition-colors duration-300",
    ),
    iconClassName: "text-footer-icon text-sm",
    href: "#desserts",
    type: "#",
  },
];

const MenuLinks = () => {
  return (
    <div className="self-center">
      <div className="mb-11">
        <h4 className="font-heading font-semibold text-2xl text-primary pb-1">
          Menu
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
        {menuLinks.map((link) => (
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

export default MenuLinks;

type MenuLinks = {
  title: string;
  href: string;
  className: string;
  iconClassName: string;
  type: string;
};
