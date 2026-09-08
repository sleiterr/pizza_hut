// src/components/Cart/ConfirmStep.tsx
"use client";

import { useFormikContext } from "formik";
import PlaceOrderButton from "@/components/Button/OrderButton";
import type { CartItem } from "@/store/cartStore";

type ConfirmStepProps = {
  items: CartItem[];
  total: number;
  promoDiscount: number;
  onBack: () => void;
  onConfirm: () => void | Promise<void>;
  isSubmitting: boolean;
};

const DELIVERY_FEE = 3.99;

const ConfirmStep = ({
  items,
  total,
  promoDiscount,
  onBack,
  onConfirm,
  isSubmitting,
}: ConfirmStepProps) => {
  const { values } = useFormikContext<ConfirmStepFormValues>();

  const handleConfirmClick = async () => {
    await onConfirm();
  };

  const deliveryFee = values.deliveryMethod === "pickup" ? 0 : DELIVERY_FEE;
  const discountAmount = promoDiscount * total;
  const finalTotal = total - discountAmount + deliveryFee;
  const orderNum = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Анімація 🎉 */}
      <div
        className="w-24 h-24 rounded-full bg-discount-price flex items-center justify-center text-5xl"
        style={{
          animation: "confirm-pop 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both",
        }}
      >
        🎉
      </div>

      {/* Thank you text */}
      <div className="text-center">
        <h2 className="font-heading text-4xl text-quaternary">
          Order Placed !
        </h2>
        <p className="text-quinary text-base mt-2">
          Thank you,{" "}
          <strong className="text-quaternary">{values.firstName}</strong>! We
          are preparing your food 🍔
        </p>
      </div>

      {/* Order Number */}
      <div className="bg-primary border-2 border-border-btn text-center rounded-[16px] px-8 py-4 w-full max-w-sm">
        <p className="text-quinary text-xs uppercase tracking-widest">
          Order Number
        </p>
        <p className="font-heading text-discount-price text-4xl mt-2">
          #{orderNum}
        </p>
      </div>

      {/* Products */}
      <div className="w-full max-w-sm bg-cart-bg border-[3px] border-discount-price rounded-[16px] overflow-hidden">
        <div className="px-5 py-3 border-b border-border-btn">
          <p className="font-heading text-lg text-quaternary">Your Order</p>
        </div>

        <div className="max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-3 px-5 py-3 border-b border-border-btn last:border-0"
            >
              {/* image of the product */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-[8px] object-cover"
                />
              )}
              <span className="flex-1 text-sm text-quinary">
                {item.name} × {item.quantity}
              </span>
              <span className="font-heading text-sm text-quaternary">
                $
                {((item.discountPrice ?? item.price) * item.quantity).toFixed(
                  2,
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-2 px-5 py-3 bg-primary border-t border-border-btn text-sm">
          {promoDiscount > 0 && (
            <div className="flex justify-between text-green-500">
              <span>Promo Discount:</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-quinary">
            <span>Delivery:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-border-btn pt-2">
            <span className="font-heading text-quaternary">Total:</span>
            <span className="font-heading text-2xl text-quaternary">
              <span className="text-tertiary">$</span>
              {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      {values.deliveryMethod === "courier" && (
        <div className="flex items-center gap-4 bg-primary border-2 border-border-btn rounded-[14px] px-5 py-4 w-full max-w-sm">
          <span className="text-4xl">🛵</span>
          <div>
            <p className="font-heading text-quaternary text-base">
              Delivering to
            </p>
            <p className="text-quinary text-xs">
              {values.address}, {values.city} {values.postalCode}
            </p>
            <p className="text-discount-price font-heading text-xs mt-1">
              Estimated: 25–35 min
            </p>
          </div>
        </div>
      )}

      {values.deliveryMethod === "pickup" && (
        <div className="flex items-center gap-4 bg-primary border-2 border-border-btn rounded-[14px] px-5 py-4 w-full max-w-sm">
          <span className="text-4xl">🏪</span>
          <div>
            <p className="font-heading text-quaternary text-base">
              Ready for Pickup
            </p>
            <p className="text-discount-price font-heading text-xs">
              Estimated: 15 min
            </p>
          </div>
        </div>
      )}

      {/* Кнопки */}
      <div className="flex gap-2 w-full max-w-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-border-btn text-quaternary rounded-lg py-3 hover:border-discount-price transition-colors font-semibold"
        >
          ← Back
        </button>
        <PlaceOrderButton onClick={handleConfirmClick} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Confirm Order →"}
        </PlaceOrderButton>
      </div>

      <style>{`
        @keyframes confirm-pop {
          0%  { transform: scale(0) rotate(-20deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(6deg); }
          100%{ transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ConfirmStep;

type ConfirmStepFormValues = {
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
