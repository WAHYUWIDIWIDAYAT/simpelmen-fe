import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Alerts from '../../components/Alerts';

import svg from '../../assets/svg';
import { MdEmail, MdLock } from 'react-icons/md';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { userAuth } from '../../services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute('name')]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await userAuth
      .post('/signin', fields, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setTimeout(() => {
          if (localStorage.getItem('user')) navigate('/dashboard');
          // window.location.replace("https://www.google.com");
        }, 1000);
        setAlerts(true);
      })
      .catch((e) => setAlertFail(true));
  }

  return (
    <>
      <AuthLayout
        images={svg.loginPage}
        altImages="woman-and-password-laptop"
      >
        {alerts && (
          <Alerts
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Login Berhasil"
          />
        )}
        {alertFail && (
          <Alerts
            background="bg-red-100"
            textColor="text-red-600"
            textContent="Ups, sepertinya ada yang salah"
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
                className="input-field"
                placeholder="Email"
                name="email"
                required
                autoComplete="on"
                onChange={handleChange}
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
            </div>
            <div className="relative w-full flex flex-col mb-4">
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
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-xl top-4 right-4 fill-secondary-800 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <p className="mb-6">
              Lupa kata sandi?{' '}
              <Link
                to="/forgot-password"
                className="font-bold hover:text-orange-900 transition-200"
              >
                Klik disini
              </Link>
            </p>
            <button className="button-fill transition-200">Masuk</button>
          </form>
          <p className="text-center">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-bold hover:text-orange-900 transition-200"
            >
              Daftar
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
