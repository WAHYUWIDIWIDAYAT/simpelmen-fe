import React from "react";
import { IoIosArrowDown } from "react-icons/io";
// import { postProduct } from '../../../services/api';

const FormSticker = ({ formData }) => {
  return (
    <form>
      <div className="relative">
        <label
          htmlFor="bentuk"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Bentuk
        </label>
        <select id="desain" name="desain" className="input-field-select-xs">
          <option>{formData?.bentuk}</option>
          {/* <option value="1">Jasa Bentuk</option>
          <option value="2">Tanpa Bentuk</option> */}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      <div className="mt-4">
        <label
          htmlFor="ukuran"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Ukuran
        </label>
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="panjang"
              className="input-field-xs !pr-12"
              placeholder="Panjang"
              required
              disabled
              defaultValue={formData?.panjang_1}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="lebar"
              className="input-field-xs !pr-12"
              placeholder="Lebar"
              required
              disabled
              defaultValue={formData?.lebar_1}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="ukuran"
              name="tinggi"
              className="input-field-xs !pr-12"
              placeholder="Tinggi"
              required
              disabled
              defaultValue={formData?.tinggi_1}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
          </div>
        </div>
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
          className="input-field-select-xs"
        >
          <option>{formData?.order_design}</option>
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
            disabled
            defaultValue={formData?.order_quantity}
          />
          <span className="text-gray-400 absolute right-3 top-[11px]">pcs</span>
        </div>
      </div>
    </form>
  );
};

export default FormSticker;
