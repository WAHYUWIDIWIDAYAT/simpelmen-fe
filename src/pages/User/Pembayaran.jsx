import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { postOrder } from '../../services/api';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../assets/lotties/plane-loading.json';

const Pembayaran = () => {
  const [data, setData] = useState();
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  // Pagination setting
  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = data?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const badge = (description, status) => {
    if (parseInt(status) === 2) {
      return (
        <p className="px-3 xs:px-4 py-1 rounded font-medium cursor-default truncate bg-primary-900/[15%] text-[10px] xs:text-sm transition-200 hover:bg-primary-900/20 text-primary-900">
          {description}
        </p>
      );
    }
    return (
      <p className="px-3 xs:px-4 py-1 rounded font-medium cursor-default truncate bg-success/[15%] text-[10px] xs:text-sm transition-200 hover:bg-success/20 text-success">
        {description}
      </p>
    );
  };

  useEffect(() => {
    const getStatusOrder = async () => {
      await postOrder
        .get('/status', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => setData(response.data));
    };
    getStatusOrder();
  }, [parseUser.data.token]);

  return (
    <>
      <section>
        <h5 className="mb-4">Status Pesanan</h5>

        <article
          id="statusPesanan"
          className="mb-8"
        >
          <div className="w-full grid grid-cols-4 gap-y-5 gap-x-6">
            {currentData ? (
              currentData?.map((item, index) => (
                <div
                  className="col-span-4"
                  key={index}
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
                        -
                        {
                          item.order_details[0]?.products.jenis_products
                            .jenis_product_description
                        }
                        
                      </p>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                      <div className="flex xl:justify-center">
                        {badge(
                          item.order_statuses[0]?.order_status_description,
                          item.order_statuses[0]?.order_status_admin_code
                        )}
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

export default Pembayaran;
