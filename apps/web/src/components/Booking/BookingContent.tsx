import React from "react";

const bookingData = [
  {
    id: 1,
    title: "Reserve a Table",
    text: "Discover our New Menu !",
    titleClass:
      "font-heading font-semibold text-quaternary text-5xl uppercase leading-[50px]",
    textClass: "font-normal text-quaternary text-lg",
  },
];

const BookingContent = () => {
  return ( 
    <div>
      <BookingData />
    </div>
  );
};

const BookingData = () => {
  return (
    <>
      {bookingData.map((item) => (
        <div key={item.id} className="">
          <div className="border-b-[3px] border-border-card w-47.5 mb-7">
            <h2 className={item.titleClass}>{item.title}</h2>
          </div>
          <p className={item.textClass}>{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default BookingContent;
