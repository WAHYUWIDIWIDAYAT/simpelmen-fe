import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { adminCS } from "../../../services/api";

const Dashboard = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [customerRetribution, setCustomerRetribution] = useState();
  const [customerStatus, setCustomerStatus] = useState();
  const [order, setOrder] = useState();
  const [currentPage, setCurrentPage] = useState({
    retribusi: 1,
    status: 1,
    rekap: 1,
  });
  const postPerPage = 5;

  const indexLastPostRetribution = currentPage.retribusi * postPerPage;
  const indexFirstPostRetribution = indexLastPostRetribution - postPerPage;
  const indexLastPostStatus = currentPage.status * postPerPage;
  const indexFirstPostStatus = indexLastPostStatus - postPerPage;
  const indexLastPostRekap = currentPage.rekap * postPerPage;
  const indexFirstPostRekap = indexLastPostRekap - postPerPage;
  const currentDataRetribution = customerRetribution?.slice(
    indexFirstPostRetribution,
    indexLastPostRetribution
  );
  const currentDataStatus = customerStatus?.slice(
    indexFirstPostStatus,
    indexLastPostStatus
  );
  const currentDataRekap = order?.slice(
    indexFirstPostRekap,
    indexLastPostRekap
  );
  const paginateRetribution = (pageNumber) =>
    setCurrentPage({ ...currentPage, retribusi: pageNumber });
  const paginateStatus = (pageNumber) =>
    setCurrentPage({ ...currentPage, status: pageNumber });
  const paginateRekap = (pageNumber) =>
    setCurrentPage({ ...currentPage, rekap: pageNumber });

  useEffect(() => {
    const getRetribution = async () => {
      await adminCS
        .get("/retributions", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setCustomerRetribution(response.data));
    };
    getRetribution();
  }, [parseUser.data.token]);

  useEffect(() => {
    const getOrders = async () => {
      await adminCS
        .get("/orders", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setCustomerStatus(response.data));
    };
    getOrders();
  }, [parseUser.data.token]);

  // get rekap-pesanan
  useEffect(() => {
    const getData = async () => {
      await adminCS
        .get("/rekap/order", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setOrder(response.data));
    };
    getData();
  }, [parseUser.data.token]);

  return (
    <section>
      <div className="border-b border-orange-900">
        <h3 className="font-semibold pb-3">Dashboard CS</h3>
      </div>
      <article id="retribusiPelanggan">
        <h6 className="mt-10 mb-4">Tabel Retribusi Pelanggan </h6>
        <div className="overflow-x-auto">
          <table className="table-auto w-full mb-4">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                  No
                </th>
                <th className="text-white p-3 w-[28%] min-w-[218px] text-center">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 w-1/5 min-w-[180px] text-left">
                  Nama IKM
                </th>
                <th className="text-white p-3 w-[28%] min-w-[218px] text-center">
                  Nominal Transaksi
                </th>
                <th className="text-white p-3 w-[16%] min-w-[160px] text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDataRetribution?.map((item, index) => (
                <tr className=" border-b" key={item.orders.order_id}>
                  <td className="text-center px-3 py-2">{index + 1}</td>
                  <td className="text-center px-3 py-2">
                    {item.orders.order_code}
                  </td>
                  <td className="text-left px-3 py-2">
                    {item.orders.users.user_ikm}
                  </td>
                  <td className="text-center px-3 py-2">
                    Rp. {item.retribution_jasa_total || 0}
                  </td>
                  <td className="text-center py-2 px-4">
                    <div
                      className={`${
                        item.retribution_status === "0"
                          ? "bg-[#6D6061]"
                          : item.retribution_status === "1"
                          ? "bg-[#21B630]"
                          : item.retribution_status === "2"
                          ? "bg-primary-900"
                          : ""
                      } text-white py-2 rounded-lg font-semibold text-sm`}
                    >
                      {item.retribution_status === "0"
                        ? "Belum Diproses"
                        : item.retribution_status === "1"
                        ? "Disetujui"
                        : item.retribution_status === "2"
                        ? "Belum Disetujui"
                        : ""}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          type="dashboard"
          currentPage={currentPage.retribusi}
          postsPerPage={postPerPage}
          totalPosts={customerRetribution?.length}
          paginate={paginateRetribution}
        />
      </article>

      <article id="statusPOPelanggan">
        <h6 className="mt-5 mb-4">Tabel Status PO Pelanggan </h6>
        <div className="overflow-x-auto">
          <table className="table-auto mb-4 w-full">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                  No
                </th>
                <th className="text-white p-3 w-[44%] text-center min-w-[218px]">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 w-[32%] text-left min-w-[180px]">
                  Nama IKM
                </th>
                <th className="text-white p-3 w-[16%] text-center min-w-[160px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDataStatus?.map((item, index) => (
                <tr className=" border-b" key={index}>
                  <td className="text-center px-3 py-2">{index + 1}</td>
                  <td className="text-center px-3 py-2">{item?.order_code}</td>
                  <td className="text-left px-3 py-2">
                    {item?.delivery_details[0]?.delivery_detail_ikm}
                  </td>
                  <td className="text-center px-4 py-2">
                    {item?.order_status === null ? (
                      <div className="bg-[#6D6061] text-white py-2 rounded-lg font-semibold text-sm truncate px-2">
                        Belum Diproses
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          type="dashboard"
          currentPage={currentPage.status}
          postsPerPage={postPerPage}
          totalPosts={customerStatus?.length}
          paginate={paginateStatus}
        />
      </article>

      <article id="rekapPesanan">
        <h6 className="mt-5 mb-4">Tabel Rekap Pesanan </h6>
        <div className="overflow-x-auto">
          <table className="table-auto mb-4 w-full">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                  No
                </th>
                <th className="text-white p-3 w-[32%] min-w-[218px] text-center">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 w-[20%] min-w-[180px] text-left">
                  Nama IKM
                </th>
                <th className="text-white p-3 w-[15%] min-w-[160px] text-center">
                  Status
                </th>
                <th className="text-white p-3 w-[25%] min-w-[218px] text-center">
                  Nominal Transaksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDataRekap?.map((item, index) => (
                <tr className=" border-b" key={index}>
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="text-center p-3">{item.order_code}</td>
                  <td className="text-left p-3">{item.users.user_ikm}</td>
                  <td className="text-center p-3">
                    {item.order_statuses[0]?.order_status_admin_code === 1
                      ? "Super Admin"
                      : item.order_statuses[0]?.order_status_admin_code === 2
                      ? "Admin CS"
                      : item.order_statuses[0]?.order_status_admin_code === 3
                      ? "Admin Kasir"
                      : item.order_statuses[0]?.order_status_admin_code === 4
                      ? "Admin Desain"
                      : item.order_statuses[0]?.order_status_admin_code === 5
                      ? "Admin Gudang"
                      : item.order_statuses[0]?.order_status_admin_code === 6
                      ? "Admin Produksi"
                      : item.order_statuses[0]?.order_status_admin_code === 7
                      ? "Admin TU"
                      : ""}
                  </td>
                  <td className="text-center p-3">
                    Rp. {item.retributions[0]?.retribution_jasa_total || 0}
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
          totalPosts={order?.length}
          paginate={paginateRekap}
        />
      </article>
    </section>
  );
};

export default Dashboard;
