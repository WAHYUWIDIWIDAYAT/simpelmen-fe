import React, { useState } from 'react';
import { useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import FormDus from './FormDus';
import FormStandingPouch from './FormStandingPouch';
import FormSticker from './FormSticker';

const formOptions = ['Dus Offset', 'Standing Pouch', 'Stiker'];

const FormSpecial = ({ data, productId, setAlertSuccess, setAlertFail }) => {
  const [formChoice, setFormChoice] = useState();
  function handleChoice(e) {
    e.preventDefault();
    setFormChoice(e.target.value);
  }
  const [form, setForm] = useState();
  useEffect(() => {
    switch (formChoice) {
      case 'Dus Offset':
        return setForm(
          <FormDus
            formType={formChoice}
            data={data}
            productId={productId}
            setAlertSuccess={setAlertSuccess}
            setAlertFail={setAlertFail}
          />
        );
      case 'Standing Pouch':
        return setForm(
          <FormStandingPouch
            formType={formChoice}
            data={data}
            productId={productId}
            setAlertSuccess={setAlertSuccess}
            setAlertFail={setAlertFail}
          />
        );
      case 'Stiker':
        return setForm(
          <FormSticker
            formType={formChoice}
            data={data}
            productId={productId}
            setAlertSuccess={setAlertSuccess}
            setAlertFail={setAlertFail}
          />
        );

      default:
        return setForm();
    }
  }, [data, formChoice, productId, setAlertFail, setAlertSuccess]);

  return (
    <>
      <div className="relative mb-2">
        <label
          htmlFor="form_category"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Pilih kategori kemasan
          <span className="text-primary-900 font-semibold">*</span>
        </label>
        <select
          id="form_category"
          name="form_category"
          required
          onChange={(e) => handleChoice(e)}
          className="input-field-select-xs"
        >
          <option value="0">Pilih form sesuai produk keinginan anda</option>
          {formOptions
            .filter((item) => item === data.jenis_products.jenis_product_name)
            .map((item, index) => (
              <option
                key={index}
                value={item}
              >
                {item}
              </option>
            ))}
        </select>
        <IoIosArrowDown className="absolute right-4 top-[43px] text-lg fill-gray-400" />
      </div>
      {form}
    </>
  );
};

export default FormSpecial;
