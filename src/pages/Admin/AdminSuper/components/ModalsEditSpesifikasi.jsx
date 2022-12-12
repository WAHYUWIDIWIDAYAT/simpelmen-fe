import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const ModalsEditSpesifikasi = ({
  isOpen,
  closeModal,
  submitHandler,
  content,
  handleChangePutProduct,
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
                <Dialog.Panel className="w-full max-w-[32rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <MdClose
                    className="absolute text-xl top-6 right-6 cursor-pointer"
                    onClick={closeModal}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold pt-8 mb-3"
                  >
                    Edit Spesifikasi
                  </Dialog.Title>
                  <hr className="mb-4 border-orange-900" />
                  <form
                    className="mb-2"
                    onSubmit={(e) => submitHandler(e, content.type)}
                  >
                    {content.type === "ukuran" ? (
                      <>
                        <div className="mb-5">
                          <label
                            htmlFor="shape"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Bentuk Produk
                          </label>
                          <input
                            type="text"
                            className="input-field-xs !pr-12 mb-5"
                            placeholder="Bentuk"
                            onChange={handleChangePutProduct}
                            name="shape"
                            defaultValue={content.specificationName}
                          />
                          <label
                            htmlFor="ukuranLA"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Ukuran Produk (Luar / Atas)
                          </label>
                          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="length"
                                className="input-field-xs !pr-12"
                                placeholder="Panjang"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.p1}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="width"
                                className="input-field-xs !pr-12"
                                placeholder="Lebar"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.l1}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="height"
                                className="input-field-xs !pr-12"
                                placeholder="Tinggi"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.t1}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="ukuranDB"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Ukuran Produk (Dalam / Bawah)
                          </label>
                          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="lenght2"
                                className="input-field-xs !pr-12"
                                placeholder="Panjang"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.p2}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="width2"
                                className="input-field-xs !pr-12"
                                placeholder="Lebar"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.l2}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name="height2"
                                className="input-field-xs !pr-12"
                                placeholder="Tinggi"
                                required
                                onChange={handleChangePutProduct}
                                defaultValue={content.t2}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="product_size_description"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Deskripsi Produk
                          </label>
                          <textarea
                            name="product_size_description"
                            id="product_size_description"
                            cols="30"
                            rows="4"
                            className="input-field-xs"
                            placeholder="Masukkan Deskripsi Produk"
                            required
                            onChange={handleChangePutProduct}
                            defaultValue={content.description}
                          ></textarea>
                        </div>
                      </>
                    ) : (
                      <div className="mb-5">
                        <label
                          htmlFor={content.putKey}
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          {content.label} Produk
                        </label>
                        <input
                          type="text"
                          name={content.putKey}
                          id={content.putKey}
                          className="input-field-xs"
                          placeholder={content.placeholder}
                          required
                          onChange={handleChangePutProduct}
                          defaultValue={content.specificationName}
                        />
                      </div>
                    )}
                    {content.type === "kategori" ? (
                      <div className="mb-8">
                        <label
                          htmlFor="kodeProduk"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Kode Produk
                        </label>
                        <input
                          type="text"
                          name="kodeProduk"
                          id="kodeProduk"
                          className="input-field-xs"
                          placeholder="Masukkan Kode Produk"
                          required
                          onChange={handleChangePutProduct}
                          // defaultValue={content.specificationName}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="flex justify-end">
                      <button
                        className={`button-fill ${
                          content.type === "kategori" ? null : "mt-3"
                        }`}
                        type="submit"
                      >
                        Perbarui
                      </button>
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

export default ModalsEditSpesifikasi;
