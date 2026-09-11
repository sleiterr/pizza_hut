// src/components/Cart/DeliveryStep.tsx
"use client";

import { useFormikContext } from "formik";
import CheckoutInput from "./CheckoutInput";
import DeliveryMethodCard from "./DeliveryMethodCard";
import PlaceOrderButton from "@/components/Button/OrderButton";
import { MdOutlinePlace } from "react-icons/md";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

type DeliveryStepProps = {
  onNext: () => void;
};

const DeliveryStep = ({ onNext }: DeliveryStepProps) => {
  const { values, setFieldValue, validateForm, setTouched } =
    useFormikContext<DeliveryStepFormValues>();

  const baseFieldsFilled =
    values.firstName.trim() !== "" &&
    values.lastName.trim() !== "" &&
    values.phone.trim() !== "" &&
    values.email.trim() !== "";

  const courierFieldsFilled =
    values.deliveryMethod !== "courier" ||
    (values.address.trim() !== "" &&
      values.city.trim() !== "" &&
      values.postalCode.trim() !== "");

  const canContinue = baseFieldsFilled && courierFieldsFilled;

  const handleContinue = async () => {
    const errors = await validateForm();

    const hasDeliveryErrors = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "city",
      "postalCode",
      "deliveryMethod",
    ].some((field) => field in errors);

    if (hasDeliveryErrors) {
      setTouched(
        {
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          address: values.deliveryMethod === "courier",
          city: values.deliveryMethod === "courier",
          postalCode: values.deliveryMethod === "courier",
          deliveryMethod: true,
          paymentMethod: false,
        },
        true,
      );
      return;
    }

    onNext();
  };

  return (
    <div className="bg-cart-bg rounded-[20px] border-[3px] border-checkout-border p-6 flex flex-col gap-4">
      {/* Inputs */}
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

      {/* Delivery Method */}
      <div className="flex flex-col gap-3 mb-4">
        <h4 className="text-xs font-semibold text-quinary uppercase">
          Delivery Method
        </h4>
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

      {/* Address (shown only for courier) */}
      {values.deliveryMethod === "courier" && (
        <div className="bg-delivery-fee p-4 rounded-[14px] border-[3px] border-checkout-border">
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
            <CheckoutInput label="City" name="city" placeholder="Kyiv" />
            <CheckoutInput
              label="ZIP Code"
              name="postalCode"
              placeholder="01001"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-[42%_58%] gap-4 mt-4">
        <PlaceOrderButton
          type="button"
          onClick={() => window.history.back()}
          variant="secondary"
          className="py-3 flex items-center justify-center"
        >
          <HiMiniArrowLongLeft className="text-2xl mr-2 transition-colors" />
          Back
        </PlaceOrderButton>
        <PlaceOrderButton
          onClick={handleContinue}
          disabled={!canContinue}
          className="py-3"
        >
          Continue to Payment
        </PlaceOrderButton>
      </div>
    </div>
  );
};

export default DeliveryStep;

type DeliveryStepFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: "courier" | "pickup";
  paymentMethod: "card" | "cash" | "apple";
};
