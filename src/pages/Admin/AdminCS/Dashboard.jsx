import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Dashboard = () => {
  return (
    <section>
      <div className=" border-b border-orange-900">
        <h3 className="font-semibold">Dashboard CS</h3>
      </div>
      <h6 className="mt-10 mb-4">Tabel Retribusi Pelanggan</h6>
      <table className="table-auto w-[1440px] lg:w-full">
        <thead>
          <tr className="bg-orange-900">
            <th className="text-white py-3 text-center">No</th>
            <th className="text-white py-3 text-center">Nomor Pesanan</th>
            <th className="text-white py-3 text-center">Nama IKM</th>
            <th className="text-white py-3 text-center">Nominal Transaksi</th>
            <th className="text-white py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr className=" border-b" key={item}>
              <td className="text-center py-3">{item}</td>
              <td className="text-center py-3">001/BIKDK/O/VII/2022</td>
              <td className="text-center py-3">Ikha Katering</td>
              <td className="text-center py-3">Rp.120000</td>
              <td className="text-center py-3">
                <div className="bg-[#21B630] text-white py-2 rounded-lg font-semibold">
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
        <button className="button-gradient-sm !text-xs xs:!text-base">1</button>
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
      <h6 className="mt-5 mb-4">Tabel Status PO Pelanggan</h6>
      <table className="table-auto mt-4 w-[1440px] lg:w-full">
        <thead>
          <tr className="bg-orange-900">
            <th className="text-white py-3 text-center">No</th>
            <th className="text-white py-3 text-center">Nomor Pesanan</th>
            <th className="text-white py-3 text-center">Nama IKM</th>
            <th className="text-white py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr className=" border-b" key={item}>
              <td className="text-center py-3">{item}</td>
              <td className="text-center py-3">001/BIKDK/O/VII/2022</td>
              <td className="text-center py-3">Ikha Katering</td>
              <td className="text-center py-3">
                <div className="bg-[#21B630] text-white py-2 rounded-lg font-semibold">
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
        <button className="button-gradient-sm !text-xs xs:!text-base">1</button>
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
      <h6 className="mt-5 mb-4">Tabel Rekap Pesanan</h6>
      <table className="table-auto mt-4 w-[1440px] lg:w-full">
        <thead>
          <tr className="bg-orange-900">
            <th className="text-white py-3 text-center">No</th>
            <th className="text-white py-3 text-center">Nomor Pesanan</th>
            <th className="text-white py-3 text-center">Nama IKM</th>
            <th className="text-white py-3 text-center">Status</th>
            <th className="text-white py-3 text-center">Nominal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr className=" border-b" key={item}>
              <td className="text-center py-3">{item}</td>
              <td className="text-center py-3">001/BIKDK/O/VII/2022</td>
              <td className="text-center py-3">Ikha Katering</td>
              <td className="text-center py-3">admin gudang</td>
              <td className="text-center py-3">Rp.120000</td>
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
        <button className="button-gradient-sm !text-xs xs:!text-base">1</button>
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
  );
};

export default Dashboard;
