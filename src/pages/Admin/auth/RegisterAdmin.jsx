import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerts from "../../../components/Alerts";
import AuthLayout from "./components/AuthLayout";

import svg from "../../../assets/svg";
import { MdEmail, MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { adminAuth } from "../../../services/api";

const RegisterAdmin = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    username: "",
    email: "",
    telp: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.getAttribute("name")]: e.target.value,
    });
  }
  /*
    axios
    1. https
    2. request body
    3. headers
    4. promise chain
  */
  async function handleSubmit(e) {
    e.preventDefault();
    await adminAuth
      .post("/LgdNVnKpZxF1lrp1aK9e", fields)
      .then((response) => {
        setAlerts(true);
        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);
      })
      .catch((e) => {
        setAlertFail(true);
        setFailMessage(e.message);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      <AuthLayout images={svg.adminLogin} altImages="woman-and-laptop">
        {alerts && (
          <Alerts
            state="true"
            // path="/login"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Silahkan Aktivasi Akun Anda"
            closeButton="true"
          />
        )}
        {alertFail && (
          <Alerts
            state="true"
            // path="/login"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`Ups, sepertinya ada yang salah: ${failMessage}`}
            closeButton="true"
          />
        )}
        <div className="form-content w-full p-6 xs:p-12 2md:p-0 rounded-2xl shadow-[0_4px_20px_0_#00000029] 2md:shadow-none">
          <h3 className="mb-1">Daftar Akun</h3>
          <p className="mb-7">Silahkan daftar akun agar dapat masuk</p>
          <form className="flex flex-col gap-4 mb-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder="Nama Lengkap"
                className="input-field"
              />
              <BsFillPersonFill className="absolute text-xl top-4 left-4 fill-secondary-800" />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
              />
              <MdEmail className="absolute text-xl top-4 left-4 fill-secondary-800" />
            </div>
            <div className="relative">
              <input
                type="telp"
                name="telp"
                required
                autoComplete="off"
                onChange={handleChange}
                placeholder="No. Handphone"
                className="input-field"
              />
              <AiFillPhone className="absolute text-xl top-4 left-4 fill-secondary-800" />
            </div>
            <div className="relative">
              <input
                type={!togglePassword ? "password" : "text"}
                name="password"
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder="Kata Sandi"
                className="input-password-field"
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
            </div>
            <div className="relative">
              <input
                type={!toggleConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder="Konfirmasi Kata Sandi"
                className="input-password-field"
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
            </div>
            <button className="button-fill transition-200 mt-4">Daftar</button>
          </form>
          <p className="text-center">
            Sudah mempunyai akun?{" "}
            <Link to="/admin/login">
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

export default RegisterAdmin;
