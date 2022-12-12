import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Modal from '../../components/Card/Modal';
import Alerts from '../../components/Alerts';
import { IoIosArrowDown } from 'react-icons/io';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import useGeoLocation from '../../hooks/useGeoLocation';
import { getUser } from '../../services/api';
import regex from '../../services/regex';

const {
  email: REGEX_EMAIL,
  password: REGEX_PASSWORD,
  name: REGEX_NAME,
  phoneNumber: REGEX_PHONE,
  postCode: REGEX_POSTCODE,
} = regex;

const Profile = () => {
  const currentUser = localStorage.getItem('user');
  const parseUser = JSON.parse(currentUser);
  const decodedToken = jwt_decode(parseUser.data.token);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [togglePwdDisabled, setTogglePwdDisabled] = useState(true);
  const [togglePwdConfirm, setTogglePwdConfirm] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPwd, setIsLoadingPwd] = useState(false);
  const [tooltip, showTooltip] = useState(true);
  const [userData, setUserData] = useState();
  const [pwdFields, setPwdFields] = useState({
    user_password_new: '',
    user_confirm_password: '',
  });
  const [fields, setFields] = useState({
    user_name: '',
    user_ikm: '',
    user_email: '',
    user_contact: '',
    user_password: '',
    user_address: '',
    user_province: '',
    user_city: '',
    user_district: '',
    user_postal_code: '',
  });
  const [validateFields, setValidateFields] = useState({
    user_name: false,
    user_ikm: false,
    user_email: false,
    user_contact: false,
    user_postal_code: false,
  });
  const [passwordState, setPasswordState] = useState({
    confirmChange: false,
    newPassword: false,
    confirmNewPassword: false,
    confirmChangePassword: false,
  });
  const [validatePassword, setValidatePassword] = useState({
    user_password_new: false,
    user_confirm_password: false,
  });
  // const [showPassword, setShowPassword] = useState(true);
  const { data: provinceData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/province`
  );
  const { data: cityData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/city?province_id=${fields.user_province}`
  );
  const { data: districtData } = useGeoLocation(
    `https://simpelmen.herokuapp.com/api/district?city_id=${fields.user_city}`
  );

  const validateFieldsHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'user_name':
        setValidateFields({
          ...validateFields,
          user_name: REGEX_NAME.test(value),
        });
        break;
      case 'user_ikm':
        setValidateFields({
          ...validateFields,
          user_ikm: REGEX_NAME.test(value),
        });
        break;
      case 'user_email':
        setValidateFields({
          ...validateFields,
          user_email: REGEX_EMAIL.test(value),
        });
        break;
      case 'user_contact':
        setValidateFields({
          ...validateFields,
          user_contact: REGEX_PHONE.test(value),
        });
        break;
      case 'user_postal_code':
        setValidateFields({
          ...validateFields,
          user_postal_code: REGEX_POSTCODE.test(value),
        });
        break;
      default:
        break;
    }
  };

  const validateFieldPwdHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'user_password_new':
        setValidatePassword({
          ...validatePassword,
          user_password_new: REGEX_PASSWORD.test(value),
        });
        break;
      case 'user_confirm_password':
        setValidatePassword({
          ...validatePassword,
          user_confirm_password: pwdFields.user_password_new === value,
        });
        break;
      default:
        break;
    }
  };

  const validsProfile =
    validateFields.user_name &&
    validateFields.user_ikm &&
    validateFields.user_email &&
    validateFields.user_contact &&
    validateFields.user_postal_code;

  const validsPassword =
    validatePassword.user_password_new &&
    validatePassword.user_confirm_password;

  const closeModalConfirm = () => {
    setToggleConfirm(false);
  };
  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  const handleShowPassword = (type) => {
    if (type === 'confirmChange') {
      setPasswordState({
        ...passwordState,
        confirmChange: !passwordState.confirmChange,
      });
    } else if (type === 'newPassword') {
      setPasswordState({
        ...passwordState,
        newPassword: !passwordState.newPassword,
      });
    } else if (type === 'confirmNewPassword') {
      setPasswordState({
        ...passwordState,
        confirmNewPassword: !passwordState.confirmNewPassword,
      });
    } else if (type === 'confirmChangePassword') {
      setPasswordState({
        ...passwordState,
        confirmChangePassword: !passwordState.confirmChangePassword,
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setToggleConfirm(true);
  }

  const handleEdit = async () => {
    if (validsProfile) {
      setToggleConfirm(false);
      setIsLoadingProfile(true);
      await getUser
        .put('/profile', fields, {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setAlertSuccess(true);
          setIsLoadingProfile(false);
        })
        .catch((e) => {
          setFailMessage(e.response.data.message);
          setAlertFail(true);
          setIsLoadingProfile(false);
        });
    } else {
      setFailMessage('Mohon isi semua fields dengan benar!');
      setAlertFail(true);
    }
  };

  const closeModalPwdConfirm = () => {
    setTogglePwdConfirm(false);
  };
  function handlePwdChange(e) {
    e.preventDefault();
    setPwdFields({
      ...pwdFields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }
  function handlePwdSubmit(e) {
    e.preventDefault();
    setTogglePwdConfirm(true);
  }
  const handlePwdEdit = async () => {
    if (validsPassword) {
      setTogglePwdConfirm(false);
      setIsLoadingPwd(true);
      await getUser
        .put(`/changepassword/${decodedToken.user_id}`, pwdFields, {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setAlertSuccess(true);
          setIsLoadingPwd(false);
          setPwdFields({});
        })
        .catch((e) => {
          setFailMessage(e.response.data.message);
          setAlertFail(true);
          setIsLoadingPwd(false);
        });
    } else {
      setFailMessage('Mohon isi semua fields dengan benar!');
      setAlertFail(true);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      await getUser
        .get('/profile', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => {
          setUserData(response);
          setFields({
            user_name: response.data.data.user_name,
            user_ikm: response.data.data.user_ikm,
            user_email: response.data.data.user_email,
            user_contact: response.data.data.user_contact,
            user_password: response.data.data.user_password,
            user_address: response.data.data.user_address,
            user_province: response.data.data.user_province,
            user_city: response.data.data.user_city,
            user_district: response.data.data.user_district,
            user_postal_code: response.data.data.user_postal_code,
          });
          setValidateFields({
            user_name: REGEX_NAME.test(response.data.data.user_name),
            user_ikm: REGEX_NAME.test(response.data.data.user_ikm),
            user_email: REGEX_EMAIL.test(response.data.data.user_email),
            user_contact: REGEX_PHONE.test(response.data.data.user_contact),
            user_postal_code: REGEX_POSTCODE.test(
              response.data.data.user_postal_code
            ),
          });
        })
        .catch((e) => console.log(e));
    };
    getUserData();
  }, [parseUser.data.token]);

  useEffect(() => {
    setTimeout(() => {
      if (alertSuccess || alertFail === true)
        setAlertFail(false) || setAlertSuccess(false);
    }, 2000);
  }, [alertFail, alertSuccess]);

  return (
    <>
      {alertSuccess && (
        <Alerts
          state="true"
          background="bg-green-100"
          textColor="text-green-600"
          textContent="Profil Berhasil Diubah"
        />
      )}
      {alertFail && (
        <Alerts
          state="true"
          background="bg-red-100"
          textColor="text-red-600"
          textContent={`${failMessage}`}
          closeButton="true"
        />
      )}
      <section>
        <article className="mb-12">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="grid grid-cols-4 md:grid-cols-8 gap-y-4 md:gap-y-0 md:gap-x-8"
          >
            <div className="col-span-4 md:col-span-8">
              <h4 className="py-2 pl-3 border-l-[6px] border-primary-900 mb-4">
                Edit Profil
              </h4>
            </div>
            <div className="col-span-4">
              <div className="">
                <label
                  htmlFor="user_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  name="user_name"
                  id="user_name"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handleChange(e);
                    validateFieldsHandler(e);
                  }}
                  defaultValue={userData?.data?.data?.user_name}
                  className={`input-field-xs ${
                    fields.user_name &&
                    !validateFields.user_name &&
                    'field-error'
                  }`}
                  aria-invalid={validateFields.user_name ? 'false' : 'true'}
                  aria-describedby="nameField"
                />
                {fields.user_name && !validateFields.user_name && (
                  <p
                    id="nameField"
                    className="flex items-center ml-1 mt-1"
                  >
                    <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                    <span className="error-inputs">
                      Mohon masukkan nama dengan benar.
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="user_ikm"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Nama IKM
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama IKM"
                  name="user_ikm"
                  id="user_ikm"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handleChange(e);
                    validateFieldsHandler(e);
                  }}
                  defaultValue={userData?.data?.data?.user_ikm}
                  className={`input-field-xs ${
                    fields.user_ikm && !validateFields.user_ikm && 'field-error'
                  }`}
                  aria-invalid={validateFields.user_ikm ? 'false' : 'true'}
                  aria-describedby="ikmField"
                />
                {fields.user_ikm && !validateFields.user_ikm && (
                  <p
                    id="ikmField"
                    className="flex items-center ml-1 mt-1"
                  >
                    <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                    <span className="error-inputs">
                      Mohon masukkan nama IKM dengan benar.
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="user_email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukkan Email"
                  name="user_email"
                  id="user_email"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handleChange(e);
                    validateFieldsHandler(e);
                  }}
                  defaultValue={userData?.data?.data?.user_email}
                  className={`input-field-xs ${
                    fields.user_email &&
                    !validateFields.user_email &&
                    'field-error'
                  }`}
                  aria-invalid={validateFields.user_email ? 'false' : 'true'}
                  aria-describedby="contactField"
                />
                {fields.user_email && !validateFields.user_email && (
                  <p
                    id="emailField"
                    className="flex items-center ml-1 mt-1"
                  >
                    <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                    <span className="error-inputs">
                      Mohon masukkan email sesuai format.
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="user_contact"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  No. Handphone
                </label>
                <input
                  type="text"
                  placeholder="Masukkan No. Handphone"
                  name="user_contact"
                  id="user_contact"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handleChange(e);
                    validateFieldsHandler(e);
                  }}
                  defaultValue={userData?.data?.data?.user_contact}
                  className={`input-field-xs ${
                    fields.user_contact &&
                    !validateFields.user_contact &&
                    'field-error'
                  }`}
                  aria-invalid={validateFields.user_contact ? 'false' : 'true'}
                  aria-describedby="contactField"
                />
                {fields.user_contact && !validateFields.user_contact && (
                  <p
                    id="contactField"
                    className="flex items-center ml-1 mt-1"
                  >
                    <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                    <span className="error-inputs">
                      Masukkan telepon harus berupa angka.
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-4">
              <div className="">
                <label
                  htmlFor="user_address"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  className="input-field-xs"
                  placeholder="Masukkan Alamat Lengkap"
                  name="user_address"
                  id="user_address"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={handleChange}
                  defaultValue={userData?.data?.data?.user_address}
                />
              </div>
              <div className="relative mt-4">
                <label
                  htmlFor="user_province"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Provinsi
                </label>
                <select
                  id="user_province"
                  name="user_province"
                  disabled={toggleDisabled}
                  onChange={(e) => handleChange(e)}
                  className="input-field-select-xs"
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
                      : 'Pilih Provinsi'}
                  </option>
                  {provinceData?.map((item) => (
                    <option
                      value={item.province_id}
                      key={item.province_id}
                    >
                      {item.province}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
              </div>
              <div className="relative mt-4">
                <label
                  htmlFor="user_city"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kota / Kabupaten
                </label>
                <select
                  id="user_city"
                  name="user_city"
                  disabled={toggleDisabled}
                  onChange={(e) => handleChange(e)}
                  className="input-field-select-xs"
                >
                  <option
                    value={userData?.data?.data?.subdistricts?.cities.city_id}
                  >
                    {userData?.data?.data?.subdistricts
                      ? userData?.data?.data?.subdistricts?.cities.city_name
                      : 'Pilih Kota/Kabupaten'}
                  </option>
                  {cityData?.map((item) => (
                    <option
                      value={item.city_id}
                      key={item.city_id}
                    >
                      {item.city_name}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
              </div>
              <div className="relative mt-4">
                <label
                  htmlFor="user_district"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kecamatan
                </label>
                <select
                  id="user_district"
                  name="user_district"
                  disabled={toggleDisabled}
                  onChange={(e) => handleChange(e)}
                  className="input-field-select-xs"
                >
                  <option
                    value={userData?.data?.data?.subdistricts?.subdistrict_id}
                  >
                    {userData?.data?.data?.subdistricts
                      ? userData?.data?.data?.subdistricts?.subdistrict_name
                      : 'Pilih Kecamatan'}
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
              <div className="mt-4">
                <label
                  htmlFor="kodepos"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kode Pos
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Kode Pos"
                  name="user_postal_code"
                  id="user_postal_code"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handleChange(e);
                    validateFieldsHandler(e);
                  }}
                  defaultValue={userData?.data?.data?.user_postal_code}
                  className={`input-field-xs ${
                    fields.user_postal_code &&
                    !validateFields.user_postal_code &&
                    'field-error'
                  }`}
                  aria-invalid={
                    validateFields.user_postal_code ? 'false' : 'true'
                  }
                  aria-describedby="postCodeField"
                />
                {fields.user_postal_code && !validateFields.user_postal_code && (
                  <p
                    id="postCodeField"
                    className="flex items-center ml-1 mt-1"
                  >
                    <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                    <span className="error-inputs">
                      Masukkan kode pos harus berupa angka.
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-4 md:col-span-8">
              <h6 className="mt-2 md:mt-8 mb-1">Konfirmasi Perubahan</h6>
              <p>
                Masukkan kata sandi untuk menyimpan semua perubahan kemudian
                tekan tombol “Simpan”
              </p>
            </div>
            <div className="col-span-4">
              <div className="md:mt-4 relative">
                <label
                  htmlFor="katasandi"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi
                </label>
                <input
                  type={passwordState.confirmChange ? 'text' : 'password'}
                  className="input-field-xs"
                  placeholder="Masukkan Kata Sandi"
                  name="katasandi"
                  id="katasandi"
                  required
                  disabled={toggleDisabled}
                  autoComplete="on"
                  onChange={handleChange}
                />
                {passwordState.confirmChange ? (
                  <VscEyeClosed
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmChange')}
                  />
                ) : (
                  <VscEye
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmChange')}
                  />
                )}
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 mx-auto mt-12">
              {toggleDisabled ? (
                <button
                  onClick={() => setToggleDisabled(false)}
                  className="button-fill-sm"
                >
                  Edit Profil
                </button>
              ) : (
                <button
                  type="submit"
                  className={`button-fill-sm flex items-center justify-center ${
                    isLoadingProfile ? '!bg-primary-600' : ''
                  }`}
                  disabled={isLoadingProfile}
                >
                  {isLoadingProfile ? (
                    <>
                      <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                      Simpan Perubahan
                    </>
                  ) : (
                    <>Simpan Perubahan</>
                  )}
                </button>
              )}
            </div>
          </form>
        </article>

        <hr className="mb-12" />

        <article>
          <form
            className="grid grid-cols-4 md:grid-cols-8 gap-y-4 md:gap-y-0 md:gap-x-8"
            onSubmit={(e) => handlePwdSubmit(e)}
          >
            <div className="col-span-4 md:col-span-8">
              <h4 className="py-2 pl-3 border-l-[6px] border-primary-900 mb-4">
                Ubah Kata Sandi
              </h4>
            </div>
            <div className="col-span-4">
              <div className="relative">
                <label
                  htmlFor="user_password_new"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type={passwordState.newPassword ? 'text' : 'password'}
                  placeholder="Masukkan Kata Sandi Baru"
                  name="user_password_new"
                  id="user_password_new"
                  required
                  disabled={togglePwdDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handlePwdChange(e);
                    validateFieldPwdHandler(e);
                  }}
                  className={`input-field-xs ${
                    pwdFields.user_password_new &&
                    !validatePassword.user_password_new &&
                    'field-error'
                  }`}
                  aria-invalid={
                    validatePassword.user_password_new ? 'false' : 'true'
                  }
                  aria-describedby="passwordNewField"
                />
                {passwordState.newPassword ? (
                  <VscEyeClosed
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('newPassword')}
                  />
                ) : (
                  <VscEye
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('newPassword')}
                  />
                )}
                {pwdFields.user_password_new &&
                  !validatePassword.user_password_new && (
                    <>
                      <p
                        id="passwordNewField"
                        className="flex items-center ml-1 mt-1"
                      >
                        <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                        <span className="block">
                          <span className="error-inputs mr-1">
                            Mohon masukkan kata sandi dengan benar.
                          </span>
                          <span
                            className="error-inputs underline underline-offset-1 cursor-pointer inline-block relative"
                            onMouseEnter={() => showTooltip(true)}
                            onMouseLeave={() => showTooltip(false)}
                          >
                            Tips
                            {tooltip && (
                              <span className="absolute p-3 bg-dark text-white top-7 right-0 z-50 w-52 rounded-lg translate-x-1/2">
                                <span className="text-white bg-dark !text-center">
                                  Berisikan 8 sampai dengan 24 karakter.
                                  <br />
                                  Harus mengandung huruf besar, huruf kecil,
                                  angka, dan karakter khusus.
                                  <br />
                                  Karakter khusus yang diperbolehkan adalah:
                                  <br />
                                  <span
                                    className="text-sm text-red-500"
                                    aria-label="exclamation mark"
                                  >
                                    !
                                  </span>{' '}
                                  <span
                                    className="text-sm text-red-500"
                                    aria-label="at symbol"
                                  >
                                    @
                                  </span>{' '}
                                  <span
                                    className="text-sm text-red-500"
                                    aria-label="hashtag"
                                  >
                                    #
                                  </span>{' '}
                                  <span
                                    className="text-sm text-red-500"
                                    aria-label="dollar sign"
                                  >
                                    $
                                  </span>{' '}
                                  <span
                                    className="text-sm text-red-500"
                                    aria-label="percent"
                                  >
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </span>
                        </span>
                      </p>
                    </>
                  )}
              </div>
            </div>
            <div className="col-span-4">
              <div className="relative">
                <label
                  htmlFor="user_confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type={passwordState.confirmNewPassword ? 'text' : 'password'}
                  placeholder="Masukkan Konfirmasi Kata Sandi Baru"
                  name="user_confirm_password"
                  id="user_confirm_password"
                  required
                  disabled={togglePwdDisabled}
                  autoComplete="on"
                  onChange={(e) => {
                    handlePwdChange(e);
                    validateFieldPwdHandler(e);
                  }}
                  className={`input-field-xs ${
                    pwdFields.user_confirm_password &&
                    !validatePassword.user_confirm_password &&
                    'field-error'
                  }`}
                  aria-invalid={
                    validatePassword.user_confirm_password ? 'false' : 'true'
                  }
                  aria-describedby="passwordConfirmField"
                />
                {passwordState.confirmNewPassword ? (
                  <VscEyeClosed
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmNewPassword')}
                  />
                ) : (
                  <VscEye
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmNewPassword')}
                  />
                )}
                {pwdFields.user_confirm_password &&
                  !validatePassword.user_confirm_password && (
                    <p
                      id="passwordConfirmField"
                      className="flex items-center ml-1 mt-1"
                    >
                      <BsExclamationCircleFill className="text-base mr-2 fill-red-500" />
                      <span className="error-inputs">
                        Konfirmasi kata sandi baru harus sama dengan kata sandi
                        baru.
                      </span>
                    </p>
                  )}
              </div>
            </div>
            <div className="col-span-4 md:col-span-8">
              <h6 className="mt-2 md:mt-8 mb-1">Konfirmasi Perubahan</h6>
              <p>
                Masukkan kata sandi untuk menyimpan semua perubahan kemudian
                tekan tombol “Simpan”
              </p>
            </div>
            <div className="col-span-4">
              <div className="md:mt-4 relative">
                <label
                  htmlFor="user_password_old"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi Lama
                </label>
                <input
                  type={
                    passwordState.confirmChangePassword ? 'text' : 'password'
                  }
                  className="input-field-xs"
                  placeholder="Masukkan Kata Sandi Lama"
                  name="user_password_old"
                  id="user_password_old"
                  required
                  disabled={togglePwdDisabled}
                  autoComplete="on"
                  onChange={handlePwdChange}
                />
                {passwordState.confirmChangePassword ? (
                  <VscEyeClosed
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmChangePassword')}
                  />
                ) : (
                  <VscEye
                    className="absolute text-xl top-11 right-4 fill-secondary-800 cursor-pointer"
                    onClick={() => handleShowPassword('confirmChangePassword')}
                  />
                )}
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 mx-auto mt-12">
              {togglePwdDisabled ? (
                <button
                  onClick={() => setTogglePwdDisabled(false)}
                  className="button-fill-sm"
                >
                  Ubah Kata Sandi
                </button>
              ) : (
                <button
                  type="submit"
                  className={`button-fill-sm flex items-center justify-center ${
                    isLoadingPwd ? '!bg-primary-600' : ''
                  }`}
                  disabled={isLoadingPwd}
                >
                  {isLoadingPwd ? (
                    <>
                      <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                      Simpan Perubahan
                    </>
                  ) : (
                    <>Simpan Perubahan</>
                  )}
                </button>
              )}
            </div>
          </form>
        </article>
      </section>

      {/* modal confirm */}
      <Modal
        isOpen={toggleConfirm}
        closeModal={closeModalConfirm}
        handleAccept={handleEdit}
        titleModal="Edit Profil"
        captionModal="Simpan perubahan pada profil Anda"
        btnCancelCaption="Kembali"
        btnAcceptCaption="Simpan"
        isErrorModal={false}
      />

      <Modal
        isOpen={togglePwdConfirm}
        closeModal={closeModalPwdConfirm}
        handleAccept={handlePwdEdit}
        titleModal="Ubah Kata Sandi"
        captionModal="Simpan perubahan pada profil Anda"
        btnCancelCaption="Kembali"
        btnAcceptCaption="Simpan"
        isErrorModal={false}
      />
    </>
  );
};

export default Profile;
