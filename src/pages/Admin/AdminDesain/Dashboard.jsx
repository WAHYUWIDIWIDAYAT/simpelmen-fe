import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination';
import { adminDesain } from '../../../services/api';

const Dashboard = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [data, setData] = useState();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = data?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await adminDesain
        .get('/orders', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    };
    getData();
  }, [parseUser.data.token]);

  return (
    <>
      <section>
        <div className="border-b border-orange-900">
          <h3 className="font-semibold pb-3">Dashboard Desain</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Rekap Pesanan</h6>
        <article id="tableRekapPesanan">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 min-w-[200px]">
                    Nomor Pesanan
                  </th>
                  <th className="text-left text-white p-3 min-w-[160px]">
                    Nama IKM
                  </th>
                  <th className="text-center text-white p-3 min-w-[90px]">
                    Bentuk Produk
                  </th>
                  <th className="text-center text-white p-3 min-w-[192px]">
                    Tanggal Pemesanan
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
                        <td className="text-center p-">{item.order_code}</td>
                        <td className="text-left p-3">{item.users.user_ikm}</td>
                        <td className="text-center p-3">belum ada</td>
                        <td className="text-center p-3">{`${new Date(
                          item.createdAt
                        ).getDate()} - ${
                          new Date(item.createdAt).getMonth() + 1
                        } - ${new Date(item.createdAt).getFullYear()}`}</td>
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

        {/* <h6 className="mt-10 mb-4">Tabel Status Desain</h6>
        <article id="tableStatusDesain">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 min-w-[200px]">
                    Nomor Pesanan
                  </th>
                  <th className="text-center text-white p-3 min-w-[192px]">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-left text-white p-3 min-w-[160px]">
                    Nama IKM
                  </th>
                  <th className="text-center text-white p-3 min-w-[160px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="text-center p-3">{index + 1}</td>
                    <td className="text-center p-">{item.order_code}</td>
                    <td className="text-center p-3">{`${new Date(
                      item.createdAt
                    ).getDate()} - ${
                      new Date(item.createdAt).getMonth() + 1
                    } - ${new Date(item.createdAt).getFullYear()}`}</td>
                    <td className="text-left p-3">{item.users.user_ikm}</td>
                    <td>belum</td>
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
        </article> */}
      </section>
    </>
  );
};

export default Dashboard;
