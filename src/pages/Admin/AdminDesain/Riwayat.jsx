import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { adminDesain } from '../../../services/api';
import Modals from './components/Modals';

const Riwayat = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [data, setData] = useState(null);
  const [toggleId, setToggleId] = useState();
  const [toggleModalChat, setToggleModalChat] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const getOrderDesign = async () => {
      await adminDesain
        .get('/orders', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    getOrderDesign();
  }, [parseUser.data.token]);

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
                {isLoading
                  ? [1, 2, 3].map((item) => (
                      <tr
                        className="animate-pulse border-b"
                        key={item}
                      >
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-left py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-3 py-2">
                            <div className="h-3 bg-slate-200 rounded-md w-24"></div>
                            <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : data?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={item?.order_id}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item?.order_code}</td>
                        <td className="text-left p-3">
                          {item?.users?.user_ikm}
                        </td>
                        <td className="text-center p-3">
                          {item?.order_details?.order_detail_shape}
                        </td>
                        <td className="text-center p-3">{`${new Date(
                          item.createdAt
                        ).getDate()} - ${
                          new Date(item.createdAt).getMonth() + 1
                        } - ${new Date(item.createdAt).getFullYear()}`}</td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-3">
                            <div className="relative">
                              <select
                                id="status"
                                name="status"
                                defaultValue={item?.status}
                                // value={item.status}
                                onChange={(e) => handleChangeStatus(e, item)}
                                className={`${
                                  parseInt(item?.status) === 1
                                    ? '!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red'
                                    : parseInt(item?.status) === 2
                                    ? '!bg-green-500 hover:!bg-green-500/80'
                                    : parseInt(item?.status) === 3
                                    ? '!bg-secondary-800 hover:!bg-secondary-800/80'
                                    : ''
                                } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                              >
                                <option value="1">Status Desain</option>
                                <option value="2">Sudah Sesuai</option>
                                <option value="3">Belum Sesuai</option>
                              </select>
                              <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
                            </div>
                            <button
                              onClick={() =>
                                detailModalHandling(item?.order_id)
                              }
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
        tokenUser={parseUser.data.token}
        toggleModalChat={toggleModalChat}
        openModalChat={openModalChat}
        closeModalChat={closeModalChat}
        submitChatHandler={submitChatHandler}
      />
    </>
  );
};

export default Riwayat;
