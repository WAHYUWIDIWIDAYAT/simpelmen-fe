import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ModalResi from './components/ModalResi';
import { IoIosArrowDown } from 'react-icons/io';
import { BiPlus } from 'react-icons/bi';
import { adminGudang } from '../../../services/api';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';

const Dashboard = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [warehouseData, setWarehouseData] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idPesanan, setIdPesanan] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [resiField, setResiField] = useState({
    delivery_detail_receipt: '',
    delivery_detail_estimate: '',
  });
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = warehouseData?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (token) => {
    await adminGudang
      .get('/orders', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setWarehouseData(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  async function shipping(id, status) {
    await adminGudang
      .put(
        `/orders/dikirim/${id}`,
        {
          order_status: parseInt(status),
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
  async function notAccept(id, status) {
    await adminGudang
      .put(
        `/orders/belum-dikirim/${id}`,
        {
          order_status: parseInt(status),
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

  const handleChange = (e, item) => {
    e.preventDefault();
    if (parseInt(e.target.value) === parseInt(2)) {
      shipping(item.order_id, e.target.value);
    } else if (parseInt(e.target.value) === 3) {
      notAccept(item.order_id, e.target.value);
    }
    // const filtered = data.filter((brg) => brg.id === item.id)[0];
    // filtered.status = parseInt(e.target.value);
    // setData((prevState) =>
    //   prevState.map((state) =>
    //     state.id === filtered.id ? { ...state, status: filtered.status } : state
    //   )
    // );
    // console.log(typeof data[0].status);
  };

  const closeModal = () => setIsOpenModal(false);

  const resiModalHandling = (id) => {
    setIsOpenModal(true);
    setIdPesanan(id);
  };

  const handleResiField = (e) => {
    setResiField({ ...resiField, [e.target.name]: e.target.value });
  };

  const resiSaveHandling = async (e) => {
    e.preventDefault();
    setIsOpenModal(false);
    await adminGudang
      .put(`/orders/resi/${idPesanan}`, resiField, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setAlerts(true);
          getData(parseUser.data.token);
        }, 2000);
        setIsOpenModal(false);
      })
      .catch((e) => {
        setTimeout(() => {
          setAlertFail(true);
          setFailMessage(e.message);
          getData(parseUser.data.token);
        }, 2000);
        setIsOpenModal(false);
      });
  };

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
            textContent="Status berhasil diubah!"
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
          <h3 className="font-semibold pb-3">Dashboard Gudang</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Status Pengiriman Barang </h6>
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
                  <th className="text-white p-3 w-[22%] min-w-[196px] text-center">
                    No Pesanan
                  </th>
                  <th className="text-white p-3 w-[20%] min-w-[180px] text-center">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-white p-3 w-[16%] min-w-[140px] text-left">
                    Nama IKM
                  </th>
                  <th className="text-white p-3 w-[16%] text-left">
                    Resi Pelanggan
                  </th>
                  <th className="text-white p-3 w-[34%] min-w-[234px] text-center">
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
                        <td className="text-left py-3 px-4">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex py-2 items-center gap-4 justify-center">
                            <div className="h-3 w-24 bg-slate-200 rounded-md"></div>
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
                        <td className="text-left p-3">
                          {item.delivery_details[0]?.delivery_detail_ikm}
                        </td>
                        <td className="text-left p-3">
                          {item.delivery_details[0]?.delivery_detail_receipt}
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center gap-4 justify-center">
                            <div className="relative">
                              <select
                                id="status"
                                name="status"
                                defaultValue={item.order_status}
                                // value={item.status}
                                onChange={(e) => handleChange(e, item)}
                                className={`${
                                  item.order_status === 4
                                    ? '!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red'
                                    : item.order_status === 2
                                    ? '!bg-green-500 hover:!bg-green-500/80'
                                    : item.order_status === 3
                                    ? '!bg-secondary-800 hover:!bg-secondary-800/80'
                                    : ''
                                } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                              >
                                <option
                                  value={
                                    item.order_status === 4
                                      ? 4
                                      : item.order_status
                                  }
                                >
                                  {item.order_status === 4
                                    ? 'Status PO'
                                    : item.order_status === 2
                                    ? 'Dikirim'
                                    : 'Belum Dikirim'}
                                </option>
                                <option value="4">Status PO</option>
                                <option value="2">Dikirim</option>
                                <option value="3">Belum Dikirim</option>
                              </select>
                              <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
                            </div>
                            <button
                              onClick={() => resiModalHandling(item.order_id)}
                              className="bg-white border py-2 pl-3 pr-4 rounded-lg flex items-center transition-200 hover:border-orange-900"
                            >
                              <BiPlus className="mr-2 text-xl" />
                              <span>Resi</span>
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
            totalPosts={warehouseData?.length}
            paginate={paginate}
          />
        </article>
      </section>

      {/* Modal Resi */}
      <ModalResi
        isOpen={isOpenModal}
        closeModal={closeModal}
        noPesanan={idPesanan}
        submitHandler={resiSaveHandling}
        changeHandler={(e) => handleResiField(e)}
        data={warehouseData}
        id={idPesanan}
      />
    </>
  );
};

export default Dashboard;
