import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const ModalsSpesifikasi = ({
  isOpen,
  closeModal,
  submitHandler,
  content,
  handleChangeProduct,
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
                    Tambah Spesifikasi
                  </Dialog.Title>
                  <hr className="mb-6 border-orange-900" />

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
                            className="input-field-xs !pr-12"
                            placeholder="Bentuk"
                            onChange={handleChangeProduct}
                            name="shape"
                          />
                          <label
                            htmlFor="ukuranLA"
                            className="block mb-2 text-sm font-medium text-gray-700 mt-5"
                          >
                            Ukuran Produk (Luar / Atas)
                          </label>
                          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name={content.length1}
                                className="input-field-xs !pr-12"
                                placeholder="Panjang"
                                onChange={handleChangeProduct}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name={content.width1}
                                className="input-field-xs !pr-12"
                                placeholder="Lebar"
                                onChange={handleChangeProduct}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name={content.heigth1}
                                className="input-field-xs !pr-12"
                                placeholder="Tinggi"
                                onChange={handleChangeProduct}
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
                                name={content.length2}
                                className="input-field-xs !pr-12"
                                placeholder="Panjang"
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name={content.width2}
                                className="input-field-xs !pr-12"
                                placeholder="Lebar"
                                onChange={handleChangeProduct}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                            <div className="relative col-span-3 xs:col-span-1">
                              <input
                                type="text"
                                name={content.height2}
                                className="input-field-xs !pr-12"
                                placeholder="Tinggi"
                                onChange={handleChangeProduct}
                              />
                              <span className="text-gray-400 absolute right-3 top-[11px]">
                                cm
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="deskripsiProduk"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Deskripsi Produk
                          </label>
                          <textarea
                            name={content.description}
                            id="deskripsiProduk"
                            cols="30"
                            rows="4"
                            className="input-field-xs"
                            placeholder="Masukkan Deskripsi Produk"
                            onChange={handleChangeProduct}
                          ></textarea>
                        </div>
                      </>
                    ) : (
                      <div className="mb-5">
                        <label
                          htmlFor={content.html}
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          {content.label} Produk
                        </label>
                        <input
                          type="text"
                          name={content.name}
                          id={content.id}
                          className="input-field-xs"
                          placeholder={content.placeholder}
                          required
                          onChange={handleChangeProduct}
                        />
                      </div>
                    )}
                    {content.type === "kategori" ? (
                      <div className="mb-8">
                        <label
                          htmlFor={content.kode}
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Kode Produk
                        </label>
                        <input
                          type="text"
                          name={content.kode}
                          id={content.kode}
                          className="input-field-xs"
                          placeholder="Masukkan Kode Produk"
                          required
                          onChange={handleChangeProduct}
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
                        Tambahkan
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

export default ModalsSpesifikasi;
