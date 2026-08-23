import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

type QuantityStepperProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

const QuantityStepper = ({ quantity, onQuantityChange }: QuantityStepperProps) => {
  // State to trigger animation when quantity changes
  const [animate, setAnimate] = useState(false);

  // Function to handle quantity changes with animation
  const handleQuantityChange = (newQty: number) => {
    setAnimate(true);
    onQuantityChange(newQty);
    setTimeout(() => setAnimate(false), 300);
  };
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        className="w-8 h-8 rounded-full border-2 border-border-btn bg-close flex items-center justify-center font-bold hover:border-discount-price transition-colors cursor-pointer group"
      >
        <FaMinus className="w-4 h-4 text-close-icon group-hover:text-white transition-colors" />
      </button>
      <span
        className={`font-semibold font-heading text-quaternary text-center text-lg w-6 transition-transform ${
          animate ? "scale-125" : "scale-100"
        }`}
      >
        {quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-discount-price hover:bg-cta-primary-hover transition-colors cursor-pointer group"
      >
        <IoMdAdd className="w-4 h-4 text-add-btn group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};

export default QuantityStepper;
