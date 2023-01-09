import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Alerts from '../../../components/Alerts';
import svg from '../../../assets/svg';
import regex from '../../../services/regex';
import { MdEmail, MdLock } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { CgSpinner } from 'react-icons/cg';
import { adminAuth } from '../../../services/api';
import ErrorMessage from '../../../components/Alerts/ErrorMessage';

const { email: EMAIL_REGEX } = regex;

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(fields.email));
  }, [fields.email]);

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    await adminAuth
      .post('/login', fields)
      .then((response) => {
        localStorage.setItem('admin', JSON.stringify(response.data));
        setTimeout(() => {
          if (localStorage.getItem('admin')) navigate('/admin');
        }, 1000);
        setAlerts(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setMessage(e.response.data.message);
        setAlertFail(true);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      <AuthLayout
        images={svg.adminLogin}
        altImages="woman-and-laptop"
      >
        {alerts && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Login Berhasil"
          />
        )}
        {alertFail && (
          <Alerts
            state="true"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`${message}`}
            closeButton="true"
          />
        )}
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-1">Selamat Datang Kembali!</h3>
          <p className="mb-7">Silahkan masuk untuk mengakses akun Anda</p>
          <form
            className="flex flex-col mb-8"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full flex flex-col mb-4">
              <input
                type="email"
                className={`input-field ${
                  fields.email && !validEmail && 'field-error'
                }`}
                placeholder="Email"
                name="email"
                required
                autoComplete="on"
                onChange={handleChange}
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby="emailField"
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {fields.email && !validEmail && (
                <ErrorMessage
                  referenceId="emailField"
                  message="Mohon masukkan email dengan benar."
                  isPasswordField={false}
                />
              )}
            </div>
            <div className="relative w-full flex flex-col mb-5">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-password-field"
                placeholder="Password"
                name="password"
                required
                autoComplete="on"
                onChange={handleChange}
              />
              <MdLock className="absolute text-xl top-4 left-4 fill-secondary-800" />
              {showPassword ? (
                <VscEyeClosed
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-xl top-4 right-5 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <p className="mb-6">
              <Link
                to="/admin/forgot-password"
                className="font-bold text-primary-900 hover:text-orange-900 transition-200"
              >
                Lupa kata sandi?
              </Link>
            </p>
            <button
              className={`button-fill transition-200 flex items-center justify-center ${
                isLoading ? '!bg-primary-600' : ''
              }`}
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin text-xl mr-2 icon-white" />
                  Masuk
                </>
              ) : (
                <>Masuk</>
              )}
            </button>
          </form>
          <p className="text-center">
            Belum punya akun?{' '}
            <Link
              to="/admin/register"
              className="font-bold text-primary-900 hover:text-orange-900 transition-200"
            >
              Daftar
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default LoginAdmin;
