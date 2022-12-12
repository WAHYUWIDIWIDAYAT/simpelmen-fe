import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { adminKasir } from "../../../services/api";

const Dashboard = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [sellData, setSellData] = useState();
  const [pad, setPad] = useState();
  const [currentPage, setCurrentPage] = useState({
    pad: 1,
    sell: 1,
  });
  const postPerPage = 5;

  const indexLastPostSell = currentPage.sell * postPerPage;
  const indexFirstPostSell = indexLastPostSell - postPerPage;
  const indexLastPostPAD = currentPage.pad * postPerPage;
  const indexFirstPostPAD = indexLastPostPAD - postPerPage;
  const currentDataSell = sellData?.slice(
    indexFirstPostSell,
    indexLastPostSell
  );
  const currentDataPAD = pad?.slice(indexFirstPostPAD, indexLastPostPAD);

  const paginateSell = (pageNumber) =>
    setCurrentPage({ ...currentPage, sell: pageNumber });
  const paginatePAD = (pageNumber) =>
    setCurrentPage({ ...currentPage, pad: pageNumber });

  useEffect(() => {
    const getData = async () => {
      await adminKasir
        .get("/orders", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setSellData(response.data));
    };
    getData();
  }, [parseUser.data.token]);

  useEffect(() => {
    const getData = async () => {
      await adminKasir
        .get("/pad", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setPad(response.data));
    };
    getData();
  }, [parseUser.data.token]);

  return (
    <>
      <section>
        <div className=" border-b border-orange-900">
          <h3 className="font-semibold pb-3">Dashboard Kasir</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Daftar Pembayaran </h6>
        <table className="table-auto mt-4 w-[1440px] lg:w-full">
          <thead>
            <tr className="bg-orange-900">
              <td className="text-center py-3 text-white">No</td>
              <td className="text-center py-3 text-white">Nomor Pesanan</td>
              <td className="text-center py-3 text-white">Tanggal Pemesanan</td>
              <td className="text-center py-3 text-white">Nama IKM</td>
              <td className="text-center py-3 text-white">Status</td>
            </tr>
          </thead>
          <tbody>
            {currentDataSell?.map((item, index) => (
              <tr className=" border-b" key={index}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.order_code}</td>
                <td className="text-center py-3">{`${new Date(
                  item.createdAt
                ).getDate()} - ${
                  new Date(item.createdAt).getMonth() + 1
                } - ${new Date(item.createdAt).getFullYear()}`}</td>
                <td className="text-center py-3">{item.users.user_ikm}</td>
                <td className="text-center py-3">
                  <div className="flex gap-2 w-full justify-center">
                    <div
                      className={`bg-${
                        item.order_payment_method === null
                          ? "[#6D6061]"
                          : item.order_payment_method === "DP"
                          ? "[#21B630]"
                          : item.order_payment_method === "Langsung"
                          ? "[#21B630]"
                          : ""
                      } text-white py-2 px-3 rounded-lg font-semibold`}
                    >
                      {item.order_payment_method === null
                        ? "Belum Diproses"
                        : item.order_payment_method === "DP"
                        ? "DP"
                        : item.order_payment_method === "Langsung"
                        ? "Langsung"
                        : ""}
                    </div>
                    <div
                      className={`bg-${
                        item.order_payment_status === null
                          ? "[#6D6061]"
                          : item.order_payment_status === "Lunas"
                          ? "[#21B630]"
                          : item.order_payment_status === "Belum Lunas"
                          ? "[#21B630]"
                          : ""
                      } text-white py-2 px-3 rounded-lg font-semibold`}
                    >
                      {item.order_payment_status === null
                        ? "Belum Diproses"
                        : item.order_payment_status === "Lunas"
                        ? "Lunas"
                        : item.order_payment_status === "Belum Lunas"
                        ? "Belum Lunas"
                        : ""}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          type="dashboard"
          currentPage={currentPage.sell}
          postsPerPage={postPerPage}
          totalPosts={sellData?.length}
          paginate={paginateSell}
        />
        {/*  */}
        <h6 className="mt-10 mb-4">Tabel PAD </h6>
        <table className="table-auto mt-4 w-[1440px] lg:w-full">
          <thead>
            <tr className="bg-orange-900">
              <td className="text-center py-3 text-white">No</td>
              <td className="text-center py-3 text-white">Nomor Pesanan</td>
              <td className="text-center py-3 text-white">Nama IKM</td>
              <td className="text-center py-3 text-white">Nominal Transaksi</td>
              <td className="text-center py-3 text-white">Status</td>
            </tr>
          </thead>
          <tbody>
            {currentDataPAD?.map((item, index) => (
              <tr className=" border-b" key={index}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.orders.order_code}</td>
                <td className="text-center py-3">
                  {item.orders.users.user_ikm}
                </td>
                <td className="text-center py-3">
                  Rp.{" "}
                  {item.retribution_jasa_total
                    ? item.retribution_jasa_total
                    : "0"}
                </td>
                <td className="text-center py-3">
                  {item.retribution_pad_status === 2 ? (
                    <div className="bg-[#21B630] text-white py-2 px-3 rounded-lg font-semibold">
                      Disetujui
                    </div>
                  ) : (
                    <div className="bg-primary-900 text-white py-2 px-3 rounded-lg font-semibold">
                      Belum Disetujui
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          type="dashboard"
          currentPage={currentPage.pad}
          postsPerPage={postPerPage}
          totalPosts={pad?.length}
          paginate={paginatePAD}
        />
      </section>
    </>
  );
};

export default Dashboard;
