"use client";

import React from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export function Modal({
  show,
  children,
  onClose,
  classDialogPanel,
}: ModalProps) {
  return (
    <Transition show={show}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center"
        onClose={onClose}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 backdrop-blur-[6px]"
            style={{ background: "rgba(0, 0, 0, 0.55)" }}
          />
        </TransitionChild>

        <DialogPanel
          className={clsx(
            "relative transform overflow-hidden rounded-lg bg-modal-event-bg shadow-xl transition-all pt-4 pb-6 px-6 mx-auto sm:my-10 w-full max-w-135",
            classDialogPanel,
          )}
        >
          {children}
        </DialogPanel>
      </Dialog>
    </Transition>
  );
}

type ModalProps = {
  show: boolean;
  children: React.ReactNode;
  onClose: () => void;
  classDialogPanel?: string;
};
