import React, { useState } from 'react';
import AuthLayout from './components/AuthLayout';

import svg from '../../assets/svg';
import { MdLock } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../../services/api';
import Alerts from '../../components/Alerts';
import regex from '../../services/regex';
import ErrorMessage from '../../components/Alerts/ErrorMessage';
import { CgSpinner } from 'react-icons/cg';

const { password: REGEX_PWD } = regex;

const NewPassword = () => {
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({});
  const [validFields, setValidFields] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  const validatePasword = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setValidFields({
          ...validFields,
          password: REGEX_PWD.test(value),
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

  const valids = validFields.password && validFields.confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();
    if (valids) {
      setIsLoading(true);
      await userAuth
        .post(`/reset-password/${resetToken}`, fields, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setTimeout(() => {
            navigate('/login');
          }, 5000);
          setAlerts(true);
          setIsLoading(false);
        })
        .catch((e) => {
          setAlertFail(true);
          setFailMessage(e.response.data.message);
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <AuthLayout
        images={svg.loginPage}
        altImages="woman-and-password-laptop"
      >
        {alerts && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Password telah diganti! Silahkan login"
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
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-2">Buat Kata Sandi Baru</h3>
          <p className="mb-7">Silahkan buat kata sandi baru Anda</p>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full flex flex-col mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kata Sandi Baru"
                name="password"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  validatePasword(e);
                }}
                className={`input-password-field ${
                  fields.password && !validFields.password && 'field-error'
                }`}
                aria-invalid={validFields.password ? 'false' : 'true'}
                aria-describedby="passwordField"
              />
              <MdLock className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {showPassword ? (
                <VscEyeClosed
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              {fields.password && !validFields.password && (
                <ErrorMessage
                  referenceId="passwordField"
                  isPasswordField={true}
                />
              )}
            </div>
            <div className="relative w-full flex flex-col mb-8">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Konfirmasi Kata Sandi Baru"
                name="confirmPassword"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleChange(e);
                  validatePasword(e);
                }}
                className={`input-password-field ${
                  fields.confirmPassword &&
                  !validFields.confirmPassword &&
                  'field-error'
                }`}
                aria-invalid={validFields.confirmPassword ? 'false' : 'true'}
                aria-describedby="confirmPasswordField"
              />
              <MdLock className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {showConfirmPassword ? (
                <VscEyeClosed
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              className={`button-fill transition-200 flex items-center justify-center ${
                isLoading ? '!bg-primary-600' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                  Ubah Kata Sandi
                </>
              ) : (
                <>Ubah Kata Sandi</>
              )}
            </button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default NewPassword;
