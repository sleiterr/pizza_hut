import Rating from "@/components/Hero/Rating";
import type { CartItem as CartItemType } from "@/store/cartStore";

const CartItemInfo = ({ item, activePrice }: CartItemInfoProps) => {
  return (
    <div className="flex-1 min-w-0">
      {item.rating != null && <Rating rating={item.rating} />}
      <h3 className="font-semibold font-heading text-xl text-quaternary mt-1">
        {item.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-quaternary/70">
        {item.description?.trim() || "Description not available."}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-2 mt-2">
        {item.discountPrice != null && (
          <span className="font-semibold font-heading text-sm line-through text-secondary">
            ${item.price.toFixed(2)}
          </span>
        )}
        <span className="font-bold font-heading text-2xl text-senary">
          <span className="text-tertiary">$</span>
          {activePrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItemInfo;

type CartItemInfoProps = {
  item: CartItemType;
  activePrice: number;
};
