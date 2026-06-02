import React from "react";
import CardBooking from "./CardBooking";
import BookingContent from "./BookingContent";
import BookingForm from "./BookingForm";

const Booking = () => {
  return (
    <>
      <CardBooking>
        <BookingContent />
        <div className="">
          <BookingForm />
        </div>
      </CardBooking>
    </>
  );
};

export default Booking;
