// src/components/Cart/Cart.tsx
"use client";

import { useEffect, useState } from "react";
import { useCartStore, selectTotalPrice } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);

  // useEffect to set isHydrated to true after the component mounts
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // If the component is not hydrated yet, show a loading state
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4">🛒</div>
          <p className="font-heading text-secondary">Loading cart...</p>
        </div>
      </div>
    );
  }

  // If the cart is empty, show a message indicating that the cart is empty
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="text-7xl">🛒</div>
        <p className="font-normalfont-heading text-3xl text-quinary">
          Your cart is empty
        </p>
        <p className="font-normal text-senary text-lg">
          Go back and add some delicious items!
        </p>
      </div>
    );
  }

  // Render the cart items and the order summary
  return (
    <div className="grid grid-cols-1 gap-8 lg:min-h-0 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* Left: cart items */}
      <div className="cart-scrollbar flex flex-col gap-4 lg:min-h-0 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto lg:pr-2">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      {/* Right: order summary */}
      <CartSummary items={items} totalPrice={totalPrice} />
    </div>
  );
};

export default Cart;
