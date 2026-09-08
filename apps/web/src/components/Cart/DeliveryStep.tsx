// src/components/Cart/DeliveryStep.tsx
"use client";

import { useFormikContext } from "formik";
import CheckoutInput from "./CheckoutInput";
import DeliveryMethodCard from "./DeliveryMethodCard";
import PlaceOrderButton from "@/components/Button/OrderButton";
import { MdOutlinePlace } from "react-icons/md";

type DeliveryStepProps = {
  onNext: () => void;
};

const DeliveryStep = ({ onNext }: DeliveryStepProps) => {
  const { values, setFieldValue } = useFormikContext<DeliveryStepFormValues>();

  return (
    <div className="bg-cart-bg rounded-[20px] border-[3px] border-checkout-border p-6 flex flex-col gap-4">
      {/* Інпути */}
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

      {/* Адреса (показується тільки для courier) */}
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

      {/* Кнопки */}
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 border-2 border-border-btn text-quaternary rounded-lg py-2 hover:border-discount-price transition-colors font-semibold"
        >
          ← Back
        </button>
        <PlaceOrderButton onClick={onNext}>
          Continue to Payment →
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
