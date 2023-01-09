import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';
import { adminProduksi } from '../../../services/api';
import ModalDetail from './components/ModalDetail';

const Dashboard = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [productData, setProductData] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [detailData, setDetailData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = productData?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (token) => {
    await adminProduksi
      .get('/orders', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setProductData(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const detailModalHandling = async (id) => {
    setIsOpenModal(true);
    await adminProduksi
      .get(`/orders/${id}`, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => setDetailData(response.data));
  };

  async function belumProduksi(status, id) {
    await adminProduksi
      .put(
        `/orders/belum-produksi/${id}`,
        {
          order_status: status,
        },
        {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => {
        setAlerts(true);
        getData(parseUser.data.token);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  }
  async function dalamProduksi(status, id) {
    await adminProduksi
      .put(
        `/orders/dalam-produksi/${id}`,
        {
          order_status: status,
        },
        {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => {
        setAlerts(true);
        getData(parseUser.data.token);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  }
  async function selesaiProduksi(status, id) {
    await adminProduksi
      .put(
        `/orders/selesai-produksi/${id}`,
        {
          order_status: status,
        },
        {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => {
        setAlerts(true);
        getData(parseUser.data.token);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  }

  function handleChange(e, item) {
    e.preventDefault();
    if (parseInt(e.target.value) === 2) {
      belumProduksi(parseInt(e.target.value), item.order_id);
    } else if (parseInt(e.target.value) === 3) {
      dalamProduksi(parseInt(e.target.value), item.order_id);
    } else if (parseInt(e.target.value) === 4) {
      selesaiProduksi(parseInt(e.target.value), item.order_id);
    }
    // const filtered = data.filter((brg) => brg.id === item.id)[0];
    // filtered.status = parseInt(e.target.value);
    // setData((prevState) =>
    //   prevState.map((state) =>
    //     state.id === filtered.id ? { ...state, status: filtered.status } : state
    //   )
    // );
    // console.log(typeof data[0].status);
  }

  useEffect(() => {
    getData(parseUser.data.token);
  }, [parseUser.data.token]);

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      <section>
        {alerts && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Status pesanan telah diubah!"
          />
        )}
        {alertFail && (
          <Alerts
            state="true"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`Ups, sepertinya ada yang salah: ${failMessage}`}
            closeButton="true"
          />
        )}
        <div className="border-b border-orange-900">
          <h3 className="font-semibold pb-3">Dashboard Produksi </h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Status Produksi</h6>
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
              name="seach"
              required
              autoComplete="on"
              // onChange={handleChange}
            />
            <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
          </div>
        </div>
        <article id="tableStatus">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                    No
                  </th>
                  <th className="text-white p-3 w-[18%] min-w-[196px] text-center">
                    No Pesanan
                  </th>
                  <th className="text-white p-3 w-[19%] min-w-[180px] text-center">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-white p-3 w-[18%] min-w-[140px] text-left">
                    Nama IKM
                  </th>
                  <th className="text-white p-3 w-[21%] min-w-[200px] text-center">
                    Status
                  </th>
                  <th className="text-white p-3 w-[16%] min-w-[140px] text-center">
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
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-left py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="py-2 w-full flex justify-center">
                            <div className="h-3 w-16 bg-slate-200 rounded-md"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentData?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={index}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item.order_code}</td>
                        <td className="text-center p-3">{`${new Date(
                          item.createdAt
                        ).getDate()} - ${
                          new Date(item.createdAt).getMonth() + 1
                        } - ${new Date(item.createdAt).getFullYear()}`}</td>
                        <td className="text-left p-3">{item.users.user_ikm}</td>
                        <td className="text-center p-3">
                          <div className="relative">
                            <select
                              id="status"
                              name="status"
                              defaultValue={item.order_status}
                              // value={item.status}
                              onChange={(e) => handleChange(e, item)}
                              className={`${
                                item.order_status === null
                                  ? '!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red'
                                  : item.order_status === 2
                                  ? '!bg-primary-400 hover:!bg-primary-400/80'
                                  : item.order_status === 3
                                  ? '!bg-secondary-800 hover:!bg-secondary-800/80'
                                  : item.order_status === 4
                                  ? '!bg-green-500 hover:!bg-green-500/80'
                                  : ''
                              } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                            >
                              <option value={item.order_status}>
                                {item.order_status === null
                                  ? 'Status Produksi'
                                  : item.order_status === 2
                                  ? 'Belum Produksi'
                                  : item.order_status === 3
                                  ? 'Dalam Proses'
                                  : 'Selesai Produksi'}
                              </option>
                              <option value="1">Status Produksi</option>
                              <option value="2">Belum Diproduksi</option>
                              <option value="3">Dalam Proses</option>
                              <option value="4">Selesai Diproduksi</option>
                            </select>
                            <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
                          </div>
                        </td>
                        <td>
                          <div className="w-full flex justify-center">
                            <button
                              onClick={() => detailModalHandling(item.order_id)}
                              className="bg-white border py-2 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
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
          <Pagination
            type="dashboard"
            currentPage={currentPage}
            postsPerPage={postPerPage}
            totalPosts={productData?.length}
            paginate={paginate}
          />
        </article>
      </section>

      {/* Modal Detail */}
      <ModalDetail
        isOpen={isOpenModal}
        closeModal={closeModal}
        detailData={detailData}
      />
    </>
  );
};

export default Dashboard;
