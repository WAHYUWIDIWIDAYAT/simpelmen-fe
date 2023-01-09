import React, { useState } from "react";
import svg from "../../../assets/svg";
import AuthLayout from "./components/AuthLayout";
import { MdLock } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const NewPasswordAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <AuthLayout images={svg.adminForgotPassword} altImages="woman-and-laptop">
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-2">Buat Kata Sandi Baru</h3>
          <p className="mb-7">Silahkan buat kata sandi baru Anda</p>
          <form className="flex flex-col">
            <div className="relative w-full flex flex-col mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="input-password-field"
                placeholder="Kata Sandi Baru"
                name="password"
                required
                autoComplete="off"
              />
              <MdLock className="absolute text-2xl top-17/sp left-5 fill-secondary-800" />
              {showPassword ? (
                <VscEyeClosed
                  className="absolute text-2xl top-17/sp right-5 fill-secondary-800"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-2xl top-17/sp right-5 fill-secondary-800"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="relative w-full flex flex-col mb-8">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-password-field"
                placeholder="Konfirmasi Kata Sandi Baru"
                name="confirmPassword"
                required
                autoComplete="off"
              />
              <MdLock className="absolute text-2xl top-17/sp left-5 fill-secondary-800" />
              {showConfirmPassword ? (
                <VscEyeClosed
                  className="absolute text-2xl top-17/sp right-5 fill-secondary-800"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <VscEye
                  className="absolute text-2xl top-17/sp right-5 fill-secondary-800"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
            <button className="button-fill transition-200">
              Ubah Kata Sandi
            </button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default NewPasswordAdmin;
