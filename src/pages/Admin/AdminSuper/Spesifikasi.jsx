import React, { useEffect, useState } from "react";
import { BsSearch, BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Alerts from "../../../components/Alerts";
import { commonAPI } from "../../../services/api";
import ModalsEditSpesifikasi from "./components/ModalsEditSpesifikasi";
import ModalsSpesifikasi from "./components/ModalsSpesifikasi";

const Spesifikasi = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalEditContent, setModalEditContent] = useState({});
  const [categoryProduct, setCategoryProduct] = useState();
  const [productMaterial, setProductMaterial] = useState();
  const [productSize, setProductSize] = useState();
  const [productFinishing, setProductFinishing] = useState();
  const [bentukProduk, setBentukProduk] = useState();
  const [postProduct, setPostProduct] = useState();
  const [putProduct, setPutProduct] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  const handleChangeProduct = (e) => {
    e.preventDefault();
    setPostProduct({
      ...postProduct,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const handleChangePutProduct = (e) => {
    e.preventDefault();
    setPutProduct({
      ...putProduct,
      [e.target.getAttribute("name")]: e.target.value,
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeModalEdit = () => {
    setIsOpenModalEdit(false);
  };

  const handleDelete = async (e, type, id) => {
    e.preventDefault();
    await commonAPI
      .delete(`/${type}/${id}`, {
        headers: {
          "x-access-token": `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Spesifikasi berhasil dihapus!");
        setAlerts(true);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  const handleModal = (type) => {
    switch (type) {
      case "kategori":
        setModalContent({
          type: "kategori",
          label: "Kategori",
          placeholder: "Masukkan Kategori Produk",
          path: "/category",
          html: "name",
          name: "name",
          id: "name",
          kode: "id",
        });
        break;
      case "bahan":
        setModalContent({
          type: "bahan",
          label: "Bahan",
          placeholder: "Masukkan Bahan Produk",
          path: "/material",
          html: "name",
          name: "name",
          id: "name",
        });
        break;
      case "bentuk":
        setModalContent({
          type: "bentuk",
          label: "Bentuk",
          placeholder: "Masukkan Bentuk Produk",
          path: "/jenisproducts",
          html: "name",
          name: "name",
          id: "name",
        });
        break;
      case "ukuran":
        setModalContent({
          type: "ukuran",
          label: "Deskripsi",
          placeholder: "Masukkan Deskripsi Produk",
          path: "/size",
          html: "name",
          name: "name",
          id: "name",
          length1: "length",
          width1: "width",
          height1: "height",
          length2: "length2",
          width2: "width2",
          height2: "height2",
          shape: "shape",
          description: "product_size_description",
        });
        break;
      case "finishing":
        setModalContent({
          type: "finishing",
          label: "Finishing",
          placeholder: "Masukkan Finishing Produk",
          path: "/finishing",
          html: "name",
          name: "name",
          id: "name",
        });
        break;
      default:
        break;
    }
    setIsOpenModal(true);
  };

  const handleModalEdit = async (
    type,
    id,
    productName,
    p1,
    l1,
    t1,
    p2,
    l2,
    t2,
    description
  ) => {
    console.log(id);
    switch (type) {
      case "category":
        setModalEditContent({
          id: id,
          type: "kategori",
          label: "Kategori",
          placeholder: "Masukkan Kategori Produk",
          path: "/category",
          specificationName: productName,
          putKey: "product_category_name",
        });
        break;
      case "material":
        setModalEditContent({
          id: id,
          type: "bahan",
          label: "Bahan",
          placeholder: "Masukkan Bahan Produk",
          path: "/material",
          specificationName: productName,
          putKey: "product_material_name",
        });
        break;
      case "jenisproducts":
        setModalEditContent({
          id: id,
          type: "bentuk",
          label: "Bentuk",
          placeholder: "Masukkan Bentuk Produk",
          path: "/jenisproducts",
          specificationName: productName,
          putKey: "name",
        });
        break;
      case "size":
        setModalEditContent({
          id: id,
          type: "ukuran",
          label: "Deskripsi",
          placeholder: "Masukkan Deskripsi Produk",
          path: "/size",
          specificationName: productName,
          p1: p1,
          l1: l1,
          t1: t1,
          p2: p2,
          l2: l2,
          t2: t2,
          description: description,
        });
        break;
      case "finishing":
        setModalEditContent({
          id: id,
          type: "finishing",
          label: "Finishing",
          placeholder: "Masukkan Finishing Produk",
          path: "/finishing",
          specificationName: productName,
          putKey: "product_finishing_name",
        });
        break;
      default:
        break;
    }
    setIsOpenModalEdit(true);
  };

  const submitModalHandler = async (e) => {
    e.preventDefault();
    await commonAPI
      .post(modalContent.path, postProduct, {
        headers: {
          "x-access-token": `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setModalContent({});
          setSuccessMessage("Spesifikasi berhasil ditambahkan!");
          setAlerts(true);
        }, 2000);
        setIsOpenModal(false);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  const submitEditModalHandler = async (e) => {
    e.preventDefault();
    await commonAPI
      .put(`${modalEditContent.path}/${modalEditContent.id}`, putProduct, {
        headers: {
          "x-access-token": `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setModalEditContent({});
          setSuccessMessage("Spesifikasi berhasil diubah!");
          setAlerts(true);
        }, 2000);
        setIsOpenModalEdit(false);
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  // category
  useEffect(() => {
    const getCategoryProduct = async () => {
      await commonAPI
        .get("/category", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setCategoryProduct(response.data.data));
    };
    getCategoryProduct();
  }, [parseUser.data.token]);

  // material
  useEffect(() => {
    const getMaterialProduct = async () => {
      await commonAPI
        .get("/material", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setProductMaterial(response.data.data));
    };
    getMaterialProduct();
  }, [parseUser.data.token]);

  // size
  useEffect(() => {
    const getSizeProduct = async () => {
      await commonAPI
        .get("/size", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setProductSize(response.data.data));
    };
    getSizeProduct();
  }, [parseUser.data.token]);

  // finishing
  useEffect(() => {
    const getFinsihingProduct = async () => {
      await commonAPI
        .get("/finishing", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setProductFinishing(response.data.data));
    };
    getFinsihingProduct();
  }, [parseUser.data.token]);

  // bentuk
  useEffect(() => {
    const getBentukProduct = async () => {
      await commonAPI
        .get("/jenisproducts", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
          },
        })
        .then((response) => setBentukProduk(response.data.data));
    };
    getBentukProduct();
  }, [parseUser.data.token]);

  useEffect(() => {
    setTimeout(() => {
      if (alerts || alertFail === true) setAlertFail(false) || setAlerts(false);
    }, 2000);
  }, [alertFail, alerts]);

  return (
    <>
      {alerts && (
        <Alerts
          state="true"
          background="bg-green-100"
          textColor="text-green-600"
          textContent={successMessage}
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
      <section>
        <div className="border-b border-orange-900 mb-6">
          <h3 className="font-semibold pb-3">Spesifikasi</h3>
        </div>
        <article
          id="tableKategoriProduk"
          className="mb-12 p-8 rounded-xl shadow-gray"
        >
          <div className="flex flex-col gap-y-4 2xsm:gap-y-0 2xsm:flex-row 2xsm:items-center justify-between mb-6 2xsm:mb-4">
            <h6>Kategori Produk</h6>
            <div>
              <button
                onClick={() => handleModal("kategori")}
                className="button-fill !pl-4 flex items-center"
              >
                <BsPlus className="text-2xl mr-2 fill-white" />
                Tambah Produk
              </button>
            </div>
          </div>
          <div className="flex flex-col 2xsm:flex-row 2xsm:items-center 2xsm:justify-between mb-4">
            <div className="flex gap-2 items-center mb-2 2xsm:mb-0 2xsm:mr-4">
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
          {/* table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto mb-4 w-full">
                <thead>
                  <tr className="bg-orange-900">
                    <th className="text-white text-center p-3 min-w-[54px]">
                      No
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px]">
                      Kategori Produk
                    </th>
                    <th className="text-white text-center p-3 min-w-[180px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryProduct?.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="text-center p-3">{index + 1}</td>
                      <td className="text-center p-3">
                        {item.product_category_name}
                      </td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                            onClick={() =>
                              handleModalEdit(
                                "category",
                                item.product_category_id,
                                item.product_category_name
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button-fill !p-[15px]"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                "category",
                                item.product_category_id
                              )
                            }
                          >
                            <FaTrash className="fill-white text-base" />
                          </button>
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
          </div>
        </article>
        <article
          id="tableBahanProduk"
          className="mb-12 p-8 rounded-xl shadow-gray"
        >
          <div className="flex flex-col gap-y-4 2xsm:gap-y-0 2xsm:flex-row 2xsm:items-center justify-between mb-6 2xsm:mb-4">
            <h6>Bahan Produk</h6>
            <div>
              <button
                onClick={() => handleModal("bahan")}
                className="button-fill !pl-4 flex items-center"
              >
                <BsPlus className="text-2xl mr-2 fill-white" />
                Tambah Bahan
              </button>
            </div>
          </div>
          <div className="flex flex-col 2xsm:flex-row 2xsm:items-center 2xsm:justify-between mb-4">
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
          {/* table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto mb-4 w-full">
                <thead>
                  <tr className="bg-orange-900">
                    <td className="text-white text-center p-3 min-w-[54px]">
                      No
                    </td>
                    <td className="text-white text-center p-3 min-w-[160px]">
                      Bahan Produk
                    </td>
                    <td className="text-white text-center p-3 min-w-[180px]">
                      Aksi
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {productMaterial?.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="text-center p-3">{index + 1}</td>
                      <td className="text-center p-3">
                        {item.product_material_name}
                      </td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                            onClick={() =>
                              handleModalEdit(
                                "material",
                                item.product_material_id,
                                item.product_material_name
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button-fill !p-[15px]"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                "material",
                                item.product_material_id
                              )
                            }
                          >
                            <FaTrash className="fill-white text-base" />
                          </button>
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
          </div>
        </article>
        <article
          id="tableBentukProduk"
          className="mb-12 p-8 rounded-xl shadow-gray"
        >
          <div className="flex flex-col gap-y-4 2xsm:gap-y-0 2xsm:flex-row 2xsm:items-center justify-between mb-6 2xsm:mb-4">
            <h6>Bentuk Produk</h6>
            <div>
              <button
                onClick={() => handleModal("bentuk")}
                className="button-fill !pl-4 flex items-center"
              >
                <BsPlus className="text-2xl mr-2 fill-white" />
                Tambah Bentuk
              </button>
            </div>
          </div>
          <div className="flex flex-col 2xsm:flex-row 2xsm:items-center 2xsm:justify-between mb-4">
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
          {/* table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto mb-4 w-full">
                <thead>
                  <tr className="bg-orange-900">
                    <th className="text-white text-center p-3 min-w-[54px]">
                      No
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px]">
                      Bentuk Produk
                    </th>
                    <th className="text-white text-center p-3 min-w-[180px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bentukProduk?.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="text-center p-3">{index + 1}</td>
                      <td className="text-center p-3">
                        {item.jenis_product_name}
                      </td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                            onClick={() =>
                              handleModalEdit(
                                "jenisproducts",
                                item.jenis_product_id,
                                item.jenis_product_name
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button-fill !p-[15px]"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                "jenisproducts",
                                item.jenis_product_id
                              )
                            }
                          >
                            <FaTrash className="fill-white text-base" />
                          </button>
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
          </div>
        </article>
        <article
          id="tableUkuranProduk"
          className="mb-12 p-8 rounded-xl shadow-gray"
        >
          <div className="flex flex-col gap-y-4 2xsm:gap-y-0 2xsm:flex-row 2xsm:items-center justify-between mb-6 2xsm:mb-4">
            <h6>Ukuran Produk</h6>
            <div>
              <button
                onClick={() => handleModal("ukuran")}
                className="button-fill !pl-4 flex items-center"
              >
                <BsPlus className="text-2xl mr-2 fill-white" />
                Tambah Ukuran
              </button>
            </div>
          </div>
          <div className="flex flex-col 2xsm:flex-row 2xsm:items-center 2xsm:justify-between mb-4">
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
          {/* table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto mb-4 w-full">
                <thead>
                  <tr className="bg-orange-900">
                    <th className="text-white text-center p-3 min-w-[54px] w-[8%]">
                      No
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px] w-[22%]">
                      Bentuk Ukuran
                    </th>
                    <th className="text-white text-center p-3 min-w-[180px] w-[45%]">
                      Deskripsi Produk
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px] w-[25%]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productSize?.map((item, index) => (
                    <tr className="border-b align-baseline" key={index}>
                      <td className="text-center p-3">{index + 1}</td>
                      <td className="text-center p-3">
                        {item.product_size_shape}
                      </td>
                      <td className="p-3">{item.product_size_description}</td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                            onClick={() =>
                              handleModalEdit(
                                "size",
                                item.product_size_id,
                                item.product_size_shape,
                                item.product_size_length,
                                item.product_size_width,
                                item.product_size_height,
                                item.product_size_length2,
                                item.product_size_width2,
                                item.product_size_height2,
                                item.product_size_description
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button-fill !p-[15px]"
                            onClick={(e) =>
                              handleDelete(e, "size", item.product_size_id)
                            }
                          >
                            <FaTrash className="fill-white text-base" />
                          </button>
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
          </div>
        </article>
        <article
          id="tableFinishingKemasan"
          className="mb-12 p-8 rounded-xl shadow-gray"
        >
          <div className="flex flex-col gap-y-4 2xsm:gap-y-0 2xsm:flex-row 2xsm:items-center justify-between mb-6 2xsm:mb-4">
            <h6>Finishing Kemasan</h6>
            <div>
              <button
                onClick={() => handleModal("finishing")}
                className="button-fill !pl-4 flex items-center"
              >
                <BsPlus className="text-2xl mr-2 fill-white" />
                Tambah Finishing
              </button>
            </div>
          </div>
          <div className="flex flex-col 2xsm:flex-row 2xsm:items-center 2xsm:justify-between mb-4">
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
          {/* table */}
          <div>
            <div className="overflow-x-auto">
              <table className="table-auto mb-4 w-full">
                <thead>
                  <tr className="bg-orange-900">
                    <th className="text-white text-center p-3 min-w-[54px]">
                      No
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px]">
                      Finishing Kemasan
                    </th>
                    <th className="text-white text-center p-3 min-w-[180px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productFinishing?.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="text-center p-3">{index + 1}</td>
                      <td className="text-center p-3">
                        {item.product_finishing_name}
                      </td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                            onClick={() =>
                              handleModalEdit(
                                "finishing",
                                item.product_finishing_id,
                                item.product_finishing_name
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button-fill !p-[15px]"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                "finishing",
                                item.product_finishing_id
                              )
                            }
                          >
                            <FaTrash className="fill-white text-base" />
                          </button>
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
          </div>
        </article>
      </section>

      {/* Modal Spesifikasi */}
      <ModalsSpesifikasi
        isOpen={isOpenModal}
        closeModal={closeModal}
        submitHandler={submitModalHandler}
        content={modalContent}
        handleChangeProduct={handleChangeProduct}
      />

      {/* Modal Edit Spesifikasi */}
      <ModalsEditSpesifikasi
        isOpen={isOpenModalEdit}
        closeModal={closeModalEdit}
        submitHandler={submitEditModalHandler}
        content={modalEditContent}
        handleChangePutProduct={handleChangePutProduct}
      />
    </>
  );
};

export default Spesifikasi;
