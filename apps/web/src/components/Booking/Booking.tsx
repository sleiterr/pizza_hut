import React from "react";
import SectionPage from "../Section/SectionPage";
import CardBooking from "./CardBooking";
import BookingContent from "./BookingContent";
import BookingForm from "./BookingForm";

const Booking = () => {
  return (
    <SectionPage>
      <CardBooking>
        <BookingContent />
        <div className="">
          <BookingForm />
        </div>
      </CardBooking>
    </SectionPage>
  );
};

export default Booking;
