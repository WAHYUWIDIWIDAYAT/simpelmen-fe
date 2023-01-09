import React from "react";
import svg from "../../../assets/svg";
import AuthLayout from "./components/AuthLayout";

const ActivateAccountAdmin = () => {
  return (
    <AuthLayout images={svg.adminActivate} altImages="woman-and-laptop">
      <div className="activate-account">
        <h3>Aktivasi AKun</h3>
        <p className="mb-5 mt-1">Silahkan aktivasi email Anda</p>
        <button className="button-fill !w-full">Aktivasi</button>
      </div>
    </AuthLayout>
  );
};

export default ActivateAccountAdmin;
