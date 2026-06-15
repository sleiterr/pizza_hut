"use client";

import React from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Input from "./Input";

type NewsFormProps = {
  onSubscribe?: (
    email: string,
  ) => Promise<{ ok?: boolean; message?: string } | void>;
};

type NewsFormValues = {
  email: string;
};

const NewsForm = ({ onSubscribe }: NewsFormProps) => {
  const formik = useFormik<NewsFormValues>({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Please enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("NEWS FORM SUBMIT");
      try {
        if (onSubscribe) {
          const result = await onSubscribe(values.email);

          if (result?.ok === false) {
            toast.error(result.message || "Failed to subscribe");
            return;
          }

          toast.success(result?.message || "Thanks for subscribing!");
          resetForm();
          return;
        }

        // Temporary submit endpoint until Supabase/Mailchimp is connected.
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          toast.error(data?.message || "Failed to subscribe");
          return;
        }

        toast.success(data?.message || "Thanks for subscribing!");
        resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-3 flex w-90 flex-col">
      <Input
        type="email"
        name="email"
        placeholder="Email Address"
        autoComplete="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email ? formik.errors.email : undefined}
      />
      <SubscribeButton type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Submitting..." : "Subscribe"}
      </SubscribeButton>
    </form>
  );
};

export default NewsForm;

const SubscribeButton = ({
  children,
  className,
  ...rest
}: SubscribeButtonProps) => {
  return (
    <div className="relative inline-block mt-2">
      <span
        className="absolute z-0 border-[3px] border-cta-primary rounded-xl pointer-events-none"
        style={{
          width: "136px",
          height: "70px",
          bottom: "-5px",
          left: "14px",
        }}
      />
      <button
        {...rest}
        className={clsx(
          "relative overflow-visible z-10 block bg-cta-primary",
          "py-4 px-8 md:py-4 md:px-8 cursor-pointer rounded-xl",
          "font-heading font-semibold text-quaternary text-base md:text-lg",
          "transition duration-300 ease-in-out",
          "hover:bg-cta-primary-hover",
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
};

type SubscribeButtonProps = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  name?: string;
  error?: string;
};
