import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const ModalDetail = ({ isOpen, closeModal, detailData }) => {
  const isDisabled = true;
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
                <Dialog.Panel className="w-full max-w-[33.75rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <MdClose
                    className="absolute text-xl top-6 right-6 cursor-pointer"
                    onClick={closeModal}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold pt-8 mb-3"
                  >
                    Detail Pesanan
                  </Dialog.Title>
                  <hr className="mb-6" />
                  <div className="mb-6">
                    <p className="mb-1">
                      Pesanan:{" "}
                      {`${new Date(detailData?.createdAt).getDate()} - ${
                        new Date(detailData?.createdAt).getMonth() + 1
                      } - ${new Date(
                        detailData?.createdAt
                      ).getFullYear()}`}{" "}
                      / {detailData?.order_code}
                    </p>
                    <p className="mb-1">
                      {detailData?.order_details[0]?.products.product_name}
                    </p>
                    <p className="mb-4">
                      {
                        detailData?.order_details[0]?.products.jenis_products
                          .jenis_product_name
                      }
                    </p>
                    <figure className="p-6 rounded-xl border border-orange-900/70">
                      <img
                        src={`data:image/jpg;base64,${detailData?.order_details[0]?.products.product_image}`}
                        alt={`nama`}
                        className="w-full"
                      />
                    </figure>
                  </div>

                  <form>
                    <div className="mb-5">
                      <label
                        htmlFor="ukuran"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Ukuran Produk
                      </label>
                      <div className="grid grid-cols-3 gap-x-3">
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              name="panjang"
                              className={`input-field-xs ${
                                isDisabled ? "!bg-secondary-600" : "!bg-white"
                              }`}
                              value={
                                detailData?.order_details[0]?.p1 === null
                                  ? "0"
                                  : detailData?.order_details[0]?.p1
                              }
                              disabled={isDisabled}
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              name="lebar"
                              className={`input-field-xs ${
                                isDisabled ? "!bg-secondary-600" : "!bg-white"
                              }`}
                              value={
                                detailData?.order_details[0]?.l1 === null
                                  ? "0"
                                  : detailData?.order_details[0]?.l1
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="relative">
                            <input
                              type="text"
                              name="tinggi"
                              className={`input-field-xs ${
                                isDisabled ? "!bg-secondary-600" : "!bg-white"
                              }`}
                              value={
                                detailData?.order_details[0]?.t1 === null
                                  ? "0"
                                  : detailData?.order_details[0]?.t1
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="jenisProduk"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Jenis Produk
                      </label>
                      <input
                        type="text"
                        name="jenisProduk"
                        id="jenisProduk"
                        className={`input-field-xs ${
                          isDisabled ? "!bg-secondary-600" : "!bg-white"
                        }`}
                        placeholder="Masukkan jenis produk"
                        disabled={isDisabled}
                        value={
                          detailData?.order_details[0]?.products.jenis_products
                            .jenis_product_name
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="bahanProduk"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Bahan Produk
                      </label>
                      <input
                        type="text"
                        name="bahanProduk"
                        id="bahanProduk"
                        className={`input-field-xs ${
                          isDisabled ? "!bg-secondary-600" : "!bg-white"
                        }`}
                        placeholder="Masukkan bahan produk"
                        disabled={isDisabled}
                        value={
                          detailData?.order_details[0]?.products
                            .product_materials.product_material_name
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="finishingProduk"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Finishing Produk
                      </label>
                      <input
                        type="text"
                        name="finishingProduk"
                        id="finishingProduk"
                        className={`input-field-xs ${
                          isDisabled ? "!bg-secondary-600" : "!bg-white"
                        }`}
                        placeholder="Masukkan finishing produk"
                        disabled={isDisabled}
                        value={
                          detailData?.order_details[0]?.products
                            .product_finishings.product_finishing_name
                        }
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDetail;
