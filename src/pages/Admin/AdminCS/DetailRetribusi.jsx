import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { adminCS } from "../../../services/api";

const DetailRetribusi = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const navigate = useNavigate();
  const { retribusiId } = useParams();
  const [fields, setFields] = useState({});
  const [data, setData] = useState();
  const disable = true;
  const [detailRetribution, setDetailRetribution] = useState();
  let totalRetribution = 0;
  useEffect(() => {
    const getData = async () => {
      await adminCS
        .get(`/retributions/${retribusiId}`, {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setData(response.data[0]));
    };
    getData();
  }, [parseUser.data.token, retribusiId]);

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
    setDetailRetribution({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const retribution_jasa_total =
      parseInt(fields.retribution_jasa_pound) +
      parseInt(fields.retribution_jasa_sablon) +
      parseInt(fields.retribution_jasa_design) +
      parseInt(fields.retribution_jasa_finishing) +
      parseInt(fields.retribution_jasa_karton);
    await adminCS
      .put(
        `/retributions/${retribusiId}`,
        {
          retribution_jasa_pound: fields.retribution_jasa_pound,
          retribution_jasa_sablon: fields.retribution_jasa_sablon,
          retribution_jasa_design: fields.retribution_jasa_design,
          retribution_jasa_finishing: fields.retribution_jasa_finishing,
          retribution_jasa_karton: fields.retribution_jasa_karton,
          retribution_jasa_total: retribution_jasa_total,
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => navigate(-1));
  }

  return (
    <>
      <section>
        <div className=" border-b border-orange-900 mb-6">
          <h3 className="font-semibold pb-3">Retribusi Pelanggan</h3>
        </div>
        <div className="flex items-center mb-6">
          <HiOutlineArrowSmLeft className="text-2xl mr-3" />
          <span
            className="leading-10 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Kembali
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h6 className="mr-3 mb-2 sm:mb-0">Kemasan Karton A{retribusiId}</h6>
          <h6>001/BIKDK/O/VII/2022</h6>
        </div>
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            Ukuran Produk
          </p>
          <div className="grid xmd:grid-cols-3 gap-4 xmd:gap-3 xmd:w-1/2">
            <div className="relative">
              <input
                type="text"
                id="ukuran"
                name="panjang"
                className={`${
                  disable ? "!bg-secondary-600" : "!bg-white"
                } input-field !pr-12 !pl-4`}
                required
                disabled={disable}
                onChange={(e) => handleChange(e)}
                defaultValue={data?.orders.order_details[0].p1}
              />
              <span className="text-gray-400 absolute right-4 top-[14px]">
                cm
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="ukuran"
                name="lebar"
                className={`${
                  disable ? "!bg-secondary-600" : "!bg-white"
                } input-field !pr-12 !pl-4`}
                required
                disabled={disable}
                onChange={(e) => handleChange(e)}
                defaultValue={data?.orders.order_details[0].l1}
              />
              <span className="text-gray-400 absolute right-4 top-[14px]">
                cm
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="ukuran"
                name="tinggi"
                className={`${
                  disable ? "!bg-secondary-600" : "!bg-white"
                } input-field !pr-12 !pl-4`}
                required
                disabled={disable}
                onChange={(e) => handleChange(e)}
                defaultValue={
                  data?.orders.order_details[0].t1 !== null
                    ? data?.orders.order_details[0].t1
                    : ""
                }
              />
              <span className="text-gray-400 absolute right-4 top-[14px]">
                cm
              </span>
            </div>
          </div>
          <div className="grid xmd:grid-cols-2 gap-0 xmd:gap-7">
            <div className="left">
              <div className="mt-4">
                <label
                  htmlFor="bentuk"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Bentuk Produk
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="bentuk"
                    name="bentuk"
                    className={`${
                      disable ? "!bg-secondary-600" : "!bg-white"
                    } input-field !px-5`}
                    required
                    disabled={disable}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="finishing"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Finishing Produk
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="finishing"
                    name="finishing"
                    className={`${
                      disable ? "!bg-secondary-600" : "!bg-white"
                    } input-field !px-5`}
                    required
                    disabled={disable}
                    onChange={(e) => handleChange(e)}
                    defaultValue={
                      data?.orders.order_details[0]?.products
                        ?.product_finishings?.product_finishing_name
                    }
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="mt-4">
                <label
                  htmlFor="sablon"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Sablon
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="sablon"
                    name="sablon"
                    className={`${
                      disable ? "!bg-secondary-600" : "!bg-white"
                    } input-field !px-5`}
                    required
                    disabled={disable}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="desain"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Desain
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="desain"
                    name="desain"
                    className={`${
                      disable ? "!bg-secondary-600" : "!bg-white"
                    } input-field !px-5`}
                    required
                    disabled={disable}
                    onChange={(e) => handleChange(e)}
                    defaultValue={data?.orders.order_design}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <h6 className="mt-8">Masukkan Retribusi</h6>
          <div className="grid xmd:grid-cols-2 gap-0 xmd:gap-7">
            <div className="left">
              <div className="mt-5">
                <label
                  htmlFor="retribution_jasa_pound"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jasa Pound
                </label>
                <div className="flex items-center gap-5">
                  <h6>Rp</h6>
                  <input
                    type="text"
                    id="retribution_jasa_pound"
                    name="retribution_jasa_pound"
                    className="input-field !px-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="retribution_jasa_karton"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jumlah Karton
                </label>
                <div className="flex items-center gap-5">
                  <h6>Rp</h6>
                  <input
                    type="text"
                    id="retribution_jasa_karton"
                    name="retribution_jasa_karton"
                    className="input-field !px-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="retribution_jasa_sablon"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jasa Sablon
                </label>
                <div className="flex items-center gap-5">
                  <h6>Rp</h6>
                  <input
                    type="text"
                    id="retribution_jasa_sablon"
                    name="retribution_jasa_sablon"
                    className="input-field !px-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="mt-4 xmd:mt-5">
                <label
                  htmlFor="retribution_jasa_design"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jasa Desain
                </label>
                <div className="flex items-center gap-5">
                  <h6>Rp</h6>
                  <input
                    type="text"
                    id="retribution_jasa_design"
                    name="retribution_jasa_design"
                    className="input-field !px-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="retribution_jasa_finishing"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jasa Finishing
                </label>
                <div className="flex items-center gap-5">
                  <h6>Rp</h6>
                  <input
                    type="text"
                    id="retribution_jasa_finishing"
                    name="retribution_jasa_finishing"
                    className="input-field !px-5"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-12 flex items-center justify-end gap-4">
                <label
                  htmlFor="jumlahorder"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Jumlah Order :
                </label>

                <input
                  type="text"
                  id="jumlahorder"
                  name="jumlahorder"
                  className="input-field !px-5 !w-[160px]"
                  required
                  disabled
                  onChange={(e) => handleChange(e)}
                  defaultValue={
                    data?.orders.order_details[0]?.order_detail_quantity
                  }
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card bg-white text-dark w-full xmd:w-[54%] min-w-0 xmd:min-w-[460px] rounded-xl py-6 sm:py-8 px-8 sm:px-10 border border-secondary-900/60 mx-auto mt-12">
            <h6 className="text-center mb-4">Rincian Retribusi</h6>
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-6">
                <thead>
                  <tr>
                    <th className="text-center pr-2 py-4 w-[10%] min-w-[36px]"></th>
                    <th className="text-left px-2 py-4 w-[60%] text-sm font-normal text-black/60 min-w-[150px]">
                      Nama item
                    </th>
                    <th className="text-left px-2 py-4 w-[30%] text-sm font-normal text-black/60 min-w-[150px]">
                      Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center pr-2 py-2 text-black/60">1</td>
                    <td className="p-2">Jasa Pound</td>
                    <td className="p-2">
                      Rp {detailRetribution?.retribution_jasa_pound}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center pr-2 py-2 text-black/60">2</td>
                    <td className="p-2">Jasa Karton</td>
                    <td className="p-2">
                      Rp {detailRetribution?.retribution_jasa_karton}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center pr-2 py-2 text-black/60">3</td>
                    <td className="p-2">Jasa Sablon</td>
                    <td className="p-2">
                      Rp {detailRetribution?.retribution_jasa_sablon}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center pr-2 py-2 text-black/60">3</td>
                    <td className="p-2">Jasa Desain</td>
                    <td className="p-2">
                      Rp {detailRetribution?.retribution_jasa_design}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center pr-2 py-2 text-black/60">3</td>
                    <td className="p-2">Jasa Finishing</td>
                    <td className="p-2">
                      Rp {detailRetribution?.retribution_jasa_finishing}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="mb-6 border-secondary-900/30 mx-0 sm:mx-10" />
            <div className="flex justify-end mx-0 sm:mx-10">
              <div className="w-full md:w-[70%] flex justify-between">
                <div>
                  <p className="mb-[14px] text-black/60">Total Order</p>
                  <p className="text-black/60">Subtotal</p>
                </div>
                <div>
                  <p className="text-right mb-3">
                    {data?.orders.order_quantity}
                  </p>
                  <p className="text-right text-lg font-semibold text-[#427afb]">
                    Rp. {totalRetribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="button-dark !w-60">Simpan</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DetailRetribusi;
