import React from "react";
import clsx from "clsx";

const wrapperData = [
  {
    id: 1,
    title: "Facebook",
    href: "https://www.facebook.com",
    className: clsx(
      "font-semibold font-heading text-base text-primary",
      "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-[length:100%_1px]",
    ),
  },
  {
    id: 2,
    title: "Instagram",
    href: "https://www.instagram.com",
    className: clsx(
      "font-semibold font-heading text-base text-primary",
      "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-[length:100%_1px]",
    ),
  },
];

const LinkWrapper = () => {
  return (
    <>
      <ul className="flex items-center justify-between">
        {wrapperData.map((item) => (
          <li key={item.id} className="cursor-pointer">
            <a
              href={item.href}
              target="_blank"
              className={item.className}
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LinkWrapper;
