"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useCartStore, selectTotalItems } from "@/store/cartStore";
import CtaContact from "@/components/Button/CtaContact";
import SuportModal from "@/components/ModalSupport/SuportModal";

const CartAndActions = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <CtaContact
        className={clsx("bg-cta-secondary", "hover:bg-cta-secondary-hover")}
        onClick={() => setIsOpen(true)}
      >
        Contact Us
      </CtaContact>
      {isOpen && <SuportModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default CartAndActions;
