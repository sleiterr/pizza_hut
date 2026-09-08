import clsx from "clsx";

type Step = "delivery" | "payment" | "confirm";

const STEPS: Step[] = ["delivery", "payment", "confirm"];
const STEP_LABELS = ["Delivery", "Payment", "Confirm"];

const StepBar = ({ current }: StepBarProps) => {
  const idx = STEPS.indexOf(current);

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;

        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              {/* CIRKLE */}
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  done && "bg-discount-price text-black",
                  active && "bg-tertiary text-white",
                  !done && !active && "bg-border-btn text-quinary",
                )}
              >
                {done ? "✓" : i + 1}
              </div>
              {/* LABEL */}
              <span
                className={clsx(
                  "text-xs uppercase font-semibold",
                  active && "text-tertiary",
                  done && "text-discount-price",
                  !done && !active && "text-quinary",
                )}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
            {/* LINE */}
            {i < STEPS.length - 1 && (
              <div
                className={clsx(
                  "w-16 h-1 rounded-full mx-2 mb-6 transition-all",
                  i < idx ? "bg-discount-price" : "bg-border-btn",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;

type StepBarProps = {
  current: Step;
};
