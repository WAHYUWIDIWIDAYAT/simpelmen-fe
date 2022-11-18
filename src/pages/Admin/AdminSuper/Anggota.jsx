import React, { useEffect, useState } from "react";
import { BsSearch, BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Alerts from "../../../components/Alerts";
import { adminSuper } from "../../../services/api";
import ModalsAddAdmin from "./components/ModalsAddAdmin";
import ModalsEditAdmin from "./components/ModalsEditAdmin";

const Anggota = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [alertAdd, setAlertAdd] = useState(false);
  // const [alertEdit, setAlertEdit] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertAddMessage, setAlertAddMessage] = useState("");
  // const [alertEditMessage, setAlertEditMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [detailAdmin, setDetailAdmin] = useState();
  const [dataAdmin, setDataAdmin] = useState();
  const [addAdmin, setAddAdmin] = useState();
  const [editAdmin, setEditAdmin] = useState();
  const [adminRole, setAdminRole] = useState();
  const [updateId, setUpdateId] = useState();

  const getDataAdmin = async (token) => {
    await adminSuper
      .get(`/data/admin`, {
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then((response) => setDataAdmin(response.data.data));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeModalEdit = () => {
    setIsOpenModalEdit(false);
  };

  const detailModalHandling = () => {
    setIsOpenModal(true);
  };

  // get detail admin
  const detailModalHandlingEdit = async (id) => {
    setIsOpenModalEdit(true);
    setUpdateId(id);
    await adminSuper
      .get(`/data/admin/${id}?id=${id}`, {
        headers: {
          "x-access-token": `${parseUser.data.token}`,
        },
      })
      .then((response) => setDetailAdmin(response.data.data));
  };

  // get role admin
  useEffect(() => {
    const getRole = async () => {
      await adminSuper
        .get("/role", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setAdminRole(response.data.data));
    };
    getRole();
  }, [parseUser.data.token]);

  // handle change form add admin
  const handleChangeAddAdmin = (e) => {
    e.preventDefault();
    setAddAdmin({
      ...addAdmin,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleChangeEditAdmin = (e) => {
    e.preventDefault();
    setEditAdmin({
      ...editAdmin,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  // post new admin
  const submitAdminHandler = async (e) => {
    e.preventDefault();
    console.log(addAdmin);
    await adminSuper
      .post(
        "/create/admin",
        {
          user_name: addAdmin.user_name,
          user_email: addAdmin.user_email,
          user_password: addAdmin.user_password,
          user_role_id: parseInt(addAdmin.user_role_id),
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          setAlertAdd(true);
          setAlertAddMessage("Admin Berhasil Ditambahkan!");
          getDataAdmin(parseUser.data.token);
        }, 2000);
        setIsOpenModal(false);
      })
      .catch((e) => {
        setTimeout(() => {
          setAlertFail(true);
          setFailMessage(e.message);
        }, 2000);
        setIsOpenModal(false);
      });
  };

  const submitEditAdminHandler = async (e) => {
    e.preventDefault();
    console.log(detailAdmin);
    await adminSuper
      .put(
        `/update/admin/${updateId}`,
        {
          user_name: detailAdmin.user_name,
          user_email: detailAdmin.user_email,
          user_password: editAdmin.user_password,
          user_role_id: parseInt(detailAdmin.user_role_id),
        },
        {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          setAlertAdd(true);
          setAlertAddMessage("Admin Berhasil Diupdate!");
          getDataAdmin(parseUser.data.token);
        }, 2000);
        setIsOpenModalEdit(false);
      })
      .catch((e) => {
        setTimeout(() => {
          setAlertFail(true);
          setFailMessage(e.message);
        }, 2000);
        setIsOpenModalEdit(false);
      });
  };

  // get data admin
  useEffect(() => {
    getDataAdmin(parseUser.data.token);
  }, [parseUser.data.token]);

  // alert state
  useEffect(() => {
    setTimeout(() => {
      if (alertAdd || alertFail === true)
        setAlertFail(false) || setAlertAdd(false);
    }, 2000);
  }, [alertFail, alertAdd]);

  return (
    <>
      <section>
        {alertAdd && (
          <Alerts
            state="true"
            background="bg-green-100"
            textColor="text-green-600"
            textContent={alertAddMessage}
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
        <div className="border-b border-orange-900 mb-6">
          <h3 className="font-semibold pb-3">Admin</h3>
        </div>
        <div className="flex flex-col gap-y-4 xs:gap-y-0 xs:flex-row xs:items-center justify-between mb-4">
          <h6 className="">
            Tabel Admin{" "}
            <span className="text-primary-900 font-semibold">
              NO ENDPOINT DELETE + ERROR 500
            </span>
          </h6>
          <div>
            <button
              onClick={detailModalHandling}
              className="button-fill !pl-4 flex items-center"
            >
              <BsPlus className="text-2xl mr-2 fill-white" />
              Tambah Admin
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center mr-4">
            <label htmlFor="sorting">Menampilkan</label>
            <select
              name="sorting"
              id="sorting"
              className="w-[50px] rounded h-10 p-2 bg-white border border-primary-900"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="flex relative top-2 flex-col mb-4">
            <input
              type="search"
              className="input-field !rounded-full !py-2 !pl-14"
              placeholder="Cari"
              name="search"
              required
              autoComplete="on"
              // onChange={handleChange}
            />
            <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
          </div>
        </div>

        <article id="tableAdmin">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-white text-center p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-white text-center p-3 min-w-[180px]">
                    Nama
                  </th>
                  <th className="text-white text-center p-3 min-w-[200px]">
                    Email
                  </th>
                  <th className="text-white text-center p-3 min-w-[90px]">
                    Posisi
                  </th>
                  <th className="text-white text-center p-3 min-w-[180px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAdmin?.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="text-center p-3">{index + 1}</td>
                    <td className="text-center p-3">{item.user_name}</td>
                    <td className="text-center p-3">{item.user_email}</td>
                    <td className="text-center p-3">{item.roles?.role_name}</td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                          onClick={() => detailModalHandlingEdit(item.user_id)}
                        >
                          Edit
                        </button>
                        <div className="button-fill !p-[15px]">
                          <FaTrash className="fill-white text-base" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex justify-end items-center gap-x-[.375rem] py-2 mt-2"
            aria-label="pagination"
          >
            <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
              <HiChevronLeft className="!text-base xs:!text-xl" />
            </button>
            <button className="button-gradient-sm !text-xs xs:!text-base">
              1
            </button>
            <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
              2
            </button>
            <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base">
              3
            </button>
            <button className="button-white-sm !shadow-none hover:!shadow-red !text-xs xs:!text-base !px-3">
              <HiChevronRight className="!text-base xs:!text-xl" />
            </button>
          </nav>
        </article>
      </section>

      {/* Modal Add Admin */}
      <ModalsAddAdmin
        isOpen={isOpenModal}
        closeModal={closeModal}
        submitHandler={submitAdminHandler}
        handleChangeAddAdmin={handleChangeAddAdmin}
        adminRole={adminRole}
      />

      {/* Modal Edit Admin */}
      <ModalsEditAdmin
        isOpen={isOpenModalEdit}
        closeModal={closeModalEdit}
        submitHandler={submitEditAdminHandler}
        data={detailAdmin}
        handleChangeEditAdmin={handleChangeEditAdmin}
        // idAdmin={idAdmin}
      />
    </>
  );
};

export default Anggota;
