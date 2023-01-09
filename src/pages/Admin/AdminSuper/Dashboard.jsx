import React, { useEffect, useState } from 'react';
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs';
import { FaBox } from 'react-icons/fa';
import Pagination from '../../../components/Pagination';
import { adminSuper, commonAPI } from '../../../services/api';

const Dashboard = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [dataAdmin, setDataAdmin] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [data, setData] = useState(); //rekap pesanan
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingPesanan, setIsLoadingPesanan] = useState(true);
  const [currentPage, setCurrentPage] = useState({
    admin: 1,
    produk: 1,
    rekap: 1,
  });
  const postPerPage = 5;

  const indexLastPostAdmin = currentPage.admin * postPerPage;
  const indexFirstPostAdmin = indexLastPostAdmin - postPerPage;
  const indexLastPostProduk = currentPage.produk * postPerPage;
  const indexFirstPostProduk = indexLastPostProduk - postPerPage;
  const indexLastPostRekap = currentPage.rekap * postPerPage;
  const indexFirstPostRekap = indexLastPostRekap - postPerPage;
  const currentDataAdmin = dataAdmin?.slice(
    indexFirstPostAdmin,
    indexLastPostAdmin
  );
  const currentDataProduk = dataProduct?.slice(
    indexFirstPostProduk,
    indexLastPostProduk
  );
  const currentDataRekap = data?.slice(indexFirstPostRekap, indexLastPostRekap);
  const paginateAdmin = (pageNumber) =>
    setCurrentPage({ ...currentPage, admin: pageNumber });
  const paginateProduct = (pageNumber) =>
    setCurrentPage({ ...currentPage, produk: pageNumber });
  const paginateRekap = (pageNumber) =>
    setCurrentPage({ ...currentPage, rekap: pageNumber });

  useEffect(() => {
    const getDataAdmin = async () => {
      await adminSuper
        .get(`/data/admin`, {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setDataAdmin(response.data.data);
          setIsLoadingAdmin(false);
        })
        .catch(() => {
          setIsLoadingAdmin(false);
        });
    };
    getDataAdmin();
  }, [parseUser.data.token, parseUser.data.user_status]);

  useEffect(() => {
    const getDataProduct = async () => {
      await commonAPI
        .get(`/product`, {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setDataProduct(response.data);
          setIsLoadingProduct(false);
        })
        .catch(() => {
          setIsLoadingProduct(false);
        });
    };
    getDataProduct();
  }, [parseUser.data.token, parseUser.data.user_status]);

  useEffect(() => {
    const getData = async () => {
      await adminSuper
        .get('/rekap/pesanan', {
          headers: {
            'x-access-token': `${JSON.parse(user).data.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoadingPesanan(false);
        })
        .catch(() => {
          setIsLoadingPesanan(false);
        });
    };
    getData();
  }, [user]);

  return (
    <>
      <section>
        <div className="border-b border-orange-900 mb-8">
          <h3 className="font-semibold pb-3">Dashboard</h3>
        </div>
        <div className="grid grid-cols-4 xmd:grid-cols-8 gap-4">
          <div className="col-span-4 xl:col-span-2">
            <div className="card rounded-xl p-6 flex items-center gap-5 bg-gradient-to-r from-primary-900 to-orange-900">
              <BsFillPersonFill
                fill="#FFFFFF"
                size={40}
              />
              <div className="content">
                <h4 className="!text-white">{dataAdmin?.length}</h4>
                <p className="!text-white">Total Admin</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 xl:col-span-2">
            <div className="card rounded-xl p-6 flex items-center gap-5 bg-gradient-to-r from-primary-900 to-orange-900">
              <FaBox
                fill="#FFFFFF"
                size={40}
              />
              <div className="content">
                <h4 className="!text-white">14</h4>
                <p className="!text-white">Total Produksi</p>
              </div>
            </div>
          </div>
          <div className="col-span-4 xl:col-span-2">
            <div className="card rounded-xl p-6 flex items-center gap-5 bg-gradient-to-r from-primary-900 to-orange-900">
              <BsFillCartFill
                fill="#FFFFFF"
                size={40}
              />
              <div className="content">
                <h4 className="!text-white">14</h4>
                <p className="!text-white">Total Pesanan</p>
              </div>
            </div>
          </div>
        </div>

        <h6 className="mt-10 mb-4">Tabel Admin</h6>
        <article
          id="tableAdmin"
          className="mb-6"
        >
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 min-w-[180px]">
                    Nama Admin
                  </th>
                  <th className="text-center text-white p-3 min-w-[90px]">
                    Jenis Admin
                  </th>
                  <th className="text-center text-white p-3 min-w-[160px]">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingAdmin
                  ? [1, 2, 3].map((item) => (
                      <tr
                        className="animate-pulse border-b"
                        key={item}
                      >
                        <td className="text-center px-4 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-4 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-4 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-4 py-3">
                          <div className="py-2">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentDataAdmin?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={index}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item.user_name}</td>
                        <td className="text-center p-3">
                          {item.roles?.role_name}
                        </td>
                        <td className="text-center p-3">{item.user_email}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <Pagination
            type="dashboard"
            currentPage={currentPage.admin}
            postsPerPage={postPerPage}
            totalPosts={dataAdmin?.length}
            paginate={paginateAdmin}
          />
        </article>

        <h6 className="mb-4">Tabel Produk</h6>
        <article
          id="tableProduk"
          className="mb-6"
        >
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 min-w-[140px]">
                    Bentuk Produk
                  </th>
                  <th className="text-center text-white p-3 min-w-[140px]">
                    Kategori Produk
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingProduct
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
                          <div className="py-2">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentDataProduk?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={index}
                      >
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="text-center py-3">
                          {item.product_name}
                        </td>
                        <td className="text-center py-3">
                          {item?.product_categories?.product_category_name}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <Pagination
            type="dashboard"
            currentPage={currentPage.produk}
            postsPerPage={postPerPage}
            totalPosts={dataProduct?.length}
            paginate={paginateProduct}
          />
        </article>
        <h6 className="mb-4">Rekap Pesanan</h6>
        <article id="tableRekapPesanan">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 min-w-[58px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 min-w-[160px]">
                    Nomor Pesanan
                  </th>
                  <th className="text-left text-white p-3 min-w-[160px]">
                    Nama Pelanggan
                  </th>
                  <th className="text-center text-white p-3 min-w-[140px]">
                    Status
                  </th>
                  <th className="text-center text-white p-3 min-w-[180px]">
                    Total Transaksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingPesanan
                  ? [1, 2, 3].map((item) => (
                      <tr
                        className="border-b"
                        key={item}
                      >
                        <td className="text-center px-3 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-3 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-left px-3 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-3 py-3">
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-3 py-3">
                          <div className="py-2">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentDataRekap?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={index}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item.order_code}</td>
                        <td className="text-left p-3">{item.users.user_ikm}</td>
                        <td className="text-center p-3">
                          <div className="text-white bg-orange-600 rounded-md py-2 px-7">
                            {item?.order_statuses[0].order_status_admin_code ===
                            '8'
                              ? 'Status Pesanan'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 2
                              ? 'Admin CS'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 3
                              ? 'Admin Kasir'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 4
                              ? 'Admin Desain'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 5
                              ? 'Admin Gudang'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 6
                              ? 'Admin Produksi'
                              : item?.order_statuses[0]
                                  .order_status_admin_code === 7
                              ? 'Admin TU'
                              : ''}
                          </div>
                        </td>
                        <td className="text-center p-3">
                          Rp.{' '}
                          {item.retributions[0]?.retribution_jasa_total !== null
                            ? item.retributions[0]?.retribution_jasa_total
                            : '0'}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <Pagination
            type="dashboard"
            currentPage={currentPage.rekap}
            postsPerPage={postPerPage}
            totalPosts={data?.length}
            paginate={paginateRekap}
          />
        </article>
      </section>
    </>
  );
};

export default Dashboard;
