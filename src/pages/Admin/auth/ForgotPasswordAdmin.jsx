import React from 'react';
import { MdEmail } from 'react-icons/md';
import svg from '../../../assets/svg';
import AuthLayout from './components/AuthLayout';

const ForgotPasswordAdmin = () => {
  return (
    <>
      <AuthLayout
        images={svg.adminForgotPassword}
        altImages="woman-and-laptop"
      >
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-2">Lupa Kata Sandi</h3>
          <p className="mb-7">
            Kami akan mengirim link ke email Anda untuk mengubah kata sandi
          </p>
          <form className="flex flex-col">
            <div className="relative w-full flex flex-col mb-8">
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                name="email"
                required
                autoComplete="on"
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
            </div>
            <button className="button-fill transition-200">Kirim Email</button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPasswordAdmin;
