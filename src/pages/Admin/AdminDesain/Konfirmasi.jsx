import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import Alerts from "../../../components/Alerts";
import { adminDesain } from "../../../services/api";

const Konfirmasi = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [data, setData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const getData = async (token) => {
    await adminDesain
      .get("/orders", {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then((response) => setData(response.data));
  };

  async function approveDesign(id, status) {
    await adminDesain
      .put(
        `/orders/approve/${id}`,
        {
          order_status: parseInt(status),
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
  async function declineDesign(id, status) {
    await adminDesain
      .put(
        `/orders/decline/${id}`,
        {
          order_status: parseInt(status),
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
    if (e.target.value === "2") {
      approveDesign(item.order_id, parseInt(e.target.value));
    } else if (e.target.value === "3") {
      declineDesign(item.order_id, parseInt(e.target.value));
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
          <h3 className="font-semibold pb-3">Konfirmasi Desain</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel Desain Pelanggan</h6>
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
              type="search"
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
        <article id="tableCustomerDesign">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-center text-white p-3 w-[8%] min-w-[54px]">
                    No
                  </th>
                  <th className="text-center text-white p-3 w-[27%] min-w-[196px]">
                    Nomor Pesanan
                  </th>
                  <th className="text-center text-white p-3  w-[26%] min-w-[180px]">
                    Tanggal Pemesanan
                  </th>
                  <th className="text-left text-white p-3 w-[17%] min-w-[140px]">
                    Nama IKM
                  </th>
                  <th className="text-center text-white p-3 w-[22%] min-w-[234px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr className="border-b">
                    <td className="text-center p-3">{index + 1}</td>
                    <td className="text-center p-3">{item.order_code}</td>
                    <td className="text-center p-3">{`${new Date(
                      item.createdAt
                    ).getDate()} - ${
                      new Date(item.createdAt).getMonth() + 1
                    } - ${new Date(item.createdAt).getFullYear()}`}</td>
                    <td className="text-left p-3">{item.users.user_ikm}</td>
                    <td className="text-center py-3 px-4 flex justify-center">
                      <div className="relative">
                        <select
                          id="status"
                          name="status"
                          defaultValue={item.order_status}
                          // value={item.order_status}
                          onChange={(e) => handleChangeStatus(e, item)}
                          className={`${
                            parseInt(item.order_status) === 1
                              ? "!bg-gradient-to-bl !from-orange-900 !to-primary-900 hover:!from-primary-900 hover:!to-orange-900 !shadow-red"
                              : parseInt(item.order_status) === 3
                              ? "!bg-green-500 hover:!bg-green-500/80"
                              : parseInt(item.order_status) === 2
                              ? "!bg-secondary-800 hover:!bg-secondary-800/80"
                              : ""
                          } input-field-select-xs !border-none !font-semibold !text-white !w-auto !pr-12`}
                        >
                          <option value={item.order_status}>
                            {item.order_status === 2
                              ? "Belum Disetujui"
                              : item.order_status === 3
                              ? "Disetujui"
                              : "Status Pesanan"}
                          </option>
                          <option value="1">Status Desain</option>
                          <option value="2">Disetujui</option>
                          <option value="3">Belum Disetujui</option>
                        </select>
                        <IoIosArrowDown className="absolute right-4 top-[15px] text-base fill-white" />
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
    </>
  );
};

export default Konfirmasi;
