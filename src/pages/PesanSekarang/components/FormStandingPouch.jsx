import React from 'react';
// import { postProduct } from "../../../services/api";
import { IoIosArrowDown } from 'react-icons/io';

const FormStandingPouch = ({ formData }) => {
  console.log(formData);
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
          name="order_specification"
          className="input-field-select-xs"
        >
          <option>
            {formData.panjang_1} cm X {formData.lebar_1} cm{' '}
            {formData.order_finishing_name}
          </option>
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
          className="input-field-select-xs"
        >
          <option>{formData.order_design}</option>
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
            name="jumlah"
            className="input-field-xs !pr-12"
            placeholder="Masukkan Jumlah Pesanan"
            required
            disabled
            defaultValue={formData.order_quantity}
          />
          <span className="text-gray-400 absolute right-3 top-[11px]">pcs</span>
        </div>
      </div>
    </form>
  );
};

export default FormStandingPouch;
