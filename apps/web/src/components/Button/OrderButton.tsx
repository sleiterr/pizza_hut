// src/components/Button/PlaceOrderButton.tsx
import React from "react";
import clsx from "clsx";

type OrderButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const OrderButton = ({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
  variant = "primary",
}: OrderButtonProps) => {
  const variantClasses = {
    primary: "text-white bg-tertiary hover:bg-secondary",
    secondary:
      "font-semibold text-quinary bg-transparent border-2 border-border-btn hover:border-discount-price hover:text-quaternary transition-colors",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-full py-4 cursor-pointer rounded-xl",
        "text-lg font-heading font-semibold",
        "active:scale-95",
        "transition-all duration-300 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default OrderButton;
