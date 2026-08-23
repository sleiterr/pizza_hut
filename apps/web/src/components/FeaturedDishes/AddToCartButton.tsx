// src/components/FeaturedDishes/AddToCartButton.tsx
"use client";

import { FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";

type AddToCartButtonProps = {
  productId: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  rating?: number;
};

const AddToCartButton = ({
  productId,
  slug,
  name,
  description,
  imageUrl,
  price,
  discountPrice,
  rating,
}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      productId,
      slug,
      name,
      description,
      imageUrl,
      price,
      discountPrice,
      rating,
    });

    // Toast сповіщення
    toast.success(`${name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  return (
    <button
      className="flex items-center justify-center bg-discount-price rounded-[7px] w-12.5 h-12.5 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleAdd}
      aria-label="Add to cart"
    >
      <FaShoppingBag className="w-4 h-4.75" />
    </button>
  );
};

export default AddToCartButton;
