import React from "react";

const timeOpen: TimeOpen[] = [
  {
    id: 1,
    day: "Tuesday - Saturday",
    timeClass: "font-heading font-semibold text-sm text-quaternary",
    hours: "12:00pm - 23:00pm",
    closed: "Closed on Sunday",
    closedClass:
      "font-heading font-semibold text-sm text-quaternary underline mt-3",
    kategory: "5 star rated on TripAdvisor",
  },
];

const FooterInfoCard = () => {
  return (
    <div className="w-full max-w-91.25 h-91 rounded-[30px] bg-app-section px-10 py-8 flex flex-col items-start justify-between">
      <div>
        <span className="font-fugaz font-medium text-2xl text-quaternary">
          pizza hut
        </span>
        <p className="font-fugaz font-normal text-xs text-quaternary uppercase pl-4">
          food & restaurant
        </p>
      </div>
      {timeOpen.map((time) => (
        <div
          key={time.id}
          className="mt-10 flex w-full flex-1 flex-col items-start justify-between"
        >
          <div>
            <p className={time.timeClass}>
              {time.day}:{time.hours}
            </p>
            <p className={time.closedClass}>{time.closed}</p>
          </div>
          <div className="">
            <p className={time.timeClass}>{time.kategory}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterInfoCard;

type TimeOpen = {
  id: number;
  day: string;
  timeClass: string;
  hours: string;
  closed: string;
  closedClass: string;
  kategory: string;
};
