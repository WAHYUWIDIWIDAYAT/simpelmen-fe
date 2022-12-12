import React, { useState } from "react";
import svg from "../../assets/svg";
import { useEffect } from "react";
import { postOrder } from "../../services/api";
import Alerts from "../../components/Alerts";
import Pagination from "../../components/Pagination";

const EmptyState = () => {
  return (
    <>
      <div className="empty-state w-full pt-10 flex flex-col justify-center items-center text-center mb-12">
        <img
          src={svg.windTurbine}
          alt="wind-turbine"
          className="mb-4"
        />
        <p className="text-secondary-900">Pilih produk yang ingin Anda lacak</p>
      </div>
    </>
  );
};
const LacakPesanan = () => {
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  const [toggleTracking, setToggleTracking] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState();
  const [trackingData, setTrackingData] = useState();
  const [data, setData] = useState();
  const [alerts, setAlerts] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = data?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getTracking = async () => {
      await postOrder
        .get('/tracking', {
          headers: {
            'x-access-token': `${parseUser.data.token}`,
          },
        })
        .then((response) => setData(response.data));
    };
    getTracking();
  }, [parseUser.data.token]);

  function showTracking(e, index) {
    e.preventDefault();
    setToggleTracking(false);
    setTrackingOrder(index);
  }

  async function handleApprove(e, id) {
    e.preventDefault();
    await postOrder
      .put(`/accept/${id}`)
      .then((resp) => setAlerts(true))
      .catch((e) => {
        setAlertFail(true);
        setFailMessage(e.message);
      });
  }

  useEffect(() => {
    setTrackingData(data?.filter((item) => item.order_id === trackingOrder)[0]);
  }, [data, trackingOrder]);

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
          textContent="Login Berhasil"
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
        <div className="grid grid-cols-4 xl:grid-cols-10 gap-x-5 gap-y-12 xl:gap-y-0">
          <div className="col-span-4 xl:col-span-6 pr-4">
            <img
              src={svg.shippingVehicle}
              alt="shipping-vehicle"
              className="w-full mb-8"
            />
            <Pagination
              currentPage={currentPage}
              postsPerPage={postPerPage}
              totalPosts={data?.length}
              paginate={paginate}
            />
          </div>
          <div className="col-span-4 xl:border-l px-5">
            {toggleTracking && <EmptyState />}
            {!toggleTracking && (
              <div className="flex flex-col gap-5">
                {trackingData?.order_statuses.map((item, index) => (
                  <>
                    <div
                      className="bg-white rounded-md shadow-md p-3"
                      key={index}
                    >
                      <p>{`${new Date(item.createdAt).getDate()} - ${
                        new Date(item.createdAt).getMonth() + 1
                      } - ${new Date(item.createdAt).getFullYear()}`}</p>
                      <h6 className="font-semibold">
                        {item.order_status_description}
                      </h6>
                      {item.order_status_description ===
                        'Pesanan telah dikirim' && (
                        <div>
                          <p>
                            {
                              trackingData.delivery_details[0]
                                ?.delivery_detail_courier
                            }
                          </p>
                          <p>
                            {
                              trackingData.delivery_details[0]
                                ?.delivery_detail_receipt
                            }
                          </p>
                          <p>
                            {
                              trackingData.delivery_details[0]
                                ?.delivery_detail_estimate
                            }
                          </p>
                        </div>
                      )}
                      {item.order_status_description === 'Pesanan Diterima' && (
                        <button
                          className="bg-primary-900 text-white font-semibold rounded-md py-2 px-7"
                          onClick={(e) => handleApprove(e, item.order_id)}
                        >
                          Pesanan Selesai
                        </button>
                      )}
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LacakPesanan;
