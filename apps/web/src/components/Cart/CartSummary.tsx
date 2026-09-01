// src/components/Cart/CartSummary.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoIosArrowRoundForward } from "react-icons/io";
import PlaceOrderButton from "@/components/Button/OrderButton";
import DeliveryBadge from "@/components/Cart/DeliveryBadge";
import PromoInput from "./PromoInput";

import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/store/cartStore";
import { toast } from "react-toastify";

const DELIVERY_FEE = 3.99;

type Props = {
  items: CartItem[];
  totalPrice: number;
};

const CartSummary = ({ items, totalPrice }: Props) => {
  const [promoInputValue, setPromoInputValue] = useState(""); // локальний input
  const [promoApplied, setPromoApplied] = useState(false);

  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const setPromo = useCartStore((state) => state.setPromo);
  const promoDiscount = useCartStore((state) => state.promoDiscount);

  const subtotal = totalPrice;
  const discount = subtotal * promoDiscount;
  const total = subtotal - discount + DELIVERY_FEE;

  const handleAppPromo = () => {
    if (promoInputValue.trim().toUpperCase() === "BURGER10") {
      setPromo("BURGER10", 0.1); // зберігаємо в store
      setPromoApplied(true);
      setPromoInputValue(""); // очищуємо input
      toast.success("Promo code applied! 10% discount on your order.");
    } else {
      toast.error("Invalid promo code. Please try again.");
    }
  };

  const handlePlaceOrder = () => {
    // TODO: here we will save the order in Supabase
    // clearCart();
    router.push("/checkout");

    console.log({
      items,
      subtotal,
      discount,
      total,
      promoApplied,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <PromoInput
        value={promoInputValue}
        onChange={setPromoInputValue}
        onApply={handleAppPromo}
        isApplied={promoApplied}
        isLoading={false}
      />
      {/* Summary card */}
      <div className="bg-cart-bg rounded-[20px] border-[3px] border-border-card p-5">
        <h3 className="font-semibold font-heading text-2xl text-quaternary mb-4">
          Order Summary
        </h3>

        {/* Item breakdown */}
        <div className="flex flex-col gap-2 mb-4 max-h-75 overflow-y-auto">
          {items.map((item) => {
            const price = item.discountPrice ?? item.price;
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center"
              >
                <span className="text-quinary text-sm truncate max-w-45">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-heading text-quinary text-sm shrink-0">
                  ${(price * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="border-t-2 border-dashed border-cart-border pt-3 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-quinary text-sm">Subtotal</span>
            <span className="font-heading text-senary text-sm">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          {promoApplied && (
            <div className="flex justify-between">
              <span className="text-green-500 text-sm">Promo (BURGER10)</span>
              <span className="font-heading text-green-500 text-sm">
                -${discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-quinary text-sm">Delivery</span>
            <span className="font-heading text-quinary text-sm">
              ${DELIVERY_FEE.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="border-t-2 border-cart-border mt-3 pt-3 flex justify-between items-center">
          <span className="font-semibold font-heading text-lg text-quaternary">
            Total
          </span>
          <span className="font-semibold font-heading text-2xl text-quaternary">
            <span className="text-tertiary">$</span>
            {total.toFixed(2)}
          </span>
        </div>
        {/* Btn add order */}
        <div className="mt-4">
          <PlaceOrderButton onClick={handlePlaceOrder}>
            Place Order
            <IoIosArrowRoundForward className="inline-block ml-2" size={24} />
          </PlaceOrderButton>

          <p className="text-center text-xs text-senary mt-4">
            🔒 Secure checkout · Free returns
          </p>
        </div>
      </div>

      {/* Delivery badge */}
      <DeliveryBadge />
    </div>
  );
};

export default CartSummary;
