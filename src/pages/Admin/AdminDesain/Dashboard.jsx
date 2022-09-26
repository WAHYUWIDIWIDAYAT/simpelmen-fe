import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Dashboard = () => {
  return (
    <>
      <section>
        <div className=" border-b border-orange-900">
          <h3 className="font-semibold">Dashboard Desain</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Rekap Pesanan</h6>
        <table className="table-auto w-[1440px] lg:w-full">
          <thead>
            <tr className="bg-orange-900">
              <td className="text-center text-white py-3">No</td>
              <td className="text-center text-white py-3">Nama IKM</td>
              <td className="text-center text-white py-3">Nomor Pesanan</td>
              <td className="text-center text-white py-3">Bentuk Produk</td>
              <td className="text-center text-white py-3">Tanggal Pemesanan</td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr className="border-b" key={item}>
                <td className="text-center py-3">{item}</td>
                <td className="text-center py-3">Ikha Katering</td>
                <td className="text-center py-3">001/BIKDK/O/VII/2022</td>
                <td className="text-center py-3">A1</td>
                <td className="text-center py-3">12 September 2022</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex justify-end items-center gap-x-[.375rem] py-2 mt-5"
          aria-label="pagination"
        >
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
            <HiChevronLeft className="!text-base xs:!text-xl" />
          </button>
          <button className="button-gradient-sm !text-xs xs:!text-base">
            1
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
            2
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
            3
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
            <HiChevronRight className="!text-base xs:!text-xl" />
          </button>
        </nav>
        {/*  */}
        <h6 className="mt-10 mb-4">Tabel Status Desain</h6>
        <table className="table-auto w-[1440px] lg:w-full">
          <thead>
            <tr className="bg-orange-900">
              <td className="text-center text-white py-3">No</td>
              <td className="text-center text-white py-3">Nomor Pesanan</td>
              <td className="text-center text-white py-3">Tanggal Pemesanan</td>
              <td className="text-center text-white py-3">Nama IKM</td>
              <td className="text-center text-white py-3">Status</td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr className="border-b" key={item}>
                <td className="text-center py-3">{item}</td>
                <td className="text-center py-3">001/BIKDK/O/VII/2022</td>
                <td className="text-center py-3">12 September 2022</td>
                <td className="text-center py-3">Ikha Katering</td>
                <td className="text-center py-3">
                  <div className="bg-[#21B630] text-white py-2 px-3 rounded-lg font-semibold">
                    Disetujui
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex justify-end items-center gap-x-[.375rem] py-2 mt-5"
          aria-label="pagination"
        >
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
            <HiChevronLeft className="!text-base xs:!text-xl" />
          </button>
          <button className="button-gradient-sm !text-xs xs:!text-base">
            1
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
            2
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
            3
          </button>
          <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
            <HiChevronRight className="!text-base xs:!text-xl" />
          </button>
        </nav>
      </section>
    </>
  );
};

export default Dashboard;
