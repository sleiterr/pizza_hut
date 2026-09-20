import { Modal } from "@/components/Modal/Modal";
import FormSuport from "./FormSuport";

const SuportModal = ({ onClose, task }: ModalNewEventProps) => {
  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <div className="">
          <h4 className="font-medium text-lg text-modal-title">
            {task ? "Edit Event" : "Add New Event"}
          </h4>
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
