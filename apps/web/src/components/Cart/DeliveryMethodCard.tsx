const DeliveryMethodCard = ({
  selected,
  onSelect,
  icon,
  title,
  subtitle,
}: DeliveryMethodCardProps) => {
  return (
    <button
      onClick={onSelect}
      type="button"
      className={`flex items-center gap-4 p-4 rounded-[14px] border-2 text-left transition-all duration-200 w-full ${
        selected
          ? "border-tertiary bg-tertiary/10"
          : "border-border-btn bg-cart-bg"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${
          selected ? "bg-discount-price" : "bg-border-btn"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-heading text-quaternary">{title}</p>
        <p className="text-sm text-quinary">{subtitle}</p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? "border-tertiary" : "border-quinary"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-tertiary" />}
      </div>
    </button>
  );
};

export default DeliveryMethodCard;

type DeliveryMethodCardProps = {
  selected: boolean;
  onSelect: () => void;
  icon: string;
  title: string;
  subtitle: string;
};
