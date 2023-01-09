import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import Modals from "./components/Modals";

const Riwayat = () => {
  const [data, setData] = useState([
    {
      id: 1,
      nomorPesanan: "001/BIKDK/O/VII/2022",
      tanggalPesanan: "12 September 2022",
      namaIKM: "Ikha cathering",
      status: 1,
      ongkir: 120000,
      bentukProduk: "Bulat",
    },
    {
      id: 2,
      nomorPesanan: "002/BIKDK/O/VII/2022",
      tanggalPesanan: "12 September 2022",
      namaIKM: "Ikha cathering",
      status: 2,
      ongkir: 120000,
      bentukProduk: "Oval",
    },
    {
      id: 3,
      nomorPesanan: "003/BIKDK/O/VII/2022",
      tanggalPesanan: "12 September 2022",
      namaIKM: "Ikha cathering",
      status: 3,
      ongkir: 120000,
      bentukProduk: "Kotak",
    },
    {
      id: 4,
      nomorPesanan: "004/BIKDK/O/VII/2022",
      tanggalPesanan: "12 September 2022",
      namaIKM: "Ikha cathering",
      status: 1,
      ongkir: 120000,
      bentukProduk: "Bulat",
    },
    {
      id: 5,
      nomorPesanan: "005/BIKDK/O/VII/2022",
      tanggalPesanan: "12 September 2022",
      namaIKM: "Ikha cathering",
      status: 2,
      ongkir: 120000,
      bentukProduk: "Kostum",
    },
  ]);
  const [toggleId, setToggleId] = useState();
  const [toggleModalChat, setToggleModalChat] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
    setToggleModalChat(false);
  };

  const openModalChat = () => {
    setToggleModalChat(true);
  };

  const closeModalChat = () => {
    setToggleModalChat(false);
  };

  const detailModalHandling = (id) => {
    setIsOpenModal(true);
    setToggleId(id);
  };

  function handleChangeStatus(e, item) {
    e.preventDefault();
    // samakan api data id dengan item index
    // post data setelah get
    const filtered = data.filter((brg) => brg.id === item.id)[0];
    filtered.status = parseInt(e.target.value);
    setData((prevState) =>
      prevState.map((state) =>
        state.id === filtered.id ? { ...state, status: filtered.status } : state
      )
    );
    console.log(typeof data[0].status);
  }

  const submitChatHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <div className="border-b border-orange-900">
          <h3 className="font-semibold pb-3">Dashboard Desain</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Riwayat Chat</h6>
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
              name="cari"
              required
              autoComplete="on"
              // onChange={handleChange}
            />
            <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
          </div>
        </div>
        <article id="tableHistoryChat">
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-4">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 w-[8%] min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 w-[18%] min-w-[196px]">
                    Nomor Pesanan
                  </th>
                  <th className="text-left text-white p-3 w-[18%] min-w-[140px]">
                    Nama IKM
                  </th>
                  <th className="text-center text-white p-3 w-[14%] min-w-[80px]">
                    Bentuk Produk
                  </th>
                  <th className="text-center text-white p-3 w-[20%] min-w-[180px]">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-center text-white p-3 w-[22%] min-w-[230px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="text-center p-3">{index + 1}</td>
                    <td className="text-center p-3">{item.nomorPesanan}</td>
                    <td className="text-left p-3">{item.namaIKM}</td>
                    <td className="text-center p-3">{item.bentukProduk}</td>
                    <td className="text-center p-3">{item.tanggalPesanan}</td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative">
                          <select
                            id="status"
                            name="status"
                            defaultValue={item.status}
                            // value={item.status}
                            onChange={(e) => handleChangeStatus(e, item)}
                            className={`${
                              parseInt(item.status) === 1
                                ? "!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red"
                                : parseInt(item.status) === 2
                                ? "!bg-green-500 hover:!bg-green-500/80"
                                : parseInt(item.status) === 3
                                ? "!bg-secondary-800 hover:!bg-secondary-800/80"
                                : ""
                            } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                          >
                            <option value="1">Status Desain</option>
                            <option value="2">Sudah Sesuai</option>
                            <option value="3">Belum Sesuai</option>
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
                        </div>
                        <button
                          onClick={() => detailModalHandling(item.nomorPesanan)}
                          className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                        >
                          Detail
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

      {/* Modal Detail dan Chat */}
      <Modals
        isOpen={isOpenModal}
        closeModal={closeModal}
        idPesanan={toggleId}
        toggleModalChat={toggleModalChat}
        openModalChat={openModalChat}
        closeModalChat={closeModalChat}
        submitChatHandler={submitChatHandler}
      />
    </>
  );
};

export default Riwayat;
