import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';
import { adminTU } from '../../../services/api';

const Dashboard = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [orderData, setOrderData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = orderData?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (token) => {
    await adminTU
      .get('/orders', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setOrderData(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  async function accept(id) {
    await adminTU
      .put(
        `/orders/approve/${id}`,
        {
          order_status: '2',
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

  async function decline(id) {
    await adminTU
      .put(
        `/orders/decline/${id}`,
        {
          order_status: '3',
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
    if (e.target.value === '2') {
      accept(item.order_id);
    } else if (e.target.value === '3') {
      decline(item.order_id);
    }
    // const filtered = data.filter((brg) => brg.id === item.id)[0];
    // filtered.status = parseInt(e.target.value);
    // setData((prevState) =>
    //   prevState.map((state) =>
    //     state.id === filtered.id ? { ...state, status: filtered.status } : state
    //   )
    // );
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
          <h3 className="font-semibold pb-3">Dashboard TU</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Pesanan Pelanggan </h6>
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
        <article id="tablePesanan">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                    No
                  </th>
                  <th className="text-white p-3 w-[25%] min-w-[196px] text-center">
                    Nomor Pesanan
                  </th>
                  <th className="text-white p-3 w-[17%] min-w-[140px] text-left">
                    Nama IKM
                  </th>
                  <th className="text-white p-3 w-[24%] min-w-[180px] text-center">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-white p-3 w-[26%] min-w-[200px] text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? [1, 2, 3].map((item) => (
                      <tr
                        className="border-b"
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
                          <div className="flex py-2 items-center gap-4 justify-center">
                            <div className="h-3 w-24 bg-slate-200 rounded-md"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentData?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={item.id}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item.order_code}</td>
                        <td className="text-left p-3">{item.users.user_ikm}</td>
                        <td className="text-center p-3">{`${new Date(
                          item.createdAt
                        ).getDate()} - ${
                          new Date(item.createdAt).getMonth() + 1
                        } - ${new Date(item.createdAt).getFullYear()}`}</td>
                        <td className="text-center p-3">
                          <div className="flex items-center gap-4 justify-center text-primary-900 font-semibold">
                            <div className="relative">
                              <select
                                id="status"
                                name="status"
                                defaultValue={item.order_status}
                                // value={item.order_status}
                                onChange={(e) => handleChange(e, item)}
                                className={`${
                                  item.order_status === null
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
                                    item.order_status === null
                                      ? 'null'
                                      : item.order_status
                                  }
                                >
                                  {item.order_status === null
                                    ? 'Status PO'
                                    : item.order_status === 2
                                    ? 'Diterima'
                                    : 'Belum Disetujui'}
                                </option>
                                <option value="1">Status PO</option>
                                <option value="2">Diterima</option>
                                <option value="3">Belum Disetujui</option>
                              </select>
                              <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
                            </div>
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
            totalPosts={orderData?.length}
            paginate={paginate}
          />
        </article>
      </section>
    </>
  );
};

export default Dashboard;
