import React, { useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import Modal from "../../components/Card/Modal";

const PAD = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  return (
    <>
      <main>
        <section className="containers">
          <div className="mt-0 xs:mt-7 mb-5 flex">
            <Link to="/" className="flex items-center mb-3">
              <HiOutlineArrowSmLeft className="text-2xl mr-3" />
              <span className="leading-10">Kembali</span>
            </Link>
          </div>
          <h4 className="text-center mb-8">
            Laporan Retribusi Pendapatan Asli Daerah
          </h4>
          <div className="grid grid-systems gap-x-8 gap-y-6 mb-9">
            <div className="col-span-3 hidden 2xsm:block"></div>
            <div className="col-span-3 hidden 2xsm:block"></div>
            <div className="col-span-4 2md:col-span-3">
              <label
                htmlFor="start"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Dari Tanggal
              </label>
              <div className="relative">
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
                <input
                  name="start"
                  type="date"
                  className="input-field-icon-xs"
                  placeholder="Select date start"
                />
              </div>
            </div>
            <div className="col-span-4 2md:col-span-3">
              <label
                htmlFor="end"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Sampai Tanggal
              </label>
              <div className="relative">
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
                <input
                  name="end"
                  type="date"
                  className="input-field-icon-xs"
                  placeholder="Select date end"
                />
              </div>
            </div>
          </div>
          {/* tabel */}
          <div className="overflow-x-auto mb-9">
            <table className="table-auto w-full border border-orange-900 mb-4">
              <thead className="border-b border-orange-900 bg-orange-900/30">
                <tr className="border-b border-orange-900">
                  <th
                    colSpan="21"
                    className="py-2 uppercase text-center text-sm p-3"
                  >
                    Jasa Pelayanan
                  </th>
                </tr>
                <tr className="border-b border-orange-900">
                  <th
                    className="border-r border-orange-900 uppercase min-w-[48px] text-center p-3 text-sm"
                    rowSpan={2}
                  >
                    No
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase min-w-[280px] p-3 text-sm"
                    rowSpan={2}
                  >
                    No. Pesanan
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase min-w-[240px] p-3 text-sm"
                    rowSpan={2}
                  >
                    Nama IKM
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase p-3 text-sm"
                    colSpan={2}
                  >
                    Karton Box
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase text-sm p-3"
                    colSpan={2}
                  >
                    Sablon
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase text-sm p-3"
                    colSpan={2}
                  >
                    Pond
                  </th>
                  <th className="border-r border-orange-900 uppercase text-sm p-3">
                    Laminasi
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase text-sm p-3"
                    colSpan={2}
                  >
                    Desain
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase text-sm p-3 min-w-[150px]"
                    rowSpan={2}
                  >
                    Sewa Ruang
                  </th>
                  <th
                    className="border-r border-orange-900 uppercase text-sm p-3 min-w-[150px]"
                    rowSpan={2}
                  >
                    Jasa Pembuatan Stiker
                  </th>
                  <th
                    className="uppercase text-sm p-3 min-w-[150px]"
                    rowSpan={2}
                  >
                    Jumlah Total Retribusi (Rp)
                  </th>
                </tr>
                <tr className="border-b border-orange-900">
                  <th className="border-r border-orange-900 font-semibold min-w-[120px] text-sm p-3">
                    Jml. Barang (pcs)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[150px] text-sm p-3">
                    Retribusi (Rp)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[120px] text-sm p-3">
                    Jml. Barang (pcs)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[150px] text-sm p-3">
                    Retribusi (Rp)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[120px] text-sm p-3">
                    Jml. Barang (pcs)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[150px] text-sm p-3">
                    Retribusi (Rp)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[150px] text-sm p-3">
                    Retribusi (Rp)
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[56px] text-sm p-3">
                    File
                  </th>
                  <th className="border-r border-orange-900 font-semibold min-w-[150px] text-sm p-3">
                    Retribusi (Rp)
                  </th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-orange-900 hover:bg-orange-400/30"
                  >
                    <td className="border-r border-orange-900 text-center px-3 py-[6px]">
                      {item}
                    </td>
                    <td className="border-r border-orange-900 text-center px-3 py-[6px]">
                      001/BIKDK/O/VII/2022
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px]">
                      Ikha Katering
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-center">
                      200
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-center">
                      200
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-center">
                      200
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-center">
                      1
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="border-r border-orange-900 px-3 py-[6px] text-right">
                      60000
                    </td>
                    <td className="px-3 py-[6px] text-right">420.000</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-900/10 hover:bg-gray-900/20">
                <tr className="">
                  <td
                    colSpan={3}
                    className="uppercase font-semibold p-3 border-r border-orange-900 text-sm"
                  >
                    Total
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-center">
                    200
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-center">
                    200
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-center">
                    200
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-center">
                    1
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold border-r border-orange-900 text-right p-3">
                    60000
                  </td>
                  <td className="font-semibold text-right p-3">420.000</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex justify-center">
            <button className="button-gradient" type="button">
              Unduh PAD
            </button>
          </div>
        </section>

        {/* check modal error */}
        {/* <div className="flex justify-center">
          <button
            className="button-fill"
            type="button"
            onClick={openModal}
          >
            Show Error Modal
          </button>
        </div> */}

        {/* modal */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          handleAccept={closeModal}
          titleModal="Error"
          captionModal="Periode yang dapat dilihat maksimal 30 hari"
          btnAcceptCaption="Lanjutkan"
          isErrorModal={true}
        />
      </main>
    </>
  );
};

export default PAD;
