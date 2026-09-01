"use client";

import React, { useState } from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/utils/supabase-orders";
import { toast } from "react-toastify";
import CheckoutInput from "./CheckoutInput";
import PlaceOrderButton from "@/components/Button/OrderButton";
import type { CartItem } from "@/store/cartStore";
import DeliveryMethodCard from "./DeliveryMethodCard";

import { MdOutlinePlace } from "react-icons/md";

const DELIVERY_FEE = 3.99;

type CheckoutFormProps = {
  items: CartItem[];
  total: number;
  promoDiscount: number;
  promoCode?: string;
  onClose?: () => void;
};

const CheckoutForm = ({
  items,
  total,
  promoDiscount,
  promoCode,
  onClose,
}: CheckoutFormProps) => {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Formik initial values and validation schema
  const initialValues: CheckoutFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryMethod: "courier",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().when("deliveryMethod", {
      is: "courier",
      then: (schema) => schema.required("Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    city: Yup.string().when("deliveryMethod", {
      is: "courier",
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    postalCode: Yup.string().when("deliveryMethod", {
      is: "courier",
      then: (schema) => schema.required("ZIP Code is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    deliveryMethod: Yup.string().required("Delivery method is required"),
  });

  // handle form submission
  const handleSubmit = async (
    values: CheckoutFormValues,
    { resetForm }: FormikHelpers<CheckoutFormValues>,
  ) => {
    try {
      setSubmitError(null);

      const deliveryAddress =
        values.deliveryMethod === "pickup"
          ? "Pickup"
          : `${values.address}, ${values.city}, ${values.postalCode}`;

      const order = await createOrder(
        values.email,
        values.phone,
        deliveryAddress,
        items,
        total,
        values.deliveryMethod === "pickup" ? 0 : DELIVERY_FEE,
        values.deliveryMethod,
        promoCode,
        promoDiscount,
      );
      toast.success("Order placed successfully!");
      resetForm();
      clearCart();
      router.push(`/confirmation?orderId=${order.id}`);
    } catch (error) {
      console.error(error);

      const errorMsg =
        error instanceof Error ? error.message : "Failde to place order.";
      setSubmitError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-cart-bg rounded-[20px] border-[3px] border-checkout-border p-6 w-full max-w-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col">
              {submitError && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                  <p className="text-red-500 text-sm">{submitError}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <CheckoutInput
                  label="First Name"
                  name="firstName"
                  placeholder="Olena"
                />
                <CheckoutInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Kovalenko"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CheckoutInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+380"
                />
                <CheckoutInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <div className="">
                  <h4 className="text-xs font-semibold text-quinary uppercase">
                    Delivery Method
                  </h4>
                </div>
                <DeliveryMethodCard
                  selected={values.deliveryMethod === "courier"}
                  onSelect={() => setFieldValue("deliveryMethod", "courier")}
                  icon="🛵"
                  title="Courier Delivery"
                  subtitle="Door-to-door · 25–35 min · $3.99"
                />
                <DeliveryMethodCard
                  selected={values.deliveryMethod === "pickup"}
                  onSelect={() => setFieldValue("deliveryMethod", "pickup")}
                  icon="🏪"
                  title="Pick Up"
                  subtitle="Ready in 15 min · Free"
                />
              </div>

              {values.deliveryMethod === "courier" && (
                <div className="bg-delivery-fee p-4 rounded-[14px] mb-4 border-[3px] border-checkout-border">
                  <div className="mb-4">
                    <h4 className="font-semibold text-base text-quaternary flex items-center gap-2">
                      <MdOutlinePlace className="text-tertiary text-xl" />
                      Delivery Address
                    </h4>
                  </div>
                  <CheckoutInput
                    label="Street & Number"
                    name="address"
                    as="textarea"
                    placeholder="123 Main St"
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <CheckoutInput
                      label="City"
                      name="city"
                      placeholder="Kyiv"
                    />
                    <CheckoutInput
                      label="ZIP Code"
                      name="postalCode"
                      placeholder="01001"
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border-2 border-border-btn text-quaternary rounded-lg py-2 hover:border-discount-price transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                )}
                <PlaceOrderButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Confirm Order"}
                </PlaceOrderButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckoutForm;

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: "courier" | "pickup";
};
