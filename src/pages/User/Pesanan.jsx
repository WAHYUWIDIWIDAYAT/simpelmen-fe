import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { FaShoppingCart } from 'react-icons/fa';
import { postOrder } from '../../services/api';
import animationData from '../../assets/lotties/plane-loading.json';
import Pagination from '../../components/Pagination';

const Pesanan = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  // pagination setting
  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = data?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getOrder = async () => {
      await postOrder
        .get('/list', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => setData(response.data))
        .catch(() => {});
    };
    getOrder();
  }, [parseUser.data.token]);

  return (
    <>
      <section>
        <h5 className="mb-4">Detail Pesanan</h5>

        <article
          id="pesanan"
          className="mb-8"
        >
          <div className="w-full grid grid-cols-4 gap-y-5 gap-x-6">
            {currentData ? (
              currentData?.map((item) => (
                <div
                  className="col-span-4"
                  key={item.order_id}
                >
                  <div className="w-full shadow-gray p-4 rounded-[10px] bg-white grid grid-cols-8 gap-x-3 gap-y-2 xs:gap-y-3 xl:items-center border border-secondary-700/40">
                    <div className="col-span-3 xl:col-span-2">
                      <p className="text-xs xs:text-sm font-medium mb-1 xs:mb-2 text-secondary-900">
                        Tanggal Pesanan
                      </p>
                      <p className="font-semibold">{`${new Date(
                        item.createdAt
                      ).getDate()} - ${
                        new Date(item.createdAt).getMonth() + 1
                      } - ${new Date(item.createdAt).getFullYear()}`}</p>
                    </div>
                    <div className="col-span-5 xl:col-span-2 block xl:hidden">
                      <div className="flex xl:justify-center">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/detail/${item.order_id}`)
                          }
                          className="border border-secondary-800 rounded-[4px] px-2 py-2 flex items-center hover:border-orange-900 transition-200"
                          type="button"
                        >
                          <FaShoppingCart className="text-lg fill-dark mr-2" />
                          <span className="text-sm">Detail Pesanan</span>
                        </button>
                      </div>
                    </div>
                    <div className="col-span-3 xl:col-span-2">
                      <p className="text-xs xs:text-sm font-medium mb-1 xs:mb-2 text-secondary-900">
                        No. Pesanan
                      </p>
                      <p className="font-semibold truncate">
                        {item.order_code}
                      </p>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                      <p className="text-xs xs:text-sm font-medium mb-1 xs:mb-2 text-secondary-900">
                        Jenis Produk
                      </p>
                      <p className="font-semibold">
                        {
                          item.order_details[0]?.products.jenis_products
                            .jenis_product_name
                        }{' '}
                        -{' '}
                        {
                          item.order_details[0]?.products.jenis_products
                            .jenis_product_description
                        }
                      </p>
                    </div>
                    <div className="xl:col-span-2 hidden xl:block">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/detail/${item.order_id}`)
                          }
                          className="border border-secondary-800 rounded-[4px] px-2 py-2 flex items-center hover:border-orange-900 transition-200"
                          type="button"
                        >
                          <FaShoppingCart className="text-lg fill-dark mr-2" />
                          <span className="text-sm">Detail Pesanan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4">
                <div className="h-96 w-full flex items-center justify-center">
                  <div>
                    <Player
                      src={animationData}
                      className="player"
                      loop
                      autoplay
                      speed={1}
                      style={{ height: '300px', width: '300px' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
        <Pagination
          currentPage={currentPage}
          postsPerPage={postPerPage}
          totalPosts={data?.length}
          paginate={paginate}
        />
      </section>
    </>
  );
};

export default Pesanan;
