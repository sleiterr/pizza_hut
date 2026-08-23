import { MdOutlineDeliveryDining } from "react-icons/md";

const DeliveryBadge = () => {
  return (
    <div className="bg-primary rounded-[20px] p-5 flex items-center gap-4 border-[3px] border-cart-border">
      <div className="w-12 h-12 rounded-full bg-discount-price flex items-center justify-center text-2xl shrink-0">
        <MdOutlineDeliveryDining className="w-6 h-6" />
      </div>
      <div>
        <p className="text-white font-heading text-base">Estimated Delivery</p>
        <p className="text-discount-price text-sm">25 – 35 minutes</p>
      </div>
    </div>
  );
};

export default DeliveryBadge;
