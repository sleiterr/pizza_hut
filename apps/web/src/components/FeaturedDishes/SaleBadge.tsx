import clsx from "clsx";

const SaleBadge = () => {
  return (
    <>
      <span
        className={clsx(
          "absolute -left-8 -top-3 z-10 flex h-17.5 w-17.5 rounded-full bg-discount-price items-center justify-center",
          "font-heading text-lg font-semibold uppercase leading-none text-black",
        )}
      >
        sale
      </span>
    </>
  );
};

export default SaleBadge;
