import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Card/Modal";

import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import svg from "../../assets/svg";

const dummy = true;

const Pemesanan = ({ item }) => {
  // console.log(item);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({});
  const [isJasaKirim, setIsJasaKirim] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
    if (e.target.value === "dikirim") {
      setIsJasaKirim(true);
    } else {
      setIsJasaKirim(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fields);
    openModal();
  };

  const handleCheckout = async () => {
    console.log("checkout");
    setIsOpen(false);
  };

  return (
    <>
      {dummy ? (
        <>
          <hr className="my-10 border-primary-400/50" />
          <section id="alamat">
            <form
              className="w-full grid grid-cols-4 2xsm:grid-cols-8 2md:grid-cols-12 gap-x-8"
              onSubmit={handleSubmit}
            >
              <div className="col-span-4 2md:col-span-6">
                <div className="mb-5">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nama Lengkap"
                    name="fullname"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="ikm"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Nama IKM <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nama IKM"
                    name="ikm"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="input-field-xs"
                    placeholder="Masukkan Email"
                    name="email"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    No. Handphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nomor Handphone"
                    name="phone"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="checkbox"
                    name="matchProfile"
                    className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="matchProfile"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sama dengan data diri pada profil saya
                  </label>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="catatan"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Catatan
                  </label>
                  <textarea
                    name="catatan"
                    id="catatan"
                    cols="30"
                    rows="4"
                    className="input-field-xs"
                    placeholder="Masukkan Catatan"
                    required
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
              </div>
              <div className="col-span-4 2md:col-span-6">
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Alamat Lengkap"
                    name="address"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="kecamatan"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kecamatan"
                    id="kecamatan"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="kec1">Kecamatan 1</option>
                    <option value="kec2">Kecamatan 2</option>
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="kota"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kota / Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kota"
                    id="kota"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="kota1">Kota 1</option>
                    <option value="kota2">Kota 2</option>
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="provinsi"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="provinsi"
                    id="provinsi"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="prov1">Provinsi 1</option>
                    <option value="prov2">Provinsi 2</option>
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="kodePos"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kode Pos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nomor Kode Pos"
                    name="kodePos"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="checkbox"
                    name="matchProfile"
                    className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="matchProfile"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sama dengan alamat pada profi saya
                  </label>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="pengiriman"
                    className="block mb-3 text-sm font-medium text-gray-700"
                  >
                    Pengiriman <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-x-5">
                    <label className="relative block">
                      <input
                        id="pengirimanDikirim"
                        type="radio"
                        name="pengiriman"
                        value="dikirim"
                        className="absolute opacity-0 top-0 left-0 -z-10"
                        onChange={(e) => handleChange(e)}
                      />
                      <div
                        className={`${
                          isJasaKirim
                            ? "radio-button-fill"
                            : "radio-button-white"
                        }`}
                      >
                        Dikirim
                      </div>
                    </label>
                    <label className="relative block">
                      <input
                        id="pengirimanSendiri"
                        type="radio"
                        name="pengiriman"
                        value="sendiri"
                        className="absolute opacity-0 top-0 left-0 -z-10"
                        onChange={(e) => handleChange(e)}
                      />
                      <div
                        className={`${
                          isJasaKirim
                            ? "radio-button-white"
                            : "radio-button-fill"
                        }`}
                      >
                        Ambil Sendiri
                      </div>
                    </label>
                  </div>
                </div>
                {isJasaKirim && (
                  <div className="mb-5 relative">
                    <label
                      htmlFor="jasaKirim"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Jasa Kirim
                    </label>
                    <select
                      name="jasaKirim"
                      id="jasaKirim"
                      className="input-field-select-xs"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="jk1">Jasa Kirim 1</option>
                      <option value="jk2">Jasa Kirim 2</option>
                    </select>
                    <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                  </div>
                )}
              </div>
              <div className="col-span-4 2xsm:col-span-8 2md:col-span-12 flex justify-center mt-8">
                <button className="button-fill">Lanjutkan Pesanan</button>
              </div>
            </form>
          </section>
        </>
      ) : (
        <section className="pt-9 pb-12 2xsm:pb-28 xmd:pb-40">
          <div className="w-4/5 md:w-[33.75rem] mx-auto">
            <div className="w-full px-9">
              <img
                src={svg.successPO}
                alt="empty-keranjang"
                className="w-full mb-10"
              />
            </div>
            <h3 className="text-center mb-10">
              Berhasil melakukan permintaan pesanan.
            </h3>
            <div className="flex justify-center">
              <button
                className="button-fill"
                type="button"
                onClick={() => navigate("/dashboard/pesanan")}
              >
                Lihat Detail Pesanan
              </button>
            </div>
          </div>
        </section>
      )}

      {/* <Modal /> */}
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        handleAccept={handleCheckout}
        titleModal="Lanjutkan Pemesanan"
        captionModal="Yakin untuk melanjutkan pemesanan?"
        btnCancelCaption="Kembali"
        btnAcceptCaption="Lanjutkan"
        isErrorModal={false}
      />
    </>
  );
};

export default Pemesanan;