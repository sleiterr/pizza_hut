import React from "react";
import clsx from "clsx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Field, ErrorMessage } from "formik";
import { useFormikContext } from "formik";

type CheckoutValues = Record<string, string>;

const SuportInput = ({
  label,
  name,
  className,
  as,
  type,
  ...rest
}: SuportInputProps) => {
  const { values, setFieldValue } = useFormikContext<CheckoutValues>();
  const [country, setCountry] = React.useState("UA");

  const handleCountryChange = (newCountry: string | undefined) => {
    if (!newCountry) return;

    setCountry(newCountry);

    const countryCodes: Record<string, string> = {
      UA: "+380",
      DK: "+45",
    };

    const code = countryCodes[newCountry] || "";
    if (code) {
      setFieldValue(name, code);
    }
  };

  if (type === "Phone") {
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
        <PhoneInput
          countries={["UA", "DK"]}
          defaultCountry="UA"
          onCountryChange={handleCountryChange}
          value={values[name] || ""}
          onChange={(value) => {
            void setFieldValue(name, value || "");
          }}
          {...rest}
          className={clsx(
            "text-quaternary text-base px-3 py-2 border-2 border-border-btn bg-checkout-input rounded-lg",
            "focus:outline-none focus:border-discount-price transition-colors",
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
  }
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

export default SuportInput;

type SuportInputProps = {
  label?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute | "Phone";
  as?: string;
  className?: string;
  rows?: number;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "value" | "defaultValue" | "onChange"
>;

// Omit, use for excluding specific attributes from the input element that are handled by Formik.
