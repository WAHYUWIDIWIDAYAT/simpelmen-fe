import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ModalChat from './ModalChat';
import { MdClose, MdDelete, MdModeEdit, MdPermMedia } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import './styles.css';
import { useRef } from 'react';
import { adminDesain } from '../../../../services/api';
import { BsFillCloudPlusFill } from 'react-icons/bs';
import ErrorMessage from '../../../../components/Alerts/ErrorMessage';

const Modals = ({
  isOpen,
  closeModal,
  idPesanan,
  tokenUser,
  toggleModalChat,
  openModalChat,
  closeModalChat,
  submitChatHandler,
}) => {
  const isDisabled = true;
  const [filteredData, setFilteredData] = useState(null);
  const dataRef = useRef(null);
  const [validFields, setValidFields] = useState({
    order_design_image: false,
  });
  const [fields, setFields] = useState({
    order_design_image: '',
  });

  const getDataFiltered = async (id, token) => {
    await adminDesain
      .get(`/orders/${id}`, {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const uploadFile = async () => {
    await adminDesain
      .put(
        `/orders/ganti-desain/${idPesanan}`,
        { product_image: fields.order_design_image },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': `${tokenUser}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleFile = (e) => {
    if (e.target.files[0] !== '' && e.target.files[0].size < 3000000) {
      const file = e.target.files[0];

      setFields({
        ...fields,
        order_design_image: file,
      });
      uploadFile();
    }
  };

  function removeFile() {
    setFields({
      ...fields,
      order_design_image: null,
    });
  }

  useEffect(() => {
    getDataFiltered(idPesanan, tokenUser);
  }, [idPesanan, tokenUser]);

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
          id="detailChat"
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
                <div className="flex space-x-6 justify-center">
                  <Dialog.Panel
                    className={`w-full max-w-[32rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative max-h-[90vh] overflow-y-auto`}
                  >
                    <MdClose
                      className="absolute text-xl top-6 right-6 cursor-pointer"
                      onClick={closeModal}
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold pt-8 mb-3"
                      ref={dataRef}
                    >
                      Detail Pesanan
                    </Dialog.Title>
                    <hr className="mb-6" />
                    <div className="mb-6">
                      <p className="mb-1">
                        Pesanan: {filteredData?.order_code}
                      </p>
                      <p className="mb-1">
                        {filteredData?.order_details[0]?.products?.product_name}
                      </p>
                      <p className="mb-4">
                        {
                          filteredData?.order_details[0]?.products
                            ?.product_categories?.product_category_name
                        }
                      </p>
                      {filteredData?.order_details[0]
                        ?.order_detail_design_image ? (
                        <div className="relative image-warp-detail">
                          <figure className="p-6 rounded-xl border border-orange-900/70">
                            <img
                              src={
                                 "http://localhost:8000/public/image/"+filteredData?.order_details[0].order_detail_design_image
                              }
                              alt={`${filteredData?.order_details[0]?.products?.product_name
                                .replace(/\s+/g, '-')
                                .toLowerCase()}-${filteredData?.order_details[0]?.products?.jenis_products?.jenis_product_name
                                .replace(/\s+/g, '-')
                                .toLowerCase()}`}
                              className="w-full"
                            />
                          </figure>
                          <div className="absolute right-0 top-0 pt-3 pr-3 transition-all-200">
                            <div
                              className="button-fill-sm !p-2"
                              role="button"
                            >
                              <FaTrashAlt className="text-xl fill-white" />
                            </div>
                          </div>
                          <div className="absolute right-0 top-11 pt-3 pr-3 transition-all-200">
                            <div
                              className="button-orange-sm !p-2"
                              role="button"
                            >
                              <MdModeEdit className="text-xl fill-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <label
                            htmlFor="uploadDesign"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Unggah Desain
                            <span className="text-primary-900 font-semibold">
                              *
                            </span>
                          </label>
                          <div className="w-full p-12 border-2 border-gray-500 border-dashed rounded-lg flex items-center justify-center bg-gray-100">
                            <div>
                              <div className="relative mb-5">
                                <input
                                  type="file"
                                  id="uploadDesign"
                                  name="order_design_image"
                                  className="absolute appearance-none w-full h-full opacity-0 cursor-pointer"
                                  required
                                  onChange={(e) => {
                                    setValidFields({
                                      ...validFields,
                                      order_design_image:
                                        e.target.value !== '',
                                    });
                                    handleFile(e);
                                  }}
                                  aria-invalid={
                                    validFields.order_design_image
                                      ? 'false'
                                      : 'true'
                                  }
                                  aria-describedby="orderDesignImgField"
                                />
                                <div className="button-fill cursor-pointer">
                                  <BsFillCloudPlusFill className="inline-block text-xl fill-white mr-2" />
                                  Upload
                                </div>
                              </div>
                              <p className="text-center font-semibold">
                                Support files
                              </p>
                              <p className="text-center text-sm">
                                PDF, JPG, PNG
                              </p>
                            </div>
                          </div>
                          {!validFields.order_design_image && (
                            <ErrorMessage
                              referenceId="orderDesignImgField"
                              message="File harus kurang dari 3MB"
                              isPasswordField={false}
                            />
                          )}
                          {fields.order_design_image &&
                            validFields.order_design_image && (
                              <div className="flex items-center justify-between rounded-lg bg-orange-600 px-5 py-4 mt-4">
                                <p className="truncate">
                                  <MdPermMedia className="text-2xl fill-dark mr-3 inline-block" />
                                  {fields.order_design_image.name}
                                </p>

                                <button
                                  onClick={removeFile}
                                  type="button"
                                >
                                  <MdDelete className="text-2xl fill-red-600 ml-4" />
                                </button>
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    <form className="mb-9">
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
                                  isDisabled ? '!bg-secondary-600' : '!bg-white'
                                }`}
                                value={`${filteredData?.order_details[0]?.p1}`}
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
                                  isDisabled ? '!bg-secondary-600' : '!bg-white'
                                }`}
                                value={`20`}
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
                                  isDisabled ? '!bg-secondary-600' : '!bg-white'
                                }`}
                                value={`30`}
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
                            isDisabled ? '!bg-secondary-600' : '!bg-white'
                          }`}
                          placeholder="Masukkan jenis produk"
                          disabled={isDisabled}
                          value={`${filteredData?.order_details[0]?.products?.jenis_products?.jenis_product_name}`}
                        />
                      </div>
                    </form>
                    <div className="flex justify-center">
                      <div
                        className="button-fill-sm"
                        onClick={openModalChat}
                        role="button"
                      >
                        Riwayat chat
                      </div>
                    </div>
                  </Dialog.Panel>

                  {toggleModalChat && (
                    <Dialog.Panel className="w-full max-w-[28rem] transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all relative max-h-[75vh]">
                      <ModalChat
                        closeModalChat={closeModalChat}
                        submitHandling={submitChatHandler}
                      />
                    </Dialog.Panel>
                  )}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modals;
