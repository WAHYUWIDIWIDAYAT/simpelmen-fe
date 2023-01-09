import React from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/svg";
import AuthLayout from "./components/AuthLayout";

const ActivateAccount = () => {
  return (
    <>
      <AuthLayout images={svg.loginPage} altImages="woman-and-password-laptop">
        <div className="w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-1">Aktivasi Akun Berhasil!</h3>
          <p className="mb-7">Silahkan masuk untuk mengakses akun Anda</p>
          <Link to="/login" className="text-blue-600 underline">
            Kembali ke halaman login
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default ActivateAccount;
