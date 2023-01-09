import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const ModalResi = ({
  isOpen,
  closeModal,
  submitHandler,
  changeHandler,
  data,
  id,
}) => {
  const filteredData = data?.filter((item) => item.order_id === id)[0];

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
                    className="text-2xl font-bold pt-8 mb-2"
                  >
                    Tambah Resi
                  </Dialog.Title>
                  <hr className="mb-6" />

                  <form onSubmit={submitHandler}>
                    <div className="mb-5 relative">
                      <label
                        htmlFor="kurir"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Kurir Pengiriman
                      </label>
                      <select
                        name="kurir"
                        id="kurir"
                        className="input-field-select-xs"
                        required
                        onChange={changeHandler}
                        value={
                          filteredData?.delivery_details[0]
                            ?.delivery_detail_courier
                        }
                      >
                        <option value="1">
                          {
                            filteredData?.delivery_details[0]
                              ?.delivery_detail_courier
                          }
                        </option>
                      </select>
                      <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="delivery_detail_receipt"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Nomor Resi
                      </label>
                      <input
                        type="text"
                        name="delivery_detail_receipt"
                        id="delivery_detail_receipt"
                        className="input-field-xs"
                        placeholder="Masukkan nomor resi"
                        required
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="delivery_detail_estimate"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Tanggal Estimasi
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="delivery_detail_estimate"
                          id="delivery_detail_estimate"
                          className="input-field-icon-xs"
                          required
                          onChange={changeHandler}
                        />
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 fill-secondary-800"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="button-fill !rounded-full !px-8"
                      >
                        Simpan
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

export default ModalResi;
