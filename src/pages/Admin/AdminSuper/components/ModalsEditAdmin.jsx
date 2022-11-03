import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MdClose } from 'react-icons/md';

const ModalsEditAdmin = ({ isOpen, closeModal, submitHandler, idAdmin }) => {
  const isDisabled = true;

  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
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
                    Edit Admin {idAdmin}
                  </Dialog.Title>
                  <hr className="mb-6 border-orange-900" />

                  <form
                    className="mb-2"
                    onSubmit={submitHandler}
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="namaAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Nama Admin
                      </label>
                      <input
                        type="text"
                        name="namaAdmin"
                        id="namaAdmin"
                        className={`input-field-xs ${
                          isDisabled ? '!bg-secondary-600' : '!bg-white'
                        }`}
                        placeholder="Masukkan Nama Admin"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="posisiAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Posisi Admin
                      </label>
                      <input
                        type="text"
                        name="posisiAdmin"
                        id="posisiAdmin"
                        className={`input-field-xs ${
                          isDisabled ? '!bg-secondary-600' : '!bg-white'
                        }`}
                        placeholder="Masukkan Posisi Admin"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="emailAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="emailAdmin"
                        id="emailAdmin"
                        className={`input-field-xs ${
                          isDisabled ? '!bg-secondary-600' : '!bg-white'
                        }`}
                        placeholder="Masukkan Email"
                        disabled={isDisabled}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="pwdOldAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Password Lama
                      </label>
                      <input
                        type="password"
                        name="pwdOldAdmin"
                        id="pwdOldAdmin"
                        className="input-field-xs"
                        placeholder="Masukkan Password Lama"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="pwdNewAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Password Baru
                      </label>
                      <input
                        type="password"
                        name="pwdNewAdmin"
                        id="pwdNewAdmin"
                        className="input-field-xs"
                        placeholder="Masukkan Password Baru"
                        required
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="pwdNewConfirmAdmin"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        name="pwdNewConfirmAdmin"
                        id="pwdNewConfirmAdmin"
                        className="input-field-xs"
                        placeholder="Masukkan Konfirmasi Password Baru"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="button-fill"
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

export default ModalsEditAdmin;