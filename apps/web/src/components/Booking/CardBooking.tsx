import React from "react";

const CardBooking = ({ children, className }: CardBookingProps) => {
  return (
    <div
      className={`w-full h-auto max-w-325 min-h-92.75 mx-auto px-14 py-16 rounded-[10px] grid grid-cols-2 ${className}`}
      style={{
        backgroundImage: "url('/background/background_form.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default CardBooking;

type CardBookingProps = {
  children: React.ReactNode;
  className?: string;
};
