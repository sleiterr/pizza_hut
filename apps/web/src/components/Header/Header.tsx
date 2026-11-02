"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import BurgerMenu from "./Burger";
import NavMenu from "./NavMenu";
import CartAndActions from "./CartAndActions";

const Header = () => {
  // State to track if the page is scrolled
  const [scrolled, setScrolled] = useState<boolean>(false);
  // State to track if the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current location using React Router's useLocation hook
  const pathname = usePathname();
  // Determine if we are on the home page
  const isHome = pathname === "/";

  // Handle link click to close the menu
  const handleLinkClick = () => setMenuOpen(false);

  // On the home page the logo scrolls smoothly to the top and clears the hash from the URL
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  };

  // On the home page track the scroll position, on other pages the header is always in the "scrolled" state
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [menuOpen]);

  // Log current location and isHome state
  useEffect(() => {}, [pathname, isHome]);

  return (
    <>
      <header
        className={clsx(
          // sticky keeps the header in the document flow, so the content is not shifted under it
          "sticky top-0 w-full z-999",
          "flex justify-between items-center",
          "px-4 md:px-6",
          "bg-white transition-shadow duration-300",
          scrolled && "shadow-md",
        )}
      >
        {/* Overlay */}
        <div
          className={clsx(
            "fixed inset-0 backdrop-blur-sm bg-white/10  transition-opacity duration-300 h-full w-full z-666",
            menuOpen ? "opacity-300" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setMenuOpen(false)}
        ></div>
        <div className="relative py-4 shrink-0 cursor-pointer flex items-center">
          <Link href="/" onClick={handleLogoClick}>
            <img
              src="/logo/logo_pizza.svg"
              alt="logo"
              className="object-contain w-29.75 h-16.75"
            />
          </Link>
          <span className="font-fugaz font-medium text-2xl text-logo -ml-2">
            pizza hut
          </span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex relative z-700 m-auto min-w-0">
          <NavMenu handleLinkClick={handleLinkClick} />
        </nav>

        <div
          className={clsx(
            "fixed top-0 bottom-0 right-0 z-999 md:hidden",
            "w-full h-auto",
            "bg-menu-bg",
            "flex flex-col justify-start items-start",
            "pt-4 px-4 gap-10",
            "transition-all duration-500 ease-in-out",
            {
              "opacity-0 translate-x-full pointer-events-none": !menuOpen,
              "opacity-100 translate-x-0 pointer-events-auto": menuOpen,
            },
          )}
          onClick={() => setMenuOpen(false)}
        >
          {/* Mobile Navigation */}
          <nav className=" md:self-center md:m-auto">
            <NavMenu handleLinkClick={handleLinkClick} />
          </nav>
        </div>
        {scrolled !== undefined && (
          <div className="fixed z-1000 right-4 top-7 md:top-8 md:right-4 backdrop-blur-sm md:-translate-x-1/2 md:hidden">
            <BurgerMenu
              scrolled={scrolled}
              isOpen={menuOpen}
              toggleMenu={() => setMenuOpen((prev) => !prev)}
            />
          </div>
        )}

        {/* Cart and Actions */}
        <div className="flex items-center justify-center gap-4">
          <CartAndActions />
        </div>
      </header>
    </>
  );
};

export default Header;
