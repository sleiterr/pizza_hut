// src/components/Cart/PaymentStep.tsx
"use client";

import { useFormikContext } from "formik";
import CheckoutInput from "./CheckoutInput";
import DeliveryMethodCard from "./DeliveryMethodCard";
import PlaceOrderButton from "@/components/Button/OrderButton";

import { HiMiniArrowLongLeft } from "react-icons/hi2";

type PaymentStepProps = {
  onNext: () => void;
  onBack: () => void;
};

const PaymentStep = ({ onNext, onBack }: PaymentStepProps) => {
  const { values, setFieldValue } = useFormikContext<PaymentFormValues>();

  // Format card number
  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  // Format expiry date string
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };
  // Validate payment fields based on the selected payment method
  const validate = () => {
    if (values.paymentMethod === "card") {
      return (
        values.cardNumber.replace(/\s/g, "").length === 16 &&
        values.cardName.trim() &&
        values.expiry.length === 5 &&
        values.cvv.length === 3
      );
    }
    return true;
  };

  return (
    <div className="bg-cart-bg rounded-[20px] border-[3px] border-checkout-border p-6 flex flex-col gap-4">
      <h2 className="font-heading text-2xl text-quaternary mb-2">
        Payment Method
      </h2>

      {/* Payment method selection */}
      <div className="flex flex-col gap-3">
        <DeliveryMethodCard
          selected={values.paymentMethod === "card"}
          onSelect={() => setFieldValue("paymentMethod", "card")}
          icon="💳"
          title="Credit / Debit Card"
          subtitle="Visa, Mastercard, Amex"
        />
        <DeliveryMethodCard
          selected={values.paymentMethod === "apple"}
          onSelect={() => setFieldValue("paymentMethod", "apple")}
          icon="📱"
          title="Apple Pay / Google Pay"
          subtitle="One-tap secure payment"
        />
        <DeliveryMethodCard
          selected={values.paymentMethod === "cash"}
          onSelect={() => setFieldValue("paymentMethod", "cash")}
          icon="💵"
          title="Cash on Delivery"
          subtitle="Pay when your order arrives"
        />
      </div>

      {/* fields for */}
      {values.paymentMethod === "card" && (
        <div className="flex flex-col gap-4 p-5 bg-form-bg rounded-[14px] border-2 border-border-btn">
          {/* Card Preview */}
          <div
            className="relative w-full h-35 rounded-2xl overflow-hidden flex flex-col justify-between p-5"
            style={{ background: "var(--gradient-accent-surface)" }}
          >
            <div className="flex justify-between items-start">
              <span className="text-white text-xs opacity-60">Your Card</span>
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <p className="text-white text-lg tracking-widest font-bold mb-2">
                {values.cardNumber || "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between items-end">
                <p className="text-white text-xs opacity-60">
                  {values.cardName || "CARDHOLDER NAME"}
                </p>
                <p className="text-white text-xs opacity-60">
                  {values.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          {/* Card input fields */}
          <CheckoutInput
            label="Card Number"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            onChange={(e) =>
              setFieldValue("cardNumber", formatCard(e.target.value))
            }
          />

          <CheckoutInput
            label="Cardholder Name"
            name="cardName"
            placeholder="OLENA KOVALENKO"
            onChange={(e) =>
              setFieldValue("cardName", e.target.value.toUpperCase())
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <CheckoutInput
              label="Expiry"
              name="expiry"
              placeholder="MM/YY"
              onChange={(e) =>
                setFieldValue("expiry", formatExpiry(e.target.value))
              }
            />
            <CheckoutInput
              label="CVV"
              name="cvv"
              type="password"
              placeholder="•••"
              onChange={(e) =>
                setFieldValue(
                  "cvv",
                  e.target.value.replace(/\D/g, "").slice(0, 3),
                )
              }
            />
          </div>
        </div>
      )}

      {/* Apple Pay info */}
      {values.paymentMethod === "apple" && (
        <div className="text-center p-6 bg-form-bg rounded-lg">
          <p className="text-4xl mb-2">📱</p>
          <p className="font-normal text-quinary text-sm">
            You will be redirected to complete payment securely
          </p>
        </div>
      )}

      {/* Cash info */}
      {values.paymentMethod === "cash" && (
        <div className="flex gap-4 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <span className="text-3xl">💵</span>
          <p className="text-sm text-quinary">
            Please have the exact amount ready. Our courier carries limited
            change.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-[42%_55%] gap-4 mt-4">
        <PlaceOrderButton
          type="button"
          onClick={onBack}
          variant="secondary"
          className="py-3 flex items-center justify-center"
        >
          <HiMiniArrowLongLeft className="text-xl mr-2" /> Back
        </PlaceOrderButton>
        <PlaceOrderButton onClick={onNext} disabled={!validate()}>
          Continue to Confirm
        </PlaceOrderButton>
      </div>
    </div>
  );
};

export default PaymentStep;

type PaymentFormValues = {
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
