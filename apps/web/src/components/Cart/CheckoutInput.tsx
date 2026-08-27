import React from "react";
import clsx from "clsx";
import { Field, ErrorMessage } from "formik";

const CheckoutInput = ({
  label,
  name,
  className,
  as,
  ...rest
}: CheckoutInputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-normal md:text-xs text-septenary uppercase pb-1"
        >
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        {...rest}
        className={clsx(
          "text-quaternary text-base px-3 py-2 border-2 border-border-btn bg-checkout-input rounded-lg",
          "focus:outline-none focus:border-discount-price transition-colors",
          as === "textarea" && "resize-none",
          "placeholder:text-input-check placeholder:font-normal placeholder:text-base",
          className,
        )}
      />
      <div className="h-5 mt-0.5">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};

export default CheckoutInput;

type CheckoutInputProps = {
  label?: string;
  name: string;
  as?: string;
  className?: string;
  rows?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;
