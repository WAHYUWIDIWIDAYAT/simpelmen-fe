import React, { useState } from "react";
// import { postProduct } from "../../../services/api";
import { IoIosArrowDown } from "react-icons/io";

const FormStandingPouch = ({ data }) => {
  const [fields, setFields] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
  }

  return (
    <form>
      <div className="relative">
        <label
          htmlFor="spesifikasi"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Spesifikasi
        </label>
        <select
          id="spesifikasi"
          name="spesifikasi"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>{`${data.order_details[0]?.p1} X ${data.order_details[0]?.l1}`}</option>
          {/* {finalDummy.map((item, index) => (
            <option
              value={`${item.size.p} cm X ${item.size.l} cm ${item.lamination}`}
            >
              {item.size.p} cm X {item.size.l} cm {item.lamination}
            </option>
          ))} */}
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
          name="desain"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>{data.order_details[0]?.order_detail_design}</option>
          {/* {dummyDesign.map((item, index) => (
            <option value={item}>{item}</option>
          ))} */}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      {/* <div className="mt-4 relative">
        <label
          htmlFor="laminasi"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Laminasi
        </label>
        <select
          id="laminasi"
          name="laminasi"
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option>Pilih Laminasi</option>
          <option value="1">Jasa Laminasi</option>
          <option value="2">Tanpa Laminasi</option>
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div> */}
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
            name="jumlah"
            className="input-field-xs !pr-12"
            placeholder="Masukkan Jumlah Pesanan"
            required
            disabled
            onChange={(e) => handleChange(e)}
            defaultValue={data.order_details[0]?.order_detail_quantity}
          />
          <span className="text-gray-400 absolute right-3 top-[11px]">pcs</span>
        </div>
      </div>
    </form>
  );
};

export default FormStandingPouch;
