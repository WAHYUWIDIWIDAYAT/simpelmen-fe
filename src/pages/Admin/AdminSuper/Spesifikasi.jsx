import React, { useEffect, useState } from 'react';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';
import { commonAPI } from '../../../services/api';
import ModalsEditSpesifikasi from './components/ModalsEditSpesifikasi';
import ModalsSpesifikasi from './components/ModalsSpesifikasi';

const Spesifikasi = () => {
  const user = localStorage.getItem('admin');
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
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [isLoadingMaterial, setIsLoadingMaterial] = useState(true);
  const [isLoadingBentuk, setIsLoadingBentuk] = useState(true);
  const [isLoadingSize, setIsLoadingSize] = useState(true);
  const [isLoadingFinishing, setIsLoadingFinishing] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState({
    kategori: 1,
    bahan: 1,
    bentuk: 1,
    ukuran: 1,
    finishing: 1,
  });
  const postPerPage = 5;

  const indexLastPostKategori = currentPage.kategori * postPerPage;
  const indexFirstPostKategori = indexLastPostKategori - postPerPage;
  const indexLastPostBahan = currentPage.bahan * postPerPage;
  const indexFirstPostBahan = indexLastPostBahan - postPerPage;
  const indexLastPostBentuk = currentPage.bentuk * postPerPage;
  const indexFirstPostBentuk = indexLastPostBentuk - postPerPage;
  const indexLastPostUkuran = currentPage.ukuran * postPerPage;
  const indexFirstPostUkuran = indexLastPostUkuran - postPerPage;
  const indexLastPostFinishing = currentPage.finishing * postPerPage;
  const indexFirstPostFinishing = indexLastPostFinishing - postPerPage;
  const currentDataKategori = categoryProduct?.slice(
    indexFirstPostKategori,
    indexLastPostKategori
  );
  const currentDataBahan = productMaterial?.slice(
    indexFirstPostBahan,
    indexLastPostBahan
  );
  const currentDataBentuk = bentukProduk?.slice(
    indexFirstPostBentuk,
    indexLastPostBentuk
  );
  const currentDataUkuran = productSize?.slice(
    indexFirstPostUkuran,
    indexLastPostUkuran
  );
  const currentDataFinishing = productFinishing?.slice(
    indexFirstPostFinishing,
    indexLastPostFinishing
  );
  const paginateKategori = (pageNumber) =>
    setCurrentPage({ ...currentPage, kategori: pageNumber });
  const paginateBahan = (pageNumber) =>
    setCurrentPage({ ...currentPage, bahan: pageNumber });
  const paginateBentuk = (pageNumber) =>
    setCurrentPage({ ...currentPage, bentuk: pageNumber });
  const paginateUkuran = (pageNumber) =>
    setCurrentPage({ ...currentPage, ukuran: pageNumber });
  const paginateFinishing = (pageNumber) =>
    setCurrentPage({ ...currentPage, finishing: pageNumber });
  console.log(currentDataUkuran);

  const getCategoryProduct = async (token) => {
    await commonAPI
      .get('/category', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setCategoryProduct(response.data.data);
        setIsLoadingCategory(false);
      })
      .catch(() => {
        setIsLoadingCategory(false);
      });
  };
  const getMaterialProduct = async (token) => {
    await commonAPI
      .get('/material', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setProductMaterial(response.data.data);
        setIsLoadingMaterial(false);
      })
      .catch(() => {
        setIsLoadingMaterial(false);
      });
  };
  const getSizeProduct = async (token) => {
    await commonAPI
      .get('/size', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setProductSize(response.data.data);
        setIsLoadingSize(false);
      })
      .catch(() => {
        setIsLoadingSize(false);
      });
  };
  const getFinsihingProduct = async (token) => {
    await commonAPI
      .get('/finishing', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setProductFinishing(response.data.data);
        setIsLoadingFinishing(false);
      })
      .catch(() => {
        setIsLoadingFinishing(false);
      });
  };
  const getBentukProduct = async (token) => {
    await commonAPI
      .get('/jenisproducts', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => {
        setBentukProduk(response.data.data);
        setIsLoadingBentuk(false);
      })
      .catch(() => {
        setIsLoadingBentuk(false);
      });
  };

  const handleChangeProduct = (e) => {
    e.preventDefault();
    setPostProduct({
      ...postProduct,
      [e.target.getAttribute('name')]: e.target.value,
    });
  };

  const handleChangePutProduct = (e) => {
    e.preventDefault();
    setPutProduct({
      ...putProduct,
      [e.target.getAttribute('name')]: e.target.value,
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
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setSuccessMessage('Spesifikasi berhasil dihapus!');
        setAlerts(true);
        switch (type) {
          case 'category':
            return getCategoryProduct(parseUser.data.token);
          case 'material':
            return getMaterialProduct(parseUser.data.token);
          case 'jenisproducts':
            return getBentukProduct(parseUser.data.token);
          case 'size':
            return getSizeProduct(parseUser.data.token);
          case 'finishing':
            return getFinsihingProduct(parseUser.data.token);
          default:
            break;
        }
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  const handleModal = (type) => {
    switch (type) {
      case 'kategori':
        setModalContent({
          type: 'kategori',
          label: 'Kategori',
          placeholder: 'Masukkan Kategori Produk',
          path: '/category',
          html: 'name',
          name: 'name',
          id: 'name',
          kode: 'id',
        });
        break;
      case 'bahan':
        setModalContent({
          type: 'bahan',
          label: 'Bahan',
          placeholder: 'Masukkan Bahan Produk',
          path: '/material',
          html: 'name',
          name: 'name',
          id: 'name',
        });
        break;
      case 'bentuk':
        setModalContent({
          type: 'bentuk',
          label: 'Bentuk',
          placeholder: 'Masukkan Bentuk Produk',
          path: '/jenisproducts',
          html: 'name',
          name: 'name',
          id: 'name',
        });
        break;
      case 'ukuran':
        setModalContent({
          type: 'ukuran',
          label: 'Deskripsi',
          placeholder: 'Masukkan Deskripsi Produk',
          path: '/size',
          html: 'name',
          name: 'name',
          id: 'name',
          length1: 'length',
          width1: 'width',
          height1: 'height',
          length2: 'length2',
          width2: 'width2',
          height2: 'height2',
          shape: 'shape',
          description: 'product_size_description',
        });
        break;
      case 'finishing':
        setModalContent({
          type: 'finishing',
          label: 'Finishing',
          placeholder: 'Masukkan Finishing Produk',
          path: '/finishing',
          html: 'name',
          name: 'name',
          id: 'name',
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
    switch (type) {
      case 'category':
        setModalEditContent({
          id: id,
          type: 'kategori',
          label: 'Kategori',
          placeholder: 'Masukkan Kategori Produk',
          path: '/category',
          specificationName: productName,
          putKey: 'product_category_name',
        });
        break;
      case 'material':
        setModalEditContent({
          id: id,
          type: 'bahan',
          label: 'Bahan',
          placeholder: 'Masukkan Bahan Produk',
          path: '/material',
          specificationName: productName,
          putKey: 'product_material_name',
        });
        break;
      case 'jenisproducts':
        setModalEditContent({
          id: id,
          type: 'bentuk',
          label: 'Bentuk',
          placeholder: 'Masukkan Bentuk Produk',
          path: '/jenisproducts',
          specificationName: productName,
          putKey: 'name',
        });
        break;
      case 'size':
        setModalEditContent({
          id: id,
          type: 'ukuran',
          label: 'Deskripsi',
          placeholder: 'Masukkan Deskripsi Produk',
          path: '/size',
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
      case 'finishing':
        setModalEditContent({
          id: id,
          type: 'finishing',
          label: 'Finishing',
          placeholder: 'Masukkan Finishing Produk',
          path: '/finishing',
          specificationName: productName,
          putKey: 'product_finishing_name',
        });
        break;
      default:
        break;
    }
    setIsOpenModalEdit(true);
  };

  const submitModalHandler = async (e, type) => {
    e.preventDefault();
    await commonAPI
      .post(modalContent.path, postProduct, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setModalContent({});
          setSuccessMessage('Spesifikasi berhasil ditambahkan!');
          setAlerts(true);
          switch (type) {
            case 'kategori':
              return getCategoryProduct(parseUser.data.token);
            case 'bahan':
              return getMaterialProduct(parseUser.data.token);
            case 'bentuk':
              return getBentukProduct(parseUser.data.token);
            case 'ukuran':
              return getSizeProduct(parseUser.data.token);
            case 'finishing':
              return getFinsihingProduct(parseUser.data.token);
            default:
              break;
          }
        }, 2000);
        setIsOpenModal(false);
      })
      .catch((e) => {
        setIsOpenModal(false);
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  const submitEditModalHandler = async (e, type) => {
    e.preventDefault();
    await commonAPI
      .put(`${modalEditContent.path}/${modalEditContent.id}`, putProduct, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setModalEditContent({});
          setSuccessMessage('Spesifikasi berhasil diubah!');
          setAlerts(true);
          switch (type) {
            case 'kategori':
              return getCategoryProduct(parseUser.data.token);
            case 'bahan':
              return getMaterialProduct(parseUser.data.token);
            case 'bentuk':
              return getBentukProduct(parseUser.data.token);
            case 'ukuran':
              return getSizeProduct(parseUser.data.token);
            case 'finishing':
              return getFinsihingProduct(parseUser.data.token);
            default:
              break;
          }
        }, 2000);
        setIsOpenModalEdit(false);
      })
      .catch((e) => {
        setIsOpenModalEdit(false);
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  // category
  useEffect(() => {
    getCategoryProduct(parseUser.data.token);
    getMaterialProduct(parseUser.data.token);
    getSizeProduct(parseUser.data.token);
    getFinsihingProduct(parseUser.data.token);
    getBentukProduct(parseUser.data.token);
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
                onClick={() => handleModal('kategori')}
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
                  {isLoadingCategory
                    ? [1, 2, 3].map((item) => (
                        <tr
                          className="animate-pulse border-b"
                          key={item}
                        >
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="flex items-center justify-center gap-3 py-2">
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : currentDataKategori?.map((item, index) => (
                        <tr
                          className="border-b"
                          key={index}
                        >
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
                                    'category',
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
                                    'category',
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
            <Pagination
              type="dashboard"
              currentPage={currentPage.kategori}
              postsPerPage={postPerPage}
              totalPosts={categoryProduct?.length}
              paginate={paginateKategori}
            />
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
                onClick={() => handleModal('bahan')}
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
                    <th className="text-white text-center p-3 min-w-[54px]">
                      No
                    </th>
                    <th className="text-white text-center p-3 min-w-[160px]">
                      Bahan Produk
                    </th>
                    <th className="text-white text-center p-3 min-w-[180px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingMaterial
                    ? [1, 2, 3].map((item) => (
                        <tr
                          className="animate-pulse border-b"
                          key={item}
                        >
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="flex items-center justify-center gap-3 py-2">
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : currentDataBahan?.map((item, index) => (
                        <tr
                          className="border-b"
                          key={index}
                        >
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
                                    'material',
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
                                    'material',
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
            <Pagination
              type="dashboard"
              currentPage={currentPage.bahan}
              postsPerPage={postPerPage}
              totalPosts={productMaterial?.length}
              paginate={paginateBahan}
            />
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
                onClick={() => handleModal('bentuk')}
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
                  {isLoadingBentuk
                    ? [1, 2, 3].map((item) => (
                        <tr
                          className="animate-pulse border-b"
                          key={item}
                        >
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="flex items-center justify-center gap-3 py-2">
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : currentDataBentuk?.map((item, index) => (
                        <tr
                          className="border-b"
                          key={index}
                        >
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
                                    'jenisproducts',
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
                                    'jenisproducts',
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
            <Pagination
              type="dashboard"
              currentPage={currentPage.bentuk}
              postsPerPage={postPerPage}
              totalPosts={bentukProduk?.length}
              paginate={paginateBentuk}
            />
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
                onClick={() => handleModal('ukuran')}
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
                  {isLoadingSize
                    ? [1, 2, 3].map((item) => (
                        <tr
                          className="border-b align-baseline animate-pulse"
                          key={item}
                        >
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="flex items-center justify-center gap-3 py-3">
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : currentDataUkuran?.map((item, index) => (
                        <tr
                          className="border-b align-baseline"
                          key={index}
                        >
                          <td className="text-center p-3">{index + 1}</td>
                          <td className="text-center p-3">
                            {item.product_size_shape}
                          </td>
                          <td className="p-3 text-center">
                            {item.product_size_description}
                          </td>
                          <td className="text-center p-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                                onClick={() =>
                                  handleModalEdit(
                                    'size',
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
                                  handleDelete(e, 'size', item.product_size_id)
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
            <Pagination
              type="dashboard"
              currentPage={currentPage.ukuran}
              postsPerPage={postPerPage}
              totalPosts={productSize?.length}
              paginate={paginateUkuran}
            />
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
                onClick={() => handleModal('finishing')}
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
                  {isLoadingFinishing
                    ? [1, 2, 3].map((item) => (
                        <tr
                          className="animate-pulse border-b"
                          key={item}
                        >
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="h-3 bg-slate-200 rounded-md"></div>
                          </td>
                          <td className="text-center px-4 py-3">
                            <div className="flex items-center justify-center gap-3 py-2">
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                              <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : currentDataFinishing?.map((item, index) => (
                        <tr
                          className="border-b"
                          key={index}
                        >
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
                                    'finishing',
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
                                    'finishing',
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
            <Pagination
              type="dashboard"
              currentPage={currentPage.finishing}
              postsPerPage={postPerPage}
              totalPosts={productFinishing?.length}
              paginate={paginateFinishing}
            />
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
