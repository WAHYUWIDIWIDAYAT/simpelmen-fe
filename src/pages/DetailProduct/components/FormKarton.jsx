import React, { useState } from 'react';
import { BsCartPlus, BsFillCloudPlusFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { IoIosArrowDown } from 'react-icons/io';
import { MdDelete, MdPermMedia } from 'react-icons/md';
import { postOrder } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/Alerts/ErrorMessage';

import regex from '../../../services/regex';
import dummyData from './dummyDataForm';

const { number: NUMBER_REGEX } = regex;

const FormKarton = ({ data, productId, setAlertSuccess, setAlertFail }) => {
  const [fields, setFields] = useState({});
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [isUploadDesign, setIsUploadDesign] = useState(false);
  const [validFields, setValidFields] = useState({
    panjang_1: false,
    lebar_1: false,
    tinggi_1: false,
    order_detail_sablon: false,
    order_design: false,
    order_quantity: false,
    order_design_image: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  function handleDesign(e) {
    e.preventDefault();
    if (e.target.value === 'swadesign') {
      setIsUploadDesign(true);
    } else {
      setIsUploadDesign(false);
    }
  }

  function handleFile(e) {
    if (e.target.files[0] !== '' && e.target.files[0].size < 3000000) {
      const file = e.target.files[0];
      if (file) {

        const reader = new FileReader();
        reader.onloadend = () => {
          setFields({
            ...fields,
            order_design_image: {
              data: file,
              name: file.name,
              type: file.type,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function removeFile() {
    setFields({
      ...fields,
      order_design_image: null,
    });
  }

  const validateFieldsHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'panjang_1':
        setValidFields({
          ...validFields,
          panjang_1: NUMBER_REGEX.test(value),
        });
        break;
      case 'lebar_1':
        setValidFields({
          ...validFields,
          lebar_1: NUMBER_REGEX.test(value),
        });
        break;
      case 'tinggi_1':
        setValidFields({
          ...validFields,
          tinggi_1: NUMBER_REGEX.test(value),
        });
        break;
      case 'order_quantity':
        setValidFields({
          ...validFields,
          order_quantity: NUMBER_REGEX.test(value),
        });
        break;
      default:
        break;
    }
  };

  const valids =
    fields.order_design === 'swadesign'
      ? validFields.panjang_1 &&
        validFields.lebar_1 &&
        validFields.tinggi_1 &&
        validFields.order_quantity &&
        validFields.order_detail_sablon &&
        validFields.order_design &&
        validFields.order_design_image
      : validFields.panjang_1 &&
        validFields.lebar_1 &&
        validFields.tinggi_1 &&
        validFields.order_quantity &&
        validFields.order_detail_sablon &&
        validFields.order_design;

  async function handleSubmit(e) {
    e.preventDefault();

    const finalPostProduct =
      fields.order_design === 'swadesign'
        ? {
            panjang_1: fields?.panjang_1,
            lebar_1: fields?.lebar_1,
            tinggi_1: fields?.tinggi_1,
            order_detail_sablon: fields?.order_detail_sablon,
            order_design: fields?.order_design,
            order_quantity: fields?.order_quantity,
            product_image: fields?.order_design_image.data,
          }
        : {
            panjang_1: fields?.panjang_1,
            lebar_1: fields?.lebar_1,
            tinggi_1: fields?.tinggi_1,
            order_detail_sablon: fields?.order_detail_sablon,
            order_design: fields?.order_design,
            order_quantity: fields?.order_quantity,
            product_image: null,
          };
    setIsLoading(true);

    if (user) {
      if (valids) {
        await postOrder
          .post(`/cart/${productId}`, finalPostProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
              'x-access-token': `${JSON.parse(user).data.token}`,
            },
          })
          .then(() => {
            setAlertSuccess(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            removeFile();
            setAlertFail(true);
            setIsLoading(false);
          });
      } else {
        setAlertFail(true);
        setIsLoading(false);
      }
    } else {
      setAlertFail(true);
      setIsLoading(false);
    }
  }

  function handleGetNow(e) {
    e.preventDefault();
    if (user) {
      if (valids) {
        const finalPostProduct =
          fields.order_design === 'swadesign'
            ? {
                panjang_1: fields?.panjang_1,
                lebar_1: fields?.lebar_1,
                tinggi_1: fields?.tinggi_1,
                order_detail_sablon: fields?.order_detail_sablon,
                order_design: fields?.order_design,
                order_quantity: fields?.order_quantity,
                product_image: fields?.order_design_image.data,
              }
            : {
                panjang_1: fields?.panjang_1,
                lebar_1: fields?.lebar_1,
                tinggi_1: fields?.tinggi_1,
                order_detail_sablon: fields?.order_detail_sablon,
                order_design: fields?.order_design,
                order_quantity: fields?.order_quantity,
                product_image: null,
              };
        navigate('/pesan-sekarang', {
          state: { data: data, formData: finalPostProduct },
        });
      } else {
        setAlertFail(true);
        setIsLoading(false);
      }
    } else {
      setAlertFail(true);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* ukuran */}
      <div>
        <label
          htmlFor="ukuran"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Ukuran<span className="text-primary-900 font-semibold">*</span>
        </label>
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="panjang_1"
              name="panjang_1"
              placeholder="Panjang"
              required
              onChange={(e) => {
                handleChange(e);
                validateFieldsHandler(e);
              }}
              className={`input-field-xs ${
                fields.panjang_1 && !validFields.panjang_1 && 'field-error'
              }`}
              aria-invalid={validFields.panjang_1 ? 'false' : 'true'}
              aria-describedby="panjangField"
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
            {fields.panjang_1 && !validFields.panjang_1 && (
              <div className="block xs:hidden">
                <ErrorMessage
                  referenceId="panjangField"
                  message="Masukkan ukuran panjang produk dengan benar."
                  isPasswordField={false}
                />
              </div>
            )}
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="lebar_1"
              name="lebar_1"
              placeholder="Lebar"
              required
              onChange={(e) => {
                handleChange(e);
                validateFieldsHandler(e);
              }}
              className={`input-field-xs ${
                fields.lebar_1 && !validFields.lebar_1 && 'field-error'
              }`}
              aria-invalid={validFields.lebar_1 ? 'false' : 'true'}
              aria-describedby="lebarField"
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
            {fields.lebar_1 && !validFields.lebar_1 && (
              <div className="block xs:hidden">
                <ErrorMessage
                  referenceId="lebarField"
                  message="Masukkan ukuran lebar produk dengan benar."
                  isPasswordField={false}
                />
              </div>
            )}
          </div>
          <div className="relative col-span-3 xs:col-span-1">
            <input
              type="text"
              id="tinggi_1"
              name="tinggi_1"
              placeholder="Tinggi"
              required
              onChange={(e) => {
                handleChange(e);
                validateFieldsHandler(e);
              }}
              className={`input-field-xs ${
                fields.tinggi_1 && !validFields.tinggi_1 && 'field-error'
              }`}
              aria-invalid={validFields.tinggi_1 ? 'false' : 'true'}
              aria-describedby="tinggiField"
            />
            <span className="text-gray-400 absolute right-3 top-[11px]">
              cm
            </span>
            {fields.tinggi_1 && !validFields.tinggi_1 && (
              <div className="block xs:hidden">
                <ErrorMessage
                  referenceId="tinggiField"
                  message="Masukkan ukuran tinggi produk dengan benar."
                  isPasswordField={false}
                />
              </div>
            )}
          </div>
        </div>
        {(fields.panjang_1 && !validFields.panjang_1) ||
        (fields.lebar_1 && !validFields.lebar_1) ||
        (fields.tinggi_1 && !validFields.tinggi_1) ? (
          <div className="hidden xs:block">
            <ErrorMessage
              referenceId="nameField"
              message="Masukkan ukuran produk dengan benar dan sesuai."
              isPasswordField={false}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      {/* order sablon */}
      <div className="mt-4 relative">
        <label
          htmlFor="sablon"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Sablon<span className="text-primary-900 font-semibold">*</span>
        </label>
        <select
          id="order_detail_sablon"
          name="order_detail_sablon"
          onChange={(e) => {
            handleChange(e);
            setValidFields({
              ...validFields,
              order_detail_sablon:
                e.target.value !== '0' && e.target.value !== '',
            });
          }}
          className={`input-field-select-xs ${
            fields.order_detail_sablon &&
            !validFields.order_detail_sablon &&
            'field-error'
          }`}
          aria-invalid={validFields.order_detail_sablon ? 'false' : 'true'}
          aria-describedby="sablonField"
        >
          <option value="0">Pilih Sablon</option>
          <option value="polos">Polos</option>
          <option value="sablon">Sablon</option>
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
        {fields.order_detail_sablon && !validFields.order_detail_sablon && (
          <ErrorMessage
            referenceId="sablonField"
            message="Pilih jenis sablon."
            isPasswordField={false}
          />
        )}
      </div>
      {/* order design */}
      <div className="mt-4 relative">
        <label
          htmlFor="desain"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Desain<span className="text-primary-900 font-semibold">*</span>
        </label>
        <select
          id="desain"
          name="order_design"
          onChange={(e) => {
            handleChange(e);
            handleDesign(e);
            setValidFields({
              ...validFields,
              order_design: e.target.value !== '0' && e.target.value !== '',
            });
          }}
          className={`input-field-select-xs ${
            fields.order_design && !validFields.order_design && 'field-error'
          }`}
          aria-invalid={validFields.order_design ? 'false' : 'true'}
          aria-describedby="orderDesignField"
        >
          <option value="0">Pilih Desain</option>
          {dummyData.dummyDesign.map((item, index) => (
            <option
              value={item.value}
              key={index}
            >
              {item.desc}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
        {fields.order_design && !validFields.order_design && (
          <ErrorMessage
            referenceId="orderDesignField"
            message="Pilih desain yang diinginkan."
            isPasswordField={false}
          />
        )}
      </div>
      {isUploadDesign && (
        <div className="mt-4">
          <label
            htmlFor="uploadDesign"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Unggah Desain
            <span className="text-primary-900 font-semibold">*</span>
          </label>
          <div className="w-full p-12 border-2 border-gray-500 border-dashed rounded-lg flex items-center justify-center bg-gray-100">
            <div>
              <div className="relative mb-5">
                <input
                  type="file"
                  id="uploadDesign"
                  name="order_design_image"
                  className="absolute appearance-none w-full h-full opacity-0 cursor-pointer"
                  required
                  onChange={(e) => {
                    setValidFields({
                      ...validFields,
                      order_design_image:
                        e.target.value !== '' &&
                        e.target.files[0].size < 3000000,
                    });
                    handleFile(e);
                  }}
                  aria-invalid={
                    validFields.order_design_image ? 'false' : 'true'
                  }
                  aria-describedby="orderDesignImgField"
                />
                <div className="button-fill cursor-pointer">
                  <BsFillCloudPlusFill className="inline-block text-xl fill-white mr-2" />
                  Upload
                </div>
              </div>
              <p className="text-center font-semibold">Support files</p>
              <p className="text-center text-sm">PDF, JPG, PNG</p>
            </div>
          </div>
          {!validFields.order_design_image && (
            <ErrorMessage
              referenceId="orderDesignImgField"
              message="File harus kurang dari 3MB"
              isPasswordField={false}
            />
          )}
          {fields.order_design_image && validFields.order_design_image && (
            <div className="flex items-center justify-between rounded-lg bg-orange-600 px-5 py-4 mt-4">
              <p className="truncate">
                <MdPermMedia className="text-2xl fill-dark mr-3 inline-block" />
                {fields.order_design_image.name}
              </p>

              <button
                onClick={removeFile}
                type="button"
              >
                <MdDelete className="text-2xl fill-red-600 ml-4" />
              </button>
            </div>
          )}
        </div>
      )}
      {/* order quantity */}
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
            placeholder="Masukkan Jumlah Pesanan"
            required
            onChange={(e) => {
              handleChange(e);
              validateFieldsHandler(e);
            }}
            className={`input-field-xs !pr-12 ${
              fields.order_quantity &&
              !validFields.order_quantity &&
              'field-error'
            }`}
            aria-invalid={validFields.order_quantity ? 'false' : 'true'}
            aria-describedby="orderQuantityField"
          />
          <span className="text-gray-400 absolute right-3 top-[11px]">pcs</span>
          {fields.order_quantity && !validFields.order_quantity && (
            <ErrorMessage
              referenceId="orderQuantityField"
              message="Masukkan jumlah pesanan dengan benar dan sesuai."
              isPasswordField={false}
            />
          )}
        </div>
      </div>
      {/* button */}
      <div className="buttons flex justify-end mt-8 gap-5">
        <button
          onClick={(e) => handleGetNow(e)}
          className={`button-fill !py-4 flex items-center justify-center ${
            isLoading ? '!bg-primary-600' : ''
          }`}
          disabled={isLoading}
        >
          Pesan Sekarang
        </button>
        <button
          className={`button-white !p-4 ${isLoading ? '!bg-gray-100' : ''}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgSpinner className="animate-spin text-xl" />
          ) : (
            <BsCartPlus
              size={20}
              className="mx-auto"
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default FormKarton;
