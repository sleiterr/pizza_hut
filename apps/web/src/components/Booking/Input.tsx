import React from "react";
import clsx from "clsx";
import { Field, ErrorMessage } from "formik";

const Input = ({ label, name, className, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-semibold text-base md:text-lg text-label-input uppercase pb-1"
        >
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        {...rest}
        className={clsx(
          "font-semibold text-base text-secondary px-8 md:h-[60px]",
          "bg-white rounded-[7px] w-full",
          "shadow focus:outline-none transition-shadow duration-300 focus:ring-2 focus:ring-border-card resize-none",
          className,
        )}
      />
      <div className="h-5 mt-0.5">
        <ErrorMessage
          name={name}
          component="div"
          className="text-white text-sm"
        />
      </div>
    </div>
  );
};

export default Input;

type InputProps = {
  label?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
