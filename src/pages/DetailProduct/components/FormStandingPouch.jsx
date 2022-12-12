import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { postOrder } from "../../../services/api";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FormStandingPouch = ({
  formType,
  data,
  productId,
  setAlertSuccess,
  setAlertFail,
}) => {
  const [fields, setFields] = useState({});
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const dummySize = [
    {
      id: 1,
      p: 10,
      l: 12,
    },
    {
      id: 2,
      p: 10,
      l: 15,
    },
    {
      id: 3,
      p: 12,
      l: 20,
    },
    {
      id: 4,
      p: 13,
      l: 20,
    },
    {
      id: 5,
      p: 14,
      l: 20,
    },
    {
      id: 6,
      p: 15,
      l: 22,
    },
    {
      id: 7,
      p: 16,
      l: 24,
    },
    {
      id: 8,
      p: 18,
      l: 26,
    },
    {
      id: 9,
      p: 20,
      l: 30,
    },
  ];

  const dummyLamination = [
    "Laminasi Glossy",
    "Laminasi Doff",
    "Tanpa Laminasi",
  ];

  const dummyDesign = [
    "Lama (Diambil dari data pesanan file pesanan sebelumnya)",
    "Baru (Dibuatkan oleh desainer BIKDK)",
    "Swadesign (File desain dari konsumen)",
    "Re-design (Desain ulang dari pesanan sebelumnya)",
  ];

  const finalDummy = [];

  for (let i = 0; i < dummySize.length; i++) {
    for (let j = 0; j < dummyLamination.length; j++) {
      finalDummy.push({ size: dummySize[i], lamination: dummyLamination[j] });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
  }

  async function handleCart(e) {
    e.preventDefault();
    const finalSpesification = {
      panjang_1: parseInt(fields?.spesifikasi.split(" ")[0]),
      lebar_1: parseInt(fields?.spesifikasi.split(" ")[3]),
      order_design: fields?.order_design,
      order_quantity: parseInt(fields?.order_quantity),
    };

    if (user) {
      await postOrder
        .post(`/cart/${productId}`, finalSpesification, {
          headers: {
            "x-access-token": `${JSON.parse(user).data.token}`,
          },
        })
        .then((response) => setAlertSuccess(true));
    } else {
      setAlertFail(true);
    }
  }
  function handleGetNow(e) {
    e.preventDefault();
    navigate("/pesan-sekarang", {
      state: { data: data, formType: formType, formData: fields },
    });
  }

  return (
    <form onSubmit={(e) => handleCart(e)}>
      <div className="relative">
        <label
          htmlFor="spesifikasi"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Spesifikasi
          <span className="text-primary-900 font-semibold">*</span>
        </label>
        <select
          id="spesifikasi"
          name="spesifikasi"
          required
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
          defaultValue="Pilih Spesifikasi"
        >
          <option value="pilih spesifikasi">Pilih Spesifikasi</option>
          {finalDummy.map((item, index) => (
            <option
              value={`${item.size.p} cm X ${item.size.l} cm ${item.lamination}`}
              key={index}
            >
              {item.size.p} cm X {item.size.l} cm {item.lamination}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      <div className="mt-4 relative">
        <label
          htmlFor="desain"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Desain
          <span className="text-primary-900 font-semibold">*</span>
        </label>
        <select
          id="desain"
          name="order_design"
          required
          onChange={(e) => handleChange(e)}
          className="input-field-select-xs"
        >
          <option value="pilih desain">Pilih Desain</option>
          {dummyDesign.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
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
          <span className="text-primary-900 font-semibold">*</span>
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
        <button className="button-white !p-4">
          <BsCartPlus size={20} className="mx-auto" />
        </button>
      </div>
    </form>
  );
};

export default FormStandingPouch;
