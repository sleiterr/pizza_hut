"use client";

import clsx from "clsx";
import CtaModal from "@/components/Button/CtaModal";
import Link from "next/link";
import { useCartStore, selectTotalItems } from "@/store/cartStore";

const CartAndActions = () => {
  const cartCount = useCartStore(selectTotalItems);

  return (
    <>
      <Link href="/cart" className="relative flex items-center justify-center">
        <img src="/icons/cart/cart.svg" alt="Cart" className="w-8 h-10" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-1 w-4.5 h-4.5 flex items-center justify-center bg-count text-quaternary text-xs font-oswald font-medium rounded-full px-1">
            {cartCount}
          </span>
        )}
      </Link>
      <CtaModal
        className={clsx("bg-cta-secondary", "hover:bg-cta-secondary-hover")}
      >
        Contact Us
      </CtaModal>
    </>
  );
};

export default CartAndActions;
