const cartText = [
  {
    id: 1,
    title: " Shopping Cart",
    subtitle: "Your Selection",
    titleClass: "font-semibold font-heading text-6xl text-quaternary ",
    subtitleClass: "font-semibold font-heading text-xl text-tertiary uppercase",
  },
];

const CartPageHeader = () => {
  return (
    <>
      <CartPageItem />
    </>
  );
};

export default CartPageHeader;

const CartPageItem = () => {
  return (
    <>
      {cartText.map((item) => (
        <div className="flex flex-col items-start" key={item.id}>
          <p className={item.subtitleClass}>{item.subtitle}</p>
          <h2 className={item.titleClass}>{item.title}</h2>
          <span className="block w-62.5 border-t-10 rounded-[30px] border-border-card mt-4" />
        </div>
      ))}
    </>
  );
};
