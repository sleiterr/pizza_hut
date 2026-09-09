// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useCartStore, selectTotalPrice } from "@/store/cartStore";
import SectionPage from "@/components/Section/SectionPage";
import CheckoutForm, {
  type CheckoutStep,
} from "@/components/Cart/CheckoutForm";
import StepBar from "@/components/Cart/StepBar";

const CheckoutPage = () => {
  const [step, setStep] = useState<CheckoutStep>("delivery");
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const promoCode = useCartStore((state) => state.promoCode);
  const promoDiscount = useCartStore((state) => state.promoDiscount);

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
        <div className="flex flex-col items-center mb-8">
          <h4 className="font-semibold font-heading text-6xl text-quaternary mb-2">
            Checkout
          </h4>
          <span className="block w-62.5 border-t-10 rounded-[30px] border-border-card mb-10" />
        </div>

        <StepBar current={step} />

        <div className="max-w-2xl mx-auto">
          <CheckoutForm
            items={items}
            total={totalPrice}
            promoDiscount={promoDiscount}
            promoCode={promoCode}
            step={step}
            setStep={setStep}
          />
        </div>
      </div>
    </SectionPage>
  );
};

export default CheckoutPage;
