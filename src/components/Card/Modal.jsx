import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({
  id,
  isOpen,
  closeModal,
  handleAccept,
  titleModal,
  captionModal,
  btnCancelCaption,
  btnAcceptCaption,
  isErrorModal,
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[22.5rem] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-center"
                  >
                    {titleModal} {id}
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-gray-500 text-center">{captionModal}</p>
                  </div>

                  <div className="mt-5 flex gap-x-5 justify-center items-center">
                    {!isErrorModal && (
                      <button
                        type="button"
                        className="button-white-sm"
                        onClick={closeModal}
                      >
                        {btnCancelCaption}
                      </button>
                    )}
                    <button
                      type="button"
                      className="button-fill-sm"
                      onClick={handleAccept}
                    >
                      {btnAcceptCaption}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
