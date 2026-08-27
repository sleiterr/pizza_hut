// src/components/Button/PlaceOrderButton.tsx
import React from "react";
import clsx from "clsx";

type OrderButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const OrderButton = ({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}: OrderButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-full py-4 cursor-pointer rounded-xl",
        "text-white text-lg font-heading font-semibold",
        "bg-tertiary hover:bg-secondary active:scale-95",
        "transition-all duration-300 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default OrderButton;
