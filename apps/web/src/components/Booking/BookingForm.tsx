"use client";

import React, { useState } from "react";
import { formatISO } from "date-fns";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import Input from "./Input";

const BookingForm = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: BookingFormValues = {
    name: "",
    numberOfGuests: 1,
    date: "",
    time: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    numberOfGuests: Yup.number()
      .typeError("Guests must be a number")
      .required("Guests are required")
      .min(1, "At least 1 guest is required")
      .max(12, "Maximum is 12 guests"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const handleSubmit = async (
    values: BookingFormValues,
    { resetForm }: FormikHelpers<BookingFormValues>,
  ) => {
    try {
      setSubmitError(null);

      const dateTime = formatISO(new Date(`${values.date}T${values.time}`));
      const payload = {
        name: values.name,
        guestCount: values.numberOfGuests,
        date: values.date,
        time: dateTime,
        phone: values.phone,
      };

      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        resetForm();
        const params = new URLSearchParams({
          name: values.name,
          date: values.date,
          time: values.time,
        });
        router.push(`/confirmation?${params.toString()}`);
        return;
      }

      setSubmitError(
        data?.message || "Something went wrong. Please try again.",
      );
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-end w-full">
          <div className="grid grid-cols-2 gap-7">
            <div className="grid grid-cols-1">
              <Input
                type="number"
                name="numberOfGuests"
                placeholder="Select number of guests"
                min={1}
                max={12}
              />
              <Input type="text" name="name" placeholder="Full Name" />
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2 col-span-2 gap-x-7">
                <Input
                  type="date"
                  name="date"
                  placeholder="Date"
                  className="px-2!"
                />
                <Input type="time" name="time" className="px-4!" />
              </div>
              <div className="col-span-full">
                <Input type="tel" name="phone" placeholder="Phone No" />
              </div>
            </div>
            {submitError && <p className="text-sm text-white">{submitError}</p>}
          </div>
          <SendButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Book Table"}
          </SendButton>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;

const SendButton = ({ children, className, ...rest }: SendButtonProps) => {
  return (
    <div className="relative inline-block">
      <span
        className="absolute z-0 border-[3px] border-cta-submit rounded-xl pointer-events-none"
        style={{
          width: "146px",
          height: "70px",
          bottom: "-5px",
          left: "14px",
        }}
      />
      <button
        type="submit"
        {...rest}
        className={clsx(
          "relative overflow-visible z-10 block bg-cta-submit",
          "py-4 px-8 md:py-4 md:px-8 cursor-pointer rounded-xl",
          "font-heading font-semibold text-black text-base md:text-lg",
          "transition duration-300 ease-in-out",
          "hover:bg-cta-secondary-hover",
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
};

// type for form values
type BookingFormValues = {
  name: string;
  numberOfGuests: number;
  date: string;
  time: string;
  phone: string;
};

// Reuse button props for SendButton
type SendButtonProps = React.ComponentProps<"button">;
