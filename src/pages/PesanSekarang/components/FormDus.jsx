import React from "react";
// import { postProduct } from '../../../services/api';
import { IoIosArrowDown } from "react-icons/io";

const FormDus = ({ formData }) => {
  return (
    <>
      <form className="w-full">
        <div>
          <label
            htmlFor="ukuran"
            className="block mb-2 text-sm font-medium text-gray-700"
          ></label>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 mb-2">
            <div className="relative col-span-3 xs:col-span-1">
              <input
                type="text"
                id="ukuran"
                name="panjang"
                className="input-field-xs !pr-12"
                placeholder="Panjang"
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
                disabled
                defaultValue={formData?.tinggi_1}
              />
              <span className="text-gray-400 absolute right-3 top-[11px]">
                cm
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            <div className="relative col-span-3 xs:col-span-1">
              <input
                type="text"
                id="ukuran"
                name="panjang"
                className="input-field-xs !pr-12"
                placeholder="Panjang"
                disabled
                defaultValue={formData?.panjang_2}
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
                disabled
                defaultValue={formData?.lebar_2}
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
                disabled
                defaultValue={formData?.tinggi_2}
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
          <select id="bahan" name="bahan" className="input-field-select-xs">
            <option>{formData.order_material_id}</option>
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
          <select id="desain" name="desain" className="input-field-select-xs">
            <option>{formData.order_design}</option>
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
            name="laminasi"
            className="input-field-select-xs"
          >
            <option>{formData.order_finishing_id}</option>
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
              defaultValue={formData.order_quantity}
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              pcs
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormDus;
