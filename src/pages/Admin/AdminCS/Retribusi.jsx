import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { adminCS } from '../../../services/api';

const Retribusi = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const navigate = useNavigate();
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
      await adminCS
        .get('/retributions', {
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

  // async function handleDelete(e, id) {
  //   e.preventDefault();
  //   await adminCS.delete(`/retributions/${id}`, {
  //     headers: {
  //       "x-access-token": `${parseUser.data.token}`,
  //     },
  //   });
  // }
  // console.log(data);
  return (
    <section>
      <div className="border-b border-orange-900">
        <h3 className="font-semibold pb-3">Retribusi Pelanggan</h3>
      </div>
      <h6 className="mt-10 mb-4">Tabel Retribusi Pelanggan</h6>
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
            name="search"
            required
            autoComplete="on"
            // onChange={handleChange}
          />
          <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
        </div>
      </div>
      <article id="tableRetribusi">
        <div className="overflow-x-auto">
          <table className="table-auto mb-4 w-full">
            <thead>
              <tr className="bg-orange-900">
                <th className="text-white p-3 w-[8%] min-w-[54px] text-center">
                  No
                </th>
                <th className="text-white p-3 w-[27%] min-w-[218px] text-center">
                  Nomor Pesanan
                </th>
                <th className="text-white p-3 w-[15%] text-left min-w-[180px]">
                  Nama IKM
                </th>
                <th className="text-white p-3 w-[20%] text-center min-w-[180px]">
                  Nominal
                </th>
                <th className="text-white p-3 w-[30%] text-center min-w-[260px]">
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
                      <td className="text-left py-3 px-4">
                        <div className="h-3 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="h-3 bg-slate-200 rounded-md"></div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="py-2 flex justify-center gap-3">
                          <div className="h-3 w-20 bg-slate-200 rounded-md"></div>
                          <div className="h-3 w-20 bg-slate-200 rounded-md"></div>
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
                        {item.orders.order_code}
                      </td>
                      <td className="text-left p-3">
                        {item.orders.users.user_ikm}
                      </td>
                      <td className="text-center p-3">
                        Rp.{' '}
                        {item.retribution_jasa_total !== null
                          ? item.retribution_jasa_total
                          : 0}
                      </td>
                      <td className="text-center p-3">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/cs/dashboard/detail-retribusi-pelanggan/${item.retribution_id}`
                              )
                            }
                            className="flex items-center justify-center rounded-lg py-2 px-5 border text-sm transition-200 hover:border-orange-900"
                          >
                            Edit
                          </button>
                          {/* <button
                        className="flex items-center justify-center rounded-lg py-2 px-3 bg-primary-900 transition-200 hover:bg-primary-900/70"
                        onClick={(e) => handleDelete(e, item.retribution_id)}
                      >
                        <FaTrash className="fill-white text-base" />
                      </button> */}
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

export default Retribusi;
