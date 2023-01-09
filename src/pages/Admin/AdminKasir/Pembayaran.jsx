import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Alerts from "../../../components/Alerts";
import Pagination from "../../../components/Pagination";
import { adminKasir } from "../../../services/api";

const Pembayaran = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [sellData, setSellData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = sellData?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getData = async (token) => {
    await adminKasir
      .get("/orders", {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then((response) => setSellData(response.data));
  };

  async function dpOrder(id) {
    await adminKasir
      .put(
        `/orders/dp/${id}`,
        {
          order_status: "DP",
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
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

  async function directOrder(id) {
    await adminKasir
      .put(
        `/orders/langsung/${id}`,
        {
          order_status: "Langsung",
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
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

  function handleChangePembayaran(e, item) {
    e.preventDefault();
    if (e.target.value === "DP") {
      dpOrder(item.order_id);
    } else if (e.target.value === "Langsung") {
      directOrder(item.order_id);
    }

    // const filtered = data.filter((brg) => brg.id === item.id)[0];
    // filtered.statusPembayaran = parseInt(e.target.value);
    // setData((prevState) =>
    //   prevState.map((state) =>
    //     state.id === filtered.id
    //       ? { ...state, statusPembayaran: filtered.statusPembayaran }
    //       : state
    //   )
    // );
  }

  async function lunasOrder(id) {
    await adminKasir
      .put(
        `/orders/lunas/${id}`,
        {
          order_status: "Lunas",
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
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

  async function belumLunasOrder(id) {
    await adminKasir
      .put(
        `/orders/belum-lunas/${id}`,
        {
          order_status: "Belum Lunas",
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
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

  function handleChangeStatus(e, item) {
    e.preventDefault();
    if (e.target.value === "Lunas") {
      lunasOrder(item.order_id);
    } else if (e.target.value === "Belum Lunas") {
      belumLunasOrder(item.order_id);
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
        <div className=" border-b border-orange-900">
          <h3 className="font-semibold">Pembayaran</h3>
        </div>
        <h6 className="mt-10 mb-4">
          Tabel Pembayaran{" "}
          {/* <span className="text-primary-900 font-semibold">
            Work tapi error 500 'cant update tapi data keupdate wkwk'
          </span> */}
        </h6>
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
              type="email"
              className="input-field !rounded-full !py-2 !pl-14"
              placeholder="Cari"
              name="email"
              required
              autoComplete="on"
              // onChange={handleChange}
            />
            <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
          </div>
        </div>
        {/*  */}
        <table className="table-auto w-[1440px] lg:w-full mt-4">
          <thead>
            <tr className="bg-orange-900">
              <th className="text-white py-3 text-center">No</th>
              <th className="text-white py-3 text-center">Nomor Pesanan</th>
              <th className="text-white py-3 text-center">Tanggal Pemesanan</th>
              <th className="text-white py-3 text-center">Nama IKM</th>
              <th className="text-white py-3 text-center">Ongkir</th>
              <th className="text-white py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((item, index) => (
              <tr className="border-b" key={index}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.order_code}</td>
                <td className="text-center py-3">{`${new Date(
                  item.createdAt
                ).getDate()} - ${
                  new Date(item.createdAt).getMonth() + 1
                } - ${new Date(item.createdAt).getFullYear()}`}</td>
                <td className="text-center py-3">{item.users.user_ikm}</td>
                <td className="text-center py-3 text-primary-900 font-semibold">
                  {" "}
                  {/* GAADA RESPONSE */}
                </td>
                <td className="text-center py-3">
                  <div className="flex items-center gap-4 justify-center">
                    <select
                      id="status"
                      name="status"
                      defaultValue={item.order_payment_method}
                      // value={item.status}
                      onChange={(e) => handleChangePembayaran(e, item)}
                      className={`${
                        item.order_payment_method === null
                          ? "bg-gradient-to-bl from-orange-900 to-primary-900 hover:from-primary-900 hover:to-orange-900 shadow-red"
                          : item.order_payment_method === "Langsung"
                          ? "bg-green-500"
                          : item.order_payment_method === "DP"
                          ? "bg-secondary-800"
                          : ""
                      } font-semibold text-white text-sm rounded-lg  block py-2 px-4 outline-none`}
                    >
                      <option
                        value={
                          item.order_payment_method === null
                            ? "null"
                            : item.order_payment_method
                        }
                      >
                        {item.order_payment_method === null
                          ? "Status Pesanan"
                          : item.order_payment_method}
                      </option>
                      <option value="null">Status Pesanan</option>
                      <option value="Langsung">Langsung</option>
                      <option value="DP">DP</option>
                    </select>
                    <select
                      id="status"
                      name="status"
                      defaultValue={item.order_payment_status}
                      // value={item.status}
                      onChange={(e) => handleChangeStatus(e, item)}
                      className={`${
                        item.order_payment_status === null
                          ? "bg-gradient-to-bl from-orange-900 to-primary-900 hover:from-primary-900 hover:to-orange-900 shadow-red"
                          : item.order_payment_status === "Lunas"
                          ? "bg-green-500"
                          : item.order_payment_status === "Belum Lunas"
                          ? "bg-secondary-800"
                          : ""
                      } font-semibold text-white text-sm rounded-lg  block py-2 px-4 outline-none`}
                    >
                      <option
                        value={
                          item.order_payment_status === null
                            ? "null"
                            : item.order_payment_status
                        }
                      >
                        {item.order_payment_status === null
                          ? "Status Pesanan"
                          : item.order_payment_status}
                      </option>
                      <option value="null">Status Pesanan</option>
                      <option value="Belum Lunas">Belum Lunas</option>
                      <option value="Lunas">Lunas</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          type="dashboard"
          currentPage={currentPage}
          postsPerPage={postPerPage}
          totalPosts={sellData?.length}
          paginate={paginate}
        />
      </section>
    </>
  );
};

export default Pembayaran;
