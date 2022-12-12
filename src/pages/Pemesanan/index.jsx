import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Card/Modal";
import { IoIosArrowDown } from "react-icons/io";
import svg from "../../assets/svg";
import { getUser, postOrder } from "../../services/api";
import useGeoLocation from "../../hooks/useGeoLocation";

const dummy = true;

const Pemesanan = ({ item }) => {
  const currentUser = localStorage.getItem("user");
  const parseUser = JSON.parse(currentUser);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isJasaKirim, setIsJasaKirim] = useState(false);
  const [userData, setUserData] = useState();
  const [fields, setFields] = useState({});
  const { data: provinceData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/province`
  );
  const { data: cityData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/city?province_id=${fields.user_province}`
  );
  const { data: districtData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/district?city_id=${fields.user_city}`
  );

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

  // toggle modal post product
  const handleSubmit = async (e) => {
    e.preventDefault();
    openModal();
  };

  // post product checkout api
  const handleCheckout = async () => {
    await postOrder
      .put(
        `/checkout?order_id=${item[0].order_id}`,
        {
          order_id: item.map((data) => data.order_id),
          delivery_detail_name: fields.user_name,
          delivery_detail_ikm: fields.user_ikm,
          delivery_detail_email: fields.user_email,
          delivery_detail_contact: fields.user_contact,
          delivery_detail_method: fields.user_shipping,
          delivery_detail_address: fields.user_address,
          delivery_detail_district: fields.user_district,
          delivery_detail_postal_code: fields.postal_code,
          delivery_detail_courier: fields.user_courier,
          delivery_detail_note: fields.user_note,
        },
        {
          headers: {
            "x-access-token": parseUser.data.token,
          },
        }
      )
      .then((response) => navigate("/"))
      .catch((e) => console.log(e));
    setIsOpen(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      await getUser
        .get("/profile", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setUserData(response);
          setFields({
            user_name: response.data.data.user_name,
            user_ikm: response.data.data.user_ikm,
            user_email: response.data.data.user_email,
            user_contact: response.data.data.user_contact,
            user_address: response.data.data.user_address,
            user_province:
              response.data.data.subdistricts.cities.provinces.province,
            user_city: response.data.data.subdistricts.cities.city_name,
            user_district: response.data.data.user_district,
            user_postal_code: response.data.data.user_postal_code,
            user_shipping: "sendiri",
            user_courier: "jk1",
          });
        })
        .catch((e) => console.log(e));
    };
    getUserData();
  }, [parseUser.data.token]);

  return (
    <>
      {dummy ? (
        <>
          <hr className="my-10 border-primary-400/50" />
          <section id="alamat">
            {fields.user_postal_code === undefined ? (
              <h6 className="font-semibold">
                Silahkan Lengkapi Data Diri Anda di Dashboard
              </h6>
            ) : (
              ""
            )}
            <form
              className="w-full grid grid-cols-4 2xsm:grid-cols-8 2md:grid-cols-12 gap-x-8"
              onSubmit={handleSubmit}
            >
              <div className="col-span-4 2md:col-span-6">
                <div className="mb-5">
                  <label
                    htmlFor="user_name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nama Lengkap"
                    name="user_name"
                    id="user_name"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_name}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="user_ikm"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Nama IKM <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nama IKM"
                    name="user_ikm"
                    id="user_ikm"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_ikm}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="user_email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="input-field-xs"
                    placeholder="Masukkan Email"
                    name="user_email"
                    id="user_email"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_email}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="user_contact"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    No. Handphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nomor Handphone"
                    name="user_contact"
                    id="user_contact"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_contact}
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
                    htmlFor="user_note"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Catatan
                  </label>
                  <textarea
                    name="user_note"
                    id="user_note"
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
                    htmlFor="user_address"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Alamat Lengkap"
                    name="user_address"
                    id="user_address"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_address}
                  />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="user_province"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="user_province"
                    id="user_province"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option
                      value={
                        userData?.data?.data?.subdistricts?.cities.provinces
                          .province_id
                      }
                    >
                      {userData?.data?.data?.subdistricts
                        ? userData?.data.data.subdistricts?.cities.provinces
                            .province
                        : "Pilih Provinsi"}
                    </option>
                    {provinceData?.map((item) => (
                      <option value={item.province_id} key={item.province_id}>
                        {item.province}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="user_city"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kota / Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="user_city"
                    id="user_city"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option
                      value={userData?.data?.data?.subdistricts?.cities.city_id}
                    >
                      {userData?.data?.data?.subdistricts
                        ? userData?.data?.data?.subdistricts?.cities.city_name
                        : "Pilih Kota/Kabupaten"}
                    </option>
                    {cityData?.map((item) => (
                      <option value={item.city_id} key={item.city_id}>
                        {item.city_name}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="user_district"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="user_district"
                    id="user_district"
                    className="input-field-select-xs"
                    required
                    onChange={(e) => handleChange(e)}
                  >
                    <option
                      value={userData?.data?.data?.subdistricts?.subdistrict_id}
                    >
                      {userData?.data?.data?.subdistricts
                        ? userData?.data?.data?.subdistricts?.subdistrict_name
                        : "Pilih Kecamatan"}
                    </option>
                    {districtData?.map((item) => (
                      <option
                        value={item.subdistrict_id}
                        key={item.subdistrict_id}
                      >
                        {item.subdistrict_name}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="user_postal_code"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Kode Pos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field-xs"
                    placeholder="Masukkan Nomor Kode Pos"
                    name="user_postal_code"
                    id="user_postal_code"
                    required
                    onChange={(e) => handleChange(e)}
                    defaultValue={userData?.data?.data?.user_postal_code}
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
                        id="user_shipping"
                        type="radio"
                        name="user_shipping"
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
                        id="user_shipping"
                        type="radio"
                        name="user_shipping"
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
                {/* need api rajaongkir for courier */}
                {isJasaKirim && (
                  <div className="mb-5 relative">
                    <label
                      htmlFor="user_courier"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Jasa Kirim
                    </label>
                    <select
                      name="user_courier"
                      id="user_courier"
                      className="input-field-select-xs"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      {/* get rajaongkir api */}
                      <option value="jk1">Jasa Kirim 1</option>
                      <option value="jk2">Jasa Kirim 2</option>
                    </select>
                    <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
                  </div>
                )}
              </div>
              {fields.user_postal_code === undefined ? (
                <div className="col-span-4 2xsm:col-span-8 2md:col-span-12 flex justify-center mt-8">
                  <button
                    className="button-fill"
                    onClick={() => navigate("/dashboard/profil")}
                  >
                    Update Profil
                  </button>
                </div>
              ) : (
                <div className="col-span-4 2xsm:col-span-8 2md:col-span-12 flex justify-center mt-8">
                  <button className="button-fill">Lanjutkan Pesanan</button>
                </div>
              )}
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
