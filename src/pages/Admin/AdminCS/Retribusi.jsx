import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Retribusi = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="border-b border-orange-900">
        <h3 className="font-semibold pb-3">Retribusi Pelanggan</h3>
      </div>
      <h6 className="mt-10 mb-4">Tabel Retribusi Pelanggan</h6>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center mr-4">
          <label htmlFor="sorting">Menampilkan</label>
          <select
            name="sorting"
            id="sorting"
            className="w-[50px] rounded h-10 p-2 bg-white border border-primary-900"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flex relative top-2 flex-col mb-4">
          <input
            type="text"
            className="input-field !rounded-full !py-2 !pl-14"
            placeholder="Cari"
            name="search"
            required
            autoComplete="on"
            // onChange={handleChange}
          />
          <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
        </div>
      </div>
      <article id="tableRetribusi">
        <div className="overflow-x-auto">
          <table className="table-auto mb-4 w-full">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                  No
                </th>
                <th className="text-white p-3 w-[27%] min-w-[218px] text-center">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 w-[15%] text-left min-w-[180px]">
                  Nama IKM
                </th>
                <th className="text-white p-3 w-[20%] text-center min-w-[180px]">
                  Nominal
                </th>
                <th className="text-white p-3 w-[30%] text-center min-w-[260px]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  className="border-b"
                  key={item}
                >
                  <td className="text-center p-3">{item}</td>
                  <td className="text-center p-3">001/BIKDK/O/VII/2022</td>
                  <td className="text-left p-3">Ikha Katering</td>
                  <td className="text-center p-3">Rp. 150000</td>
                  <td className="text-center p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/cs/dashboard/detail-retribusi-pelanggan/${item}`
                          )
                        }
                        className="flex items-center justify-center rounded-lg py-2 px-5 border text-sm transition-200 hover:border-orange-900"
                      >
                        Detail
                      </button>
                      <button className="flex items-center justify-center rounded-lg py-2 px-5 border text-sm transition-200 hover:border-orange-900">
                        Edit
                      </button>
                      <button className="flex items-center justify-center rounded-lg py-2 px-3 bg-primary-900 transition-200 hover:bg-primary-900/70">
                        <FaTrash className="fill-white text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className="flex justify-end items-center gap-x-[.375rem] py-2 mt-2"
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
      </article>
    </section>
  );
};

export default Retribusi;
