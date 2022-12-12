import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { postOrder } from "../../../services/api";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FormDus = ({
  formType,
  productId,
  data,
  setAlertSuccess,
  setAlertFail,
  categoryName,
}) => {
  const [fields, setFields] = useState({});
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const dummyDesign = [
    "Lama (Diambil dari data pesanan file pesanan sebelumnya)",
    "Baru (Dibuatkan oleh desainer BIKDK)",
    "Swadesign (File desain dari konsumen)",
    "Re-design (Desain ulang dari pesanan sebelumnya)",
  ];

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const finalPostData = {
      panjang_1: fields.panjang_1,
      lebar_1: fields.lebar_1,
      tinggi_1: fields.tinggi_1,
      panjang_2: fields.panjang_2,
      lebar_2: fields.lebar_2,
      tinggi_2: fields.tinggi_2,
      order_material_id: fields.order_material_id,
      order_design: fields.order_design,
      order_finishing_id: fields.order_finishing_id,
      order_quantity: fields.order_quantity,
    };
    if (user) {
      await postOrder.post(`/cart/${productId}`, finalPostData, {
        headers: {
          "x-access-token": `${JSON.parse(user).data.token}`,
        },
      });
      setAlertSuccess(true);
      console.log(fields);
    } else {
      setAlertFail(true);
      console.log("no user");
    }
  }

  function handleGetNow(e) {
    e.preventDefault();
    navigate("/pesan-sekarang", {
      state: { data: data, formType: formType, formData: fields },
    });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label
          htmlFor="ukuran"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {categoryName === "Slobokan" ? "Ukuran Luar x Dalam" : "Ukuran"}
        </label>
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="panjang_1"
              className="input-field-xs !pr-12"
              placeholder="Panjang"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="lebar_1"
              className="input-field-xs !pr-12"
              placeholder="Lebar"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="tinggi_1"
              className="input-field-xs !pr-12"
              placeholder="Tinggi"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-4 my-2">
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="panjang_2"
              className="input-field-xs !pr-12"
              placeholder="Panjang 2"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="lebar_2"
              className="input-field-xs !pr-12"
              placeholder="Lebar 2"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="tinggi_2"
              className="input-field-xs !pr-12"
              placeholder="Tinggi 2"
              required
              onChange={(e) => handleChange(e)}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 relative">
        <label
          htmlFor="bahan"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Bahan
        </label>
        <select
          id="bahan"
          name="order_material_id"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>Pilih Bahan</option>
          <option value="1">Jasa Bahan</option>
          <option value="2">Tanpa Bahan</option>
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      <div className="mt-4 relative">
        <label
          htmlFor="desain"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Desain
        </label>
        <select
          id="desain"
          name="order_design"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>Pilih Desain</option>
          {dummyDesign.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      <div className="mt-4 relative">
        <label
          htmlFor="laminasi"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Laminasi
        </label>
        <select
          id="laminasi"
          name="order_finishing_id"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>Pilih Laminasi</option>
          <option value="1">Jasa Laminasi</option>
          <option value="2">Tanpa Laminasi</option>
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      <div className="mt-4">
        <label
          htmlFor="jumlah"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Jumlah Pesanan
        </label>
        <div className="relative">
          <input
            type="text"
            id="jumlah"
            name="order_quantity"
            className="input-field-xs !pr-12"
            placeholder="Masukkan Jumlah Pesanan"
            required
            onChange={(e) => handleChange(e)}
          />
          <span className="text-gray-400 absolute right-3 top-[11px]">pcs</span>
        </div>
      </div>
      <div className="buttons flex justify-end mt-8 gap-5">
        <button className="button-fill !py-4" onClick={(e) => handleGetNow(e)}>
          Pesan Sekarang
        </button>
        <button className="button-white !p-4" type="submit">
          <BsCartPlus size={20} className="mx-auto" />
        </button>
      </div>
    </form>
  );
};

export default FormDus;
