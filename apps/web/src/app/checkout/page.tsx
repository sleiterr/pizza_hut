// src/app/checkout/page.tsx — НОВИЙ ФАЙЛ!
"use client";

import { useCartStore, selectTotalPrice } from "@/store/cartStore";
import SectionPage from "@/components/Section/SectionPage";
import CheckoutForm from "@/components/Cart/CheckoutForm";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);

  if (items.length === 0) {
    return (
      <SectionPage>
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-quaternary">
            Your cart is empty
          </p>
        </div>
      </SectionPage>
    );
  }

  return (
    <SectionPage classSection="bg-bg-cart min-h-screen">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold font-heading text-6xl text-quaternary mb-2">
            Checkout
          </h1>
          <span className="block w-62.5 border-t-10 rounded-[30px] border-border-card mb-10" />
        </div>

        <CheckoutForm
          items={items}
          total={totalPrice + 3.99}
          promoDiscount={0}
        />
      </div>
    </SectionPage>
  );
};

export default CheckoutPage;
