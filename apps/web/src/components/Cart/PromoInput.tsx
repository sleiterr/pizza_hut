"use client";

import clsx from "clsx";

const PromoInput = ({
  value,
  onChange,
  onApply,
  isApplied,
  isLoading,
}: PromoInputProps) => {
  return (
    <div className="bg-cart-bg rounded-[20px] border-[3px] border-border-card p-5">
      <h3 className="font-semibold font-heading text-lg text-quaternary mb-3">
        Promo Code
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. BURGER10"
          disabled={isApplied}
          className={clsx(
            "flex border-2 rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors",
            "bg-white font-semibold text-secondary",
            isApplied
              ? "border-green-500 focus:border-green-500 cursor-not-allowed"
              : "border-border-btn focus:border-discount-price",
          )}
        />
        <button
          onClick={onApply}
          disabled={isApplied || isLoading}
          className={clsx(
            "bg-discount-price text-black text-sm rounded-lg px-4 py-2 font-semibold hover:bg-tertiary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "bg-gray-400 cursor-not-allowed": isApplied || isLoading,
            },
          )}
        >
          {isLoading ? "..." : "Apply"}
        </button>
      </div>
      {isApplied && (
        <p className="text-green-500 text-xs mt-4">Promo code applied !</p>
      )}
    </div>
  );
};

export default PromoInput;

type PromoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  isApplied: boolean;
  isLoading: boolean;
};
