// src/components/Cart/CartSummary.tsx
"use client";

import { useRouter } from "next/navigation";

import { IoIosArrowRoundForward } from "react-icons/io";
import PlaceOrderButton from "@/components/Button/OrderButton";
import DeliveryBadge from "@/components/Cart/DeliveryBadge";

import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/store/cartStore";

const DELIVERY_FEE = 3.99;

type Props = {
  items: CartItem[];
  totalPrice: number;
};

const CartSummary = ({ items, totalPrice }: Props) => {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const handlePlaceOrder = () => {
    // TODO: here we will save the order in Supabase
    clearCart();
    router.push("/confirmation");
  };

  const subtotal = totalPrice;
  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="flex flex-col gap-4">
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
