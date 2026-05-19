import React from "react";
import Link from "next/link";
import clsx from "clsx";

const NavMenu = ({ handleLinkClick }) => {
  return (
    <div className="mt-12 ml-4 md:mt-0 md:ml-0">
      <ul className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-6 md:gap-8 w-30 md:w-auto">
        <li>
          <a
            href="/"
            smooth={true.toString()}
            duration={800}
            className={clsx(
              "relative cursor-pointer",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={handleLinkClick}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#aboutus"
            smooth={true.toString()}
            duration={800}
            offset={-100}
            className={clsx(
              "relative cursor-pointer",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={handleLinkClick}
          >
            About Us
          </a>
        </li>
        <li className="hidden md:block">
          <a
            href="#shop"
            smooth={true.toString()}
            duration={800}
            offset={-100}
            className={clsx(
              "relative cursor-pointer",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={handleLinkClick}
          >
            Shop
          </a>
        </li>
        <li>
          <a
            href="#blog"
            smooth={true.toString()}
            duration={800}
            offset={-100}
            className={clsx(
              "relative cursor-pointer",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={handleLinkClick}
          >
            Blog
          </a>
        </li>
        <li>
          <a
            href="#pages"
            smooth={true.toString()}
            duration={800}
            offset={-100}
            className={clsx(
              "relative cursor-pointer",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={handleLinkClick}
          >
            Pages
          </a>
        </li>
        <li>
          <Link
            href="/"
            smooth={true.toString()}
            duration={800}
            offset={-100}
            className={clsx(
              "relative cursor-pointer ",
              "font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide",
              "hover:text-nav-link-hover transition-colors duration-300",
            )}
            onClick={() => {
              handleLinkClick();
            }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
