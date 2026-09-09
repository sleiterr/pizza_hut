"use client";

import { useState } from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/utils/supabase-orders";
import { toast } from "react-toastify";
import type { CartItem } from "@/store/cartStore";
import DeliveryStep from "./DeliveryStep";
import PaymentStep from "./PaymentStep";
import ConfirmStep from "./ConfirmStep";

export type CheckoutStep = "delivery" | "payment" | "confirm";

const DELIVERY_FEE = 3.99;

type CheckoutFormProps = {
  items: CartItem[];
  total: number;
  promoDiscount: number;
  promoCode?: string;
  onClose?: () => void;
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
};

const CheckoutForm = ({
  items,
  total,
  promoDiscount,
  promoCode,
  onClose,
  step,
  setStep,
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
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
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
    paymentMethod: Yup.string().required("Payment method is required"),
    cardNumber: Yup.string().when("paymentMethod", {
      is: "card",
      then: (schema) => schema.required("Card number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    cardName: Yup.string().when("paymentMethod", {
      is: "card",
      then: (schema) => schema.required("Card name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    expiry: Yup.string().when("paymentMethod", {
      is: "card",
      then: (schema) => schema.required("Expiry date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    cvv: Yup.string().when("paymentMethod", {
      is: "card",
      then: (schema) => schema.required("CVV is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  // handle form submission
  const handleSubmit = async (
    values: CheckoutFormValues,
    { resetForm }: FormikHelpers<CheckoutFormValues>,
  ) => {
    try {
      setSubmitError(null);

      const deliveryFee = values.deliveryMethod === "pickup" ? 0 : DELIVERY_FEE;
      const discountAmount = promoDiscount * (total - deliveryFee);

      const deliveryAddress =
        values.deliveryMethod === "pickup"
          ? "Pickup"
          : `${values.address}, ${values.city}, ${values.postalCode}`;

      const order = await createOrder(
        values.email,
        values.phone,
        deliveryAddress,
        items,
        total - discountAmount + deliveryFee,
        deliveryFee,
        values.deliveryMethod,
        promoCode,
        discountAmount,
      );

      if (!order?.id) {
        throw new Error("Order was created without id");
      }

      const confirmationUrl = `/confirmation?orderId=${order.id}`;
      console.info("Redirecting to confirmation:", confirmationUrl);

      toast.success("Order placed successfully!");
      resetForm();
      clearCart();
      router.push(confirmationUrl);
    } catch (error) {
      console.error(error);

      const errorMsg =
        error instanceof Error ? error.message : "Failed to place order.";
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
          {({ isSubmitting, submitForm, validateForm }) => (
            <Form className="flex flex-col">
              {submitError && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                  <p className="text-red-500 text-sm">{submitError}</p>
                </div>
              )}
              {/* Step 1: Delivery */}
              {step === "delivery" && (
                <DeliveryStep onNext={() => setStep("payment")} />
              )}

              {/* Step 2: Payment */}
              {step === "payment" && (
                <PaymentStep
                  onNext={() => setStep("confirm")}
                  onBack={() => setStep("delivery")}
                />
              )}

              {/* Step 3: Confirm */}
              {step === "confirm" && (
                <ConfirmStep
                  items={items}
                  total={total}
                  promoDiscount={promoDiscount}
                  onBack={() => setStep("payment")}
                  onConfirm={async () => {
                    const errors = await validateForm();

                    if (Object.keys(errors).length > 0) {
                      toast.error(
                        "Please complete required fields in Delivery or Payment.",
                      );
                      return;
                    }

                    await submitForm();
                  }}
                  isSubmitting={isSubmitting}
                />
              )}
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
  paymentMethod: "card" | "cash" | "apple";
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
};
