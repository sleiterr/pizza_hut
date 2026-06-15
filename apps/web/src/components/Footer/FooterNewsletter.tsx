import React from "react";
import NewsForm from "./NewsForm";

const newsContent = [
  {
    title: "Newsletter",
    titleClass: "font-heading font-semibold text-2xl text-primary",
    subtitle: "Get recent news and updates.",
    subtitleClass: "font-normal text-base text-primary mt-11",
  },
];

const FooterNewsletter = () => {
  return (
    <div className="flex w-full max-w-sm flex-col items-start justify-start">
      <NewsItem />
      <NewsForm />
    </div>
  );
};

const NewsItem = () => {
  return (
    <>
      {newsContent.map((item, index) => (
        <div key={index}>
          <h4 className={item.titleClass}>{item.title}</h4>
          <span className="block w-29.5 border-t-[5px] rounded-[30px] border-border-card" />
          <p className={item.subtitleClass}>{item.subtitle}</p>
        </div>
      ))}
    </>
  );
};

export default FooterNewsletter;
