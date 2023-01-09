import React from "react";
import svg from "../../../assets/svg";
import AuthLayout from "./components/AuthLayout";

const ActivateAccountSuccessAdmin = () => {
  return (
    <AuthLayout images={svg.adminActivate} altImages="woman-and-laptop">
      <div className="activate-account-success">
        <h3>Aktivasi AKun</h3>
        <p className="mb-5 mt-1">Akun berhasil diaktivasi</p>
      </div>
    </AuthLayout>
  );
};

export default ActivateAccountSuccessAdmin;
