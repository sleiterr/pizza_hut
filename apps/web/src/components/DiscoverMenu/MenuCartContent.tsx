import React from "react";
import clsx from "clsx";

const MenuCartContent = ({ item }: MenuCartContentProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-start justify-center absolute inset-0 bg-opacity-50 py-14 px-12 h-auto",
      )}
    >
      <div className="mb-10">
        <h4 className="font-heading font-semibold text-5xl text-quaternary pb-2">
          {item.title}
        </h4>
        <p className="text-lg text-quaternary w-67.5">{item.description}</p>
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center",
          "absolute -bottom-6 left-28 -translate-x-1/2",
          "bg-discount-price rounded-full w-max px-9 py-9",
        )}
      >
        <p
          className={clsx(
            "",
            "font-heading font-semibold text-3xl text-tertiary",
          )}
        >
          ${item.price}{" "}
        </p>
        <span className="font-heading font-semibold text-base text-black">
          person
        </span>
      </div>
    </div>
  );
};

export default MenuCartContent;

type MenuCartContentProps = {
  item: {
    _key?: string;
    title: string | null;
    description: string | null;
    price: number | null;
  };
};
