import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../../components/Pagination";
import { adminKasir } from "../../../services/api";

const PAD = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [pad, setPad] = useState();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = pad?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        <div className="border-b border-orange-900">
          <h3 className="font-semibold pb-3">PAD</h3>
        </div>
        <h6 className="mt-10 mb-4">Tabel PAD</h6>
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
              <th className="text-white py-3 text-center">Nama IKM</th>
              <th className="text-white py-3 text-center">Nominal Transaksi</th>
              <th className="text-white py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((item, index) => (
              <tr className="border-b" key={index}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.orders.order_code}</td>
                <td className="text-center py-3">
                  {item.orders.users.user_ikm}
                </td>
                <td className="text-center py-3">
                  Rp. {item.retribution_jasa_total}
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
          currentPage={currentPage}
          postsPerPage={postPerPage}
          totalPosts={pad?.length}
          paginate={paginate}
        />
      </section>
    </>
  );
};

export default PAD;
