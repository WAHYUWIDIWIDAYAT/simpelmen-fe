import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { adminSuper } from "../../../../services/api";
import { useEffect } from "react";

const ModalsRekap = ({ isOpen, closeModal, idPesanan }) => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [data, setData] = useState();
  useEffect(() => {
    const getDetailData = async (token) => {
      await adminSuper
        .get(`/rekap/pesanan/${idPesanan}`, {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((response) => setData(response.data));
    };
    getDetailData(parseUser.data.token);
  }, [idPesanan, parseUser.data.token]);
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
                    Detail Pesanan
                  </Dialog.Title>
                  <figure className="w-[80%] mx-auto mb-6">
                    <img
                      src={`data:image/jpg;base64,${data?.data?.order_details[0]?.products.product_image}`}
                      alt={`nama`}
                      className="w-full"
                    />
                  </figure>
                  <div className="text-center mb-6">
                    <p className="mb-1">
                      Pesanan:{" "}
                      {`${new Date(data?.data?.createdAt).getDate()} - ${
                        new Date(data?.data?.createdAt).getMonth() + 1
                      } - ${new Date(data?.data?.createdAt).getFullYear()}`}
                    </p>
                    <p className="mb-1">
                      {data?.data?.order_details[0]?.products.product_name}
                    </p>
                    <p>
                      {data?.data?.order_details[0]?.products.jenis_product}{" "}
                      {`(Jenis Produk)`}
                    </p>
                  </div>
                  <div className="spesifikasi w-full bg-orange-600 rounded-lg p-4 text-center mb-6">
                    <h6 className="text-white mb-3">Spesifikasi Produk</h6>
                    <p className="text-white mb-3">
                      {
                        data?.data?.order_details[0]?.products
                          .product_description
                      }
                    </p>
                    <div className="text-left">
                      <p className="text-white font-semibold">
                        Jumlah:{" "}
                        {data?.data?.order_details[0]?.order_detail_quantity}{" "}
                        pcs
                      </p>
                      <p className="text-white font-semibold">
                        Retribusi: Rp{" "}
                        {data?.data?.retributions[0]?.retribution_jasa_total ===
                        null
                          ? "0"
                          : data?.data?.retributions[0]?.retribution_jasa_total}
                      </p>
                    </div>
                  </div>
                  <div className="w-full border border-orange-900 rounded-lg p-4">
                    <h6 className="text-center mb-3">Pengiriman</h6>
                    <table>
                      <tr>
                        <td className="w-[28%] align-baseline">Nama</td>
                        <td className="w-[4%] align-baseline">:</td>
                        <td className="w-[68%] align-baseline">
                          {
                            data?.data?.delivery_details[0]
                              ?.delivery_detail_name
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[28%] align-baseline">Nama IKM</td>
                        <td className="w-[4%] align-baseline">:</td>
                        <td className="w-[68%] align-baseline">
                          {data?.data?.delivery_details[0]?.delivery_detail_ikm}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[28%] align-baseline">Telepon</td>
                        <td className="w-[4%] align-baseline">:</td>
                        <td className="w-[68%] align-baseline">
                          {
                            data?.data?.delivery_details[0]
                              ?.delivery_detail_contact
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[28%] align-baseline">Alamat</td>
                        <td className="w-[4%] align-baseline">:</td>
                        <td className="w-[68%] align-baseline">
                          {
                            data?.data?.delivery_details[0]
                              ?.delivery_detail_address
                          }
                        </td>
                      </tr>
                    </table>
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

export default ModalsRekap;
