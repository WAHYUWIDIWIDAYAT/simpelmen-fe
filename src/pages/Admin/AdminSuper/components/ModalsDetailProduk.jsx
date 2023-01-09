import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const ModalsDetailProduk = ({ isOpen, closeModal, detailData }) => {
  console.log(detailData);
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
                <Dialog.Panel className="w-full max-w-[30rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <MdClose
                    className="absolute text-xl top-6 right-6 cursor-pointer"
                    onClick={closeModal}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold pt-10 mb-6 text-center"
                  >
                    Detail Produk
                  </Dialog.Title>
                  <figure className="w-[80%] mx-auto mb-6">
                    <img
                      src={`data:image/jpg;base64,${detailData?.product_image}`}
                      alt={`product_image`}
                      className="w-full"
                    />
                  </figure>
                  <div className="text-center mb-6">
                    <p className="mb-2">{detailData?.product_name}</p>
                    <p className="mb-0">
                      {detailData?.product_categories.product_category_name}
                    </p>
                  </div>
                  <div className="w-full bg-orange-600 rounded-lg p-4 text-center">
                    <h6 className="text-white mb-3">Spesifikasi Produk</h6>
                    <p className="text-white">
                      {detailData?.product_description}
                    </p>
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

export default ModalsDetailProduk;
