import Link from "next/link";

// Navigation links for the header menu
const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#shop", label: "Shop" },
  { href: "/#blog", label: "Blog" },
  { href: "/#app", label: "App" },
  { href: "/#reservation", label: "Reservation" },
];

const linkBase =
  "relative cursor-pointer font-medium font-oswald text-nav-link text-2xl md:text-xl xl:text-2xl tracking-wide hover:text-nav-link-hover transition-colors duration-300";

const NavMenu = ({ handleLinkClick }: NavMenuProps) => {
  return (
    <div className="mt-12 ml-4 md:mt-0 md:ml-0">
      <ul className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-6 md:gap-8 w-30 md:w-auto">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={linkBase}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;

type NavMenuProps = {
  handleLinkClick: () => void;
};
