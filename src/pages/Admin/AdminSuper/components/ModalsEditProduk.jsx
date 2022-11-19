import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const ModalsEditProduk = ({
  isOpen,
  closeModal,
  submitHandler,
  detailData,
  handleChangePutProduct,
  categoryProduct,
  productMaterial,
  productSize,
  productFinishing,
  bentukProduk,
}) => {
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
                <Dialog.Panel className="w-full max-w-[45rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <MdClose
                    className="absolute text-xl top-6 right-6 cursor-pointer"
                    onClick={closeModal}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold pt-8 mb-3"
                  >
                    Tambah Produk
                  </Dialog.Title>
                  <hr className="mb-6 border-orange-900" />

                  <form className="mb-2" onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 2xsm:grid-cols-4 gap-x-5">
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="product_name"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Nama Produk <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            className="input-field-xs"
                            name="product_name"
                            id="product_name"
                            onChange={handleChangePutProduct}
                            defaultValue={detailData?.product_name}
                          />
                          {/* <select
                            id="product_name"
                            name="namaProduk"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option>Pilih Produk</option>
                            <option value="1">Produk 1</option>
                            <option value="2">Produk 2</option>
                            <option value="3">Produk 3</option>
                            <option value="4">Produk 4</option>
                            <option value="5">Produk 5</option>
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" /> */}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="product_category_id"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Kategori Produk{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="product_category_id"
                            name="product_category_id"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option
                              value={
                                detailData?.product_categories
                                  .product_category_id
                              }
                            >
                              {
                                detailData?.product_categories
                                  .product_category_name
                              }
                            </option>
                            {categoryProduct?.map((item) => (
                              <option value={item.product_category_id}>
                                {item.product_category_name}
                              </option>
                            ))}
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="jenis_product_id"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Jenis Produk <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="jenis_product_id"
                            name="jenis_product_id"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option
                              value={
                                detailData?.jenis_products.jenis_product_id
                              }
                            >
                              {detailData?.jenis_products.jenis_product_name}
                            </option>
                            {bentukProduk?.map((item) => (
                              <option value={item.jenis_product_id}>
                                {item.jenis_product_name}
                              </option>
                            ))}
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4">
                          <label
                            htmlFor="product_weight"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Berat Produk <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="product_weight"
                            id="product_weight"
                            className="input-field-xs"
                            placeholder="Masukkan Berat Produk"
                            required
                            onChange={handleChangePutProduct}
                            defaultValue={detailData?.product_weight}
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="product_size_id"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Ukuran Produk{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="product_size_id"
                            name="product_size_id"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option
                              value={detailData?.product_sizes.product_size_id}
                            >
                              {detailData?.product_sizes.product_size_length} x{" "}
                              {detailData?.product_sizes.product_size_width}
                            </option>
                            {productSize?.map((item) => (
                              <option value="1">Ukuran Produk 1</option>
                            ))}
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="product_material_id"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Bahan Produk <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="product_material_id"
                            name="product_material_id"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option
                              value={
                                detailData?.product_materials
                                  .product_material_id
                              }
                            >
                              {
                                detailData?.product_materials
                                  .product_material_name
                              }
                            </option>
                            {productMaterial?.map((item) => (
                              <option value={item.product_material_id}>
                                {item.product_material_name}
                              </option>
                            ))}
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 relative">
                          <label
                            htmlFor="product_finishing_id"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Finishing Produk{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="product_finishing_id"
                            name="product_finishing_id"
                            className="input-field-select-xs"
                            required
                            onChange={handleChangePutProduct}
                          >
                            <option
                              value={
                                detailData?.product_finishings
                                  .product_finishing_id
                              }
                            >
                              {
                                detailData?.product_finishings
                                  .product_finishing_name
                              }
                            </option>
                            {productFinishing?.map((item) => (
                              <option value={item.product_finishing_id}>
                                {item.product_finishing_name}
                              </option>
                            ))}
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4">
                          <label
                            htmlFor="product_image"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Foto Produk <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="file"
                            name="product_image"
                            id="product_image"
                            className="input-field-xs"
                            required
                            onChange={handleChangePutProduct}
                            // defaultValue={detailData?.product_image}
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4">
                          <label
                            htmlFor="product_description"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Deskripsi Produk{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <textarea
                            name="product_description"
                            id="product_description"
                            className="input-field-xs"
                            placeholder="Masukkan Deskripsi Produk"
                            required
                            cols="30"
                            rows="4"
                            onChange={handleChangePutProduct}
                            defaultValue={detailData?.product_description}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4">
                          <label
                            htmlFor="product_price"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Harga Produk <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="product_price"
                            id="product_price"
                            className="input-field-xs"
                            placeholder="Masukkan Harga Produk"
                            required
                            onChange={handleChangePutProduct}
                            defaultValue={detailData?.product_price}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="button-fill" type="submit">
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

export default ModalsEditProduk;
