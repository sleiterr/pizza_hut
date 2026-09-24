import { Modal } from "@/components/Modal/Modal";
import FormSuport from "./FormSuport";

const SuportModal = ({ onClose, task }: ModalNewEventProps) => {
  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <div className="shrink-0 flex items-center justify-start -ml-4">
          <img
            src="/logo/logo_pizza.svg"
            alt="logo"
            className="object-contain w-19.75 h-16.75"
          />
          <span className="font-fugaz font-medium text-2xl text-logo">
            pizza hut
          </span>
        </div>
        <div className="self-center">
          <button onClick={onClose} className="font-bold cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-modal-icon-close w-6 h-6 hover:text-stone-700 transition-colors duration-300"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-6">
        <p className="font-oswald font-medium text-tertiary text-[11px] uppercase tracking-[3px] mb-1">
          We'd love to hear from you
        </p>
        <h2 className="font-fugaz text-[34px] text-gray-900 leading-tight">
          Get In Touch
        </h2>
        <div className="w-20 h-1 bg-border-card rounded-full mt-2" />
      </div>
      <div className="flex flex-col">
        <FormSuport onClose={onClose} />
      </div>
    </Modal>
  );
};

export default SuportModal;

type ModalNewEventProps = {
  onClose: () => void;
  task?: {
    id: string;
    title: string;
    start: { toPlainDate: () => any; toPlainTime: () => any };
    end: { toPlainDate: () => any; toPlainTime: () => any };
    employeeId?: string | null;
  };
};
