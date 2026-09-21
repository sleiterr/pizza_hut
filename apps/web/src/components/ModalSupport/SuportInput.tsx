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
  placeholder,
  rows = 4,
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
            className="font-oswald font-medium text-xs text-senary uppercase tracking-[2.5px] pb-1"
          >
            {label}
          </label>
        )}
        <div className="border-b-2 border-border-suport focus-within:border-discount-price transition-colors">
          <PhoneInput
            countries={["UA", "DK"]}
            defaultCountry="UA"
            placeholder={placeholder}
            onCountryChange={handleCountryChange}
            value={values[name] || ""}
            onChange={(value) => {
              void setFieldValue(name, value || "");
            }}
            {...rest}
            style={{
              border: "none",
              backgroundColor: "transparent",
              padding: "0.5rem 0",
              fontSize: "16px",
            }}
            className={clsx(
              "text-input-suport",
              "[&_.PhoneInputInput]:focus:outline-none",
              "[&_.PhoneInputInput]:focus:ring-0",
              "[&_.PhoneInputInput]:border-0",
              "[&_.PhoneInputInput]:placeholder:text-placeholder-suport",
              "[&_.PhoneInputInput]:placeholder:font-normal",
              "[&_.PhoneInputInput]:placeholder:text-base",
              className,
            )}
          />
        </div>
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
          className="font-oswald font-medium text-xs text-senary uppercase tracking-[2.5px] pb-1"
        >
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        type={type === "textarea" ? undefined : type}
        as={type === "textarea" ? "textarea" : undefined}
        placeholder={placeholder}
        rows={type === "textarea" ? rows : undefined}
        {...rest}
        className={clsx(
          "text-input-suport text-base px-0 py-2 border-b-2 border-border-suport bg-transparent",
          "focus:outline-none focus:border-discount-price transition-colors",
          type === "textarea" && "resize-none",
          "placeholder:font-normal placeholder:text-base placeholder:text-placeholder-suport",
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
  placeholder?: string;
  as?: string;
  className?: string;
  rows?: number;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "value" | "defaultValue" | "onChange"
>;

// Omit, use for excluding specific attributes from the input element that are handled by Formik.
