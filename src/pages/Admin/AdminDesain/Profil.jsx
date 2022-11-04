import React, { useEffect, useState } from "react";
import Alerts from "../../../components/Alerts";
import { adminDesain } from "../../../services/api";

const Profil = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [toggleDisabledProfile, setToggleDisabledProfile] = useState(true);
  const [toggleDisabledPwd, setToggleDisabledPwd] = useState(true);
  const [fieldsProfile, setFieldsProfile] = useState({});
  const [fieldsPwd, setFieldsPwd] = useState({});
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const handleChangeProfile = (e) => {
    e.preventDefault();
    setFieldsProfile({
      ...fieldsProfile,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleChangePwd = (e) => {
    e.preventDefault();
    setFieldsPwd({
      ...fieldsPwd,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    // console.log(fieldsProfile);
    await adminDesain
      .put(`/profile/${fieldsProfile?.user_id}`, {
        headers: {
          "x-access-token": `${parseUser.data.token}`,
        },
      })
      .then((response) => setAlerts(true))
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  const handleSubmitPwd = async (e) => {
    e.preventDefault();
    await adminDesain
      .put(
        `/changepassword/${fieldsProfile?.user_id}`,
        {
          user_password_old: fieldsPwd.password,
          user_password_new: fieldsPwd.new_password,
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => setAlerts(true))
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  useEffect(() => {
    const getAdmin = async () => {
      await adminDesain
        .get("/profile", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) =>
          setFieldsProfile({
            user_id: response.data.data.user_id,
            user_name: response.data.data.user_name,
            user_email: response.data.data.user_email,
            user_role: response.data.data.roles.role_name,
          })
        );
    };
    getAdmin();
  }, [parseUser.data.token]);

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      <section>
        {alerts && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent="Status pesanan telah diubah!"
          />
        )}
        {alertFail && (
          <Alerts
            state="true"
            background="bg-red-100"
            textColor="text-red-600"
            textContent={`Ups, sepertinya ada yang salah: ${failMessage}`}
            closeButton="true"
          />
        )}
        <div className="flex justify-center items-center w-full mb-12">
          <div className="bg-white rounded-2xl shadow-gray px-8 xs:px-10 pb-8 xs:pb-10 pt-9 xs:pt-12 w-full">
            <div className="border-b border-orange-900 mb-8">
              <h3 className="pb-4">Update Profile Admin Desain</h3>
            </div>
            <form className="" onSubmit={(e) => handleSubmitProfile(e)}>
              <div className="relative w-full flex flex-col mb-4">
                <label
                  htmlFor="user_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="input-field-xs"
                  placeholder="Masukkan Nama Lengkap"
                  name="user_name"
                  id="user_name"
                  required
                  autoComplete="on"
                  disabled={toggleDisabledProfile}
                  onChange={handleChangeProfile}
                  value={fieldsProfile.user_name}
                  defaultVAlue={fieldsProfile.user_name}
                />
              </div>
              <div className="relative w-full flex flex-col mb-4">
                <label
                  htmlFor="posisi"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Posisi Admin
                </label>
                <input
                  type="text"
                  className="input-field-xs"
                  placeholder="Masukkan Posisi Admin"
                  name="posisi"
                  id="posisi"
                  required
                  disabled={toggleDisabledProfile}
                  onChange={handleChangeProfile}
                  autoComplete="on"
                  defaultVAlue={fieldsProfile.user_role}
                />
              </div>
              <div className="relative w-full flex flex-col mb-4">
                <label
                  htmlFor="user_email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="input-field-xs"
                  placeholder="Masukkan Email"
                  name="user_email"
                  id="user_email"
                  required
                  disabled={toggleDisabledProfile}
                  onChange={handleChangeProfile}
                  autoComplete="on"
                  value={fieldsProfile.user_email}
                  defaultValue={fieldsProfile.user_email}
                />
              </div>
              <div className="relative w-full flex flex-col mb-8">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi
                </label>
                <input
                  type="password"
                  className="input-field-xs"
                  placeholder="Masukkan Kata Sandi"
                  name="password"
                  id="password"
                  required
                  disabled={toggleDisabledProfile}
                  onChange={handleChangeProfile}
                  autoComplete="on"
                />
              </div>
              <div className="flex justify-end">
                {toggleDisabledProfile ? (
                  <button
                    className="button-fill"
                    onClick={() => setToggleDisabledProfile(false)}
                    type="button"
                  >
                    Edit Profil
                  </button>
                ) : (
                  <button className="button-fill" type="submit">
                    Simpan Perubahan
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="bg-white rounded-2xl shadow-gray px-8 xs:px-10 pb-8 xs:pb-10 pt-9 xs:pt-12 w-full">
            <div className="border-b border-orange-900 mb-8">
              <h3 className="pb-4">Ubah Kata Sandi</h3>
            </div>
            <form className="" onSubmit={(e) => handleSubmitPwd(e)}>
              <div className="relative w-full flex flex-col mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  className="input-field-xs"
                  placeholder="Masukkan Kata Sandi Baru"
                  name="password"
                  id="password"
                  required
                  disabled={toggleDisabledPwd}
                  onChange={handleChangePwd}
                  autoComplete="on"
                />
              </div>
              <div className="relative w-full flex flex-col mb-8">
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  className="input-field-xs"
                  placeholder="Masukkan Konfirmasi Kata Sandi Baru"
                  name="new_password"
                  id="new_password"
                  required
                  disabled={toggleDisabledPwd}
                  onChange={handleChangePwd}
                  autoComplete="on"
                />
              </div>
              <div className="flex justify-end">
                {toggleDisabledPwd ? (
                  <button
                    className="button-fill"
                    onClick={() => setToggleDisabledPwd(false)}
                    type="button"
                  >
                    Edit Password
                  </button>
                ) : (
                  <button className="button-fill" type="submit">
                    Perbarui Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profil;
