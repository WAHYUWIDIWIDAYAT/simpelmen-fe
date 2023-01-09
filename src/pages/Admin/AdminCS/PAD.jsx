import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';
import { adminCS } from '../../../services/api';

const PAD = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [data, setData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = data?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (token) => {
    await adminCS
      .get('/pad', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  async function padStatus(status, id) {
    await adminCS
      .put(
        `/pad/${id}`,
        {
          retribution_pad: parseInt(status),
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
    padStatus(e.target.value, item.retribution_id);
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
        <h3 className="font-semibold pb-3">PAD</h3>
      </div>
      <h6 className="mt-10 mb-3">Tabel PAD </h6>
      <div className="flex items-center justify-end gap-4 mb-4">
        <button className="button-success-sm !px-6 !rounded-full">
          Download
        </button>
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
      {/*  */}
      <div className="grid grid-systems gap-x-8 gap-y-6 mb-5">
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
      {/*  */}
      <div className="flex gap-2 items-center mb-5">
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
      <article id="tablePAD">
        <div className="overflow-x-auto">
          <table className="table-auto mb-4 w-full">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 text-center w-[8%] min-w-[54px]">
                  No
                </th>
                <th className="text-white p-3 text-center w-[27%] min-w-[196px]">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 text-left w-[17%] min-w-[140px]">
                  Nama IKM
                </th>
                <th className="text-white p-3 text-center w-[24%] min-w-[180px]">
                  Nominal Transaksi
                </th>
                <th className="text-white p-3 text-center w-[24%] min-w-[234px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [1, 2, 3].map((item) => (
                    <tr
                      className="border-b animate-pulse"
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
                        <div className="py-2">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
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
                      <td className="text-center p-3">
                        {item?.orders.order_code}
                      </td>
                      <td className="text-left p-3">
                        {item?.orders.users.user_ikm}
                      </td>
                      <td className="text-center p-3">
                        {item?.retribution_jasa_total}
                      </td>
                      <td className="text-center py-3 px-4 flex justify-center">
                        <div className="relative">
                          <select
                            id="status"
                            name="status"
                            defaultValue={item?.retribution_pad_status}
                            // value={item?.status}
                            onChange={(e) => handleChange(e, item)}
                            className={`${
                              item?.retribution_pad_status === null
                                ? '!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red'
                                : parseInt(item?.retribution_pad_status) === 2
                                ? '!bg-green-500'
                                : parseInt(item?.retribution_pad_status) === 3
                                ? '!bg-secondary-800'
                                : ''
                            } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                          >
                            <option value="1">Status PAD</option>
                            <option value="2">Setor</option>
                            <option value="3">Belum Setor</option>
                          </select>
                          <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
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
          totalPosts={data?.length}
          paginate={paginate}
        />
      </article>
    </section>
  );
};

export default PAD;
