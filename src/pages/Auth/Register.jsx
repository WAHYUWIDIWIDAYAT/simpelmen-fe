import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerts from '../../components/Alerts';
import AuthLayout from './components/AuthLayout';

import svg from '../../assets/svg';
import regex from '../../services/regex';
import { MdEmail, MdLock } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { CgSpinner } from 'react-icons/cg';
import { userAuth } from '../../services/api';
import ErrorMessage from '../../components/Alerts/ErrorMessage';

const {
  name: NAME_REGEX,
  email: EMAIL_REGEX,
  password: PASSWORD_REGEX,
  phoneNumber: PHONE_REGEX,
} = regex;

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const validateFieldsHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setValidFields({
          ...validFields,
          name: NAME_REGEX.test(value),
        });
        break;
      case 'email':
        setValidFields({
          ...validFields,
          email: EMAIL_REGEX.test(value),
        });
        break;
      case 'phone':
        setValidFields({
          ...validFields,
          phone: PHONE_REGEX.test(value),
        });
        break;
      case 'password':
        setValidFields({
          ...validFields,
          password: PASSWORD_REGEX.test(value),
        });
        break;
      case 'confirmPassword':
        setValidFields({
          ...validFields,
          confirmPassword: value !== '' && value === fields.password,
        });
        break;
      default:
        break;
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }
  const valids =
    validFields.name &&
    validFields.email &&
    validFields.phone &&
    validFields.password &&
    validFields.confirmPassword;
  /*
    axios
    1. https
    2. request body
    3. headers
    4. promise chain
  */
  async function handleSubmit(e) {
    e.preventDefault();
    if (valids) {
      setIsLoading(true);
      await userAuth
        .post('/signup', fields, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setAlerts(true);
          setIsLoading(false);
        })
        .catch((e) => {
          setAlertFail(true);
          setFailMessage(e.response.data.message);
          setIsLoading(false);
        });
    } else {
      setFailMessage('Mohon isi semua fields dengan benar!');
      setAlertFail(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      <AuthLayout
        images={svg.registerPage}
        altImages="woman-and-handphone"
      >
        {alerts && (
          <Alerts
            status="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Email telah dikirim! Silahkan Aktivasi Akun Anda "
          />
        )}
        {alertFail && (
          <Alerts
            status="true"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`${failMessage}`}
            closeButton="true"
          />
        )}
        <div className="form-content w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-1">Daftar Akun</h3>
          <p className="mb-7">Silahkan daftar akun agar dapat masuk</p>
          <form
            className="flex flex-col gap-4 mb-8"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  handleChange(e);
                  validateFieldsHandler(e);
                }}
                required
                autoComplete="off"
                placeholder="Nama Lengkap"
                className={`input-field ${
                  fields.name && !validFields.name && 'field-error'
                }`}
                aria-invalid={validFields.name ? 'false' : 'true'}
                aria-describedby="nameField"
              />
              <BsFillPersonFill className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {fields.name && !validFields.name && (
                <ErrorMessage
                  referenceId="nameField"
                  message="Mohon masukkan nama dengan benar."
                  isPasswordField={false}
                />
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  validateFieldsHandler(e);
                }}
                placeholder="Email"
                className={`input-field ${
                  fields.email && !validFields.email && 'field-error'
                }`}
                aria-invalid={validFields.email ? 'false' : 'true'}
                aria-describedby="emailField"
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {fields.email && !validFields.email && (
                <ErrorMessage
                  referenceId="emailField"
                  message="Mohon masukkan email sesuai format."
                  isPasswordField={false}
                />
              )}
            </div>
            <div className="relative">
              <input
                type="telp"
                name="phone"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  validateFieldsHandler(e);
                }}
                placeholder="No. Handphone"
                className={`input-field ${
                  fields.phone && !validFields.phone && 'field-error'
                }`}
                aria-invalid={validFields.phone ? 'false' : 'true'}
                aria-describedby="phoneField"
              />
              <AiFillPhone className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {fields.phone && !validFields.phone && (
                <ErrorMessage
                  referenceId="phoneField"
                  message="Masukkan telepon harus berupa angka."
                  isPasswordField={false}
                />
              )}
            </div>
            <div className="relative">
              <input
                type={!togglePassword ? 'password' : 'text'}
                name="password"
                onChange={(e) => {
                  handleChange(e);
                  validateFieldsHandler(e);
                }}
                required
                autoComplete="off"
                placeholder="Kata Sandi"
                className={`input-password-field ${
                  fields.password && !validFields.password && 'field-error'
                }`}
                aria-invalid={validFields.password ? 'false' : 'true'}
                aria-describedby="passwordField"
              />
              <MdLock className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {!togglePassword ? (
                <VscEye
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                />
              ) : (
                <VscEyeClosed
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                />
              )}
              {fields.password && !validFields.password && (
                <ErrorMessage
                  referenceId="passwordField"
                  isPasswordField={true}
                />
              )}
            </div>
            <div className="relative">
              <input
                type={!toggleConfirmPassword ? 'password' : 'text'}
                name="confirmPassword"
                onChange={(e) => {
                  handleChange(e);
                  validateFieldsHandler(e);
                }}
                required
                autoComplete="off"
                placeholder="Konfirmasi Kata Sandi"
                className={`input-password-field ${
                  fields.confirmPassword &&
                  !validFields.confirmPassword &&
                  'field-error'
                }`}
                aria-invalid={validFields.confirmPassword ? 'false' : 'true'}
                aria-describedby="confirmPasswordField"
              />
              <MdLock className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {!toggleConfirmPassword ? (
                <VscEye
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                />
              ) : (
                <VscEyeClosed
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                />
              )}
              {fields.confirmPassword && !validFields.confirmPassword && (
                <ErrorMessage
                  referenceId="confirmPasswordField"
                  message="Konfirmasi kata sandi harus sama dengan kata sandi."
                  isPasswordField={false}
                />
              )}
            </div>
            <button
              className={`button-fill transition-200 mt-4 flex items-center justify-center ${
                isLoading ? '!bg-primary-600' : ''
              }`}
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                  Daftar
                </>
              ) : (
                <>Daftar</>
              )}
            </button>
          </form>
          <p className="text-center">
            Sudah mempunyai akun?{' '}
            <Link to="/login">
              <strong className="hover:text-orange-900 transition-200">
                Masuk
              </strong>
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Register;
