import React, { useEffect, useState } from 'react';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import ModalsDetailProduk from './components/ModalsDetailProduk';
import ModalsAddProduk from './components/ModalsAddProduk';
import ModalsEditProduk from './components/ModalsEditProduk';
import { commonAPI } from '../../../services/api';
import Alerts from '../../../components/Alerts';
import Pagination from '../../../components/Pagination';

const Produk = () => {
  const user = localStorage.getItem('admin');
  const parseUser = JSON.parse(user);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [detailData, setDetailData] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [postProduct, setPostProduct] = useState();
  const [putProduct, setPutProduct] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [categoryProduct, setCategoryProduct] = useState();
  const [productMaterial, setProductMaterial] = useState();
  const [productSize, setProductSize] = useState();
  const [productFinishing, setProductFinishing] = useState();
  const [bentukProduk, setBentukProduk] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = dataProduct?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getProduct = async () => {
    await commonAPI
      .get('/product')
      .then((response) => {
        setDataProduct(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setAlertFail(true);
        setFailMessage('Gagal mengambil data produk');
        setIsLoading(false);
      });
  };
  const getCategoryProduct = async (token) => {
    await commonAPI
      .get('/category', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => setCategoryProduct(response.data.data));
  };
  const getMaterialProduct = async (token) => {
    await commonAPI
      .get('/material', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => setProductMaterial(response.data.data));
  };
  const getSizeProduct = async (token) => {
    await commonAPI
      .get('/size', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => setProductSize(response.data.data));
  };
  const getFinsihingProduct = async (token) => {
    await commonAPI
      .get('/finishing', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => setProductFinishing(response.data.data));
  };
  const getBentukProduct = async (token) => {
    await commonAPI
      .get('/jenisproducts', {
        headers: {
          'x-access-token': `${token}`,
        },
      })
      .then((response) => setBentukProduk(response.data.data));
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

  const closeModalAdd = () => {
    setIsOpenModalAdd(false);
  };

  const closeModalEdit = () => {
    setIsOpenModalEdit(false);
  };

  const closeModalDetail = () => {
    setIsOpenModalDetail(false);
  };

  const modalAddHandling = () => {
    setIsOpenModalAdd(true);
  };

  const modalEditHandling = async (id) => {
    setIsOpenModalEdit(true);
    await commonAPI
      .get(`/product/${id}`)
      .then((response) => setDetailData(response.data));
  };

  const modalDetailHandling = async (id) => {
    setIsOpenModalDetail(true);
    await commonAPI
      .get(`/product/${id}`)
      .then((response) => setDetailData(response.data));
  };

  const submitProdukHandler = async (e) => {
    e.preventDefault();
    await commonAPI
      .post('/product', postProduct, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setIsOpenModalAdd(false);
        setAlerts(true);
        getProduct();
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };
  const submitEditProdukHandler = async (e) => {
    e.preventDefault();
    await commonAPI
      .put(`/product/${detailData.product_id}`, putProduct, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setIsOpenModalEdit(false);
        setAlerts(true);
        getProduct();
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  };

  async function handleDelete(e, id) {
    e.preventDefault();
    await commonAPI
      .delete(`/product/${id}`, {
        headers: {
          'x-access-token': `${parseUser.data.token}`,
        },
      })
      .then((response) => {
        setAlerts(true);
        getProduct();
      })
      .catch((e) => {
        setFailMessage(e.message);
        setAlertFail(true);
      });
  }

  // get product data
  useEffect(() => {
    getProduct();
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
          textContent="Status berhasil diubah!"
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
          <h3 className="font-semibold pb-3">Produk</h3>
        </div>
        <div className="flex flex-col gap-y-4 xs:gap-y-0 xs:flex-row xs:items-center justify-between mb-4">
          <h6 className="">Tabel Produk</h6>
          <div>
            <button
              onClick={modalAddHandling}
              className="button-fill !pl-4 flex items-center"
            >
              <BsPlus className="text-2xl mr-2 fill-white" />
              Tambah Produk
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
              autoComplete="on"
              // onChange={handleChange}
            />
            <BsSearch className="absolute text-xl top-3 left-6 fill-secondary-800" />
          </div>
        </div>

        <article id="tableProduk">
          <div className="overflow-x-auto">
            <table className="table-auto mb-4 w-full">
              <thead>
                <tr className="bg-orange-900">
                  <th className="text-white text-center p-3 min-w-[54px]">
                    No
                  </th>
                  <th className="text-white text-center p-3 min-w-[120px]">
                    Nama Produk
                  </th>
                  <th className="text-white text-center p-3 min-w-[120px]">
                    Kategori Produk
                  </th>
                  <th className="text-white text-center p-3 min-w-[240px]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
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
                          <div className="h-3 bg-slate-200 rounded-md"></div>
                        </td>
                        <td className="text-center px-4 py-3">
                          <div className="flex items-center justify-center gap-3 py-2">
                            <div className="h-3 bg-slate-200 rounded-md w-20"></div>
                            <div className="h-3 bg-slate-200 rounded-md w-20"></div>
                            <div className="h-3 bg-slate-200 rounded-md w-16"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentData?.map((item, index) => (
                      <tr
                        className="border-b"
                        key={index}
                      >
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center p-3">{item.product_name}</td>
                        <td className="text-center p-3">
                          {item?.product_categories?.product_category_name}
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                              onClick={() =>
                                modalDetailHandling(item.product_id)
                              }
                            >
                              Detail
                            </button>
                            <button
                              className="bg-white border py-3 px-4 rounded-lg text-sm transition-200 hover:border-orange-900"
                              onClick={() => modalEditHandling(item.product_id)}
                            >
                              Edit
                            </button>
                            <div
                              className="button-fill !p-[15px]"
                              onClick={(e) => handleDelete(e, item.product_id)}
                            >
                              <FaTrash className="fill-white text-base" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <Pagination
            type="dashboard"
            currentPage={currentPage}
            postsPerPage={postPerPage}
            totalPosts={dataProduct?.length}
            paginate={paginate}
          />
        </article>
      </section>

      {/* Modal Add Produk */}
      <ModalsAddProduk
        isOpen={isOpenModalAdd}
        closeModal={closeModalAdd}
        submitHandler={submitProdukHandler}
        handleChangeProduct={handleChangeProduct}
        categoryProduct={categoryProduct}
        productMaterial={productMaterial}
        productSize={productSize}
        productFinishing={productFinishing}
        bentukProduk={bentukProduk}
      />

      {/* Modal Edit Produk */}
      <ModalsEditProduk
        isOpen={isOpenModalEdit}
        closeModal={closeModalEdit}
        submitHandler={submitEditProdukHandler}
        detailData={detailData}
        handleChangePutProduct={handleChangePutProduct}
        categoryProduct={categoryProduct}
        productMaterial={productMaterial}
        productSize={productSize}
        productFinishing={productFinishing}
        bentukProduk={bentukProduk}
      />

      {/* Modal Detail Produk */}
      <ModalsDetailProduk
        isOpen={isOpenModalDetail}
        closeModal={closeModalDetail}
        detailData={detailData}
      />
    </>
  );
};

export default Produk;
