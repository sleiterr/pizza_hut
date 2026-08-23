// src/components/Cart/CartItem.tsx
"use client";

import { IoClose } from "react-icons/io5";

import Image from "next/image";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import type { CartItem as CartItemType } from "@/store/cartStore";
import QuantityStepper from "@/components/Cart/QuantityStepper";
import CartItemInfo from "@/components/Cart/CartItemInfo";

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  // Access the removeItem and updateQuantity functions from the cart store
  const removeItem = useCartStore((state) => state.removeItem);
  // Access the updateQuantity function from the cart store
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // Determine the active price of the item, using the discount price if available
  const activePrice = item.discountPrice ?? item.price;

  const handleRemove = () => {
    removeItem(item.productId);
    toast.info(`${item.name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="relative flex gap-5 bg-cart-bg rounded-[20px] border-[3px] border-cart-border p-4">
      {/* Image */}
      <div className="relative shrink-0 w-30 h-30 rounded-[14px] overflow-hidden">
        <span className="absolute h-22.5 w-22.5 rounded-full bg-cta-primary-hover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain relative"
          />
        )}
      </div>

      {/* Info */}
      <CartItemInfo item={item} activePrice={activePrice} />

      {/* Right controls */}
      <div className="flex flex-col items-end justify-between shrink-0">
        {/* Remove */}
        <button
          onClick={handleRemove}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-close hover:bg-red-500 transition-colors cursor-pointer group"
          aria-label="Remove item"
        >
          <IoClose className="w-4 h-4 text-close-icon group-hover:text-white transition-colors" />
        </button>

        {/* Qty stepper */}

        <QuantityStepper
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            updateQuantity(item.productId, newQuantity)
          }
        />

        {/* Line total */}
        <span className="font-semibold font-heading text-lg text-total-price">
          ${(activePrice * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
