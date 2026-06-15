import React from "react";
import clsx from "clsx";

const Input = ({ name, error, className, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <input
        id={name}
        name={name}
        {...rest}
        className={clsx(
          "font-normal text-base text-footer-form px-8 md:h-15",
          "bg-white rounded-[7px] w-full border border-footer-form-border",
          "shadow focus:outline-none transition-shadow duration-300 focus:ring-2 focus:ring-border-card resize-none",
          className,
        )}
      />
      <div className="h-5 mt-0.5">
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default Input;

type InputProps = {
  name: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
