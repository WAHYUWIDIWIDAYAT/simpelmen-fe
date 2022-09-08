import React from "react";
import AuthLayout from "./components/AuthLayout";

import svg from "../../assets/svg";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  return (
    <>
      <AuthLayout images={svg.loginPage} altImages='woman-and-password-laptop'>
        <div className='w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none'>
          <h3 className='mb-2'>Lupa Kata Sandi</h3>
          <p className='mb-7'>
            Kami akan mengirim link ke email Anda untuk mengubah kata sandi
          </p>
          <form className='flex flex-col'>
            <div className='relative w-full flex flex-col mb-8'>
              <input
                type='email'
                className='input-field'
                placeholder='Email'
                name='email'
                required
                autoComplete='on'
              />
              <MdEmail className='absolute text-2xl top-17/sp left-5 fill-secondary-800' />
            </div>
            <button className='button-fill transition-200'>Kirim Email</button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
