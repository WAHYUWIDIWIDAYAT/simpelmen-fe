import React, { useState } from "react";
import svg from "../../assets/svg";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { useEffect } from "react";
import { postOrder } from "../../services/api";

const EmptyState = () => {
  return (
    <>
      <div className="empty-state w-full pt-10 flex flex-col justify-center items-center text-center mb-12">
        <img src={svg.windTurbine} alt="wind-turbine" className="mb-4" />
        <p className="text-secondary-900">Pilih produk yang ingin Anda lacak</p>
      </div>
    </>
  );
};
const LacakPesanan = () => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  const [toggleTracking, setToggleTracking] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState();
  const [trackingData, setTrackingData] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const getTracking = async () => {
      await postOrder
        .get("/tracking", {
          headers: {
            "x-access-token": `${parseUser.data.token}`,
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

  useEffect(() => {
    setTrackingData(data?.filter((item) => item.order_id === trackingOrder)[0]);
  }, [data, trackingOrder]);

  return (
    <>
      <section>
        <div className="grid grid-cols-4 xl:grid-cols-10 gap-x-5 gap-y-12 xl:gap-y-0">
          <div className="col-span-4 xl:col-span-6 pr-4">
            <img
              src={svg.shippingVehicle}
              alt="shipping-vehicle"
              className="w-full mb-8"
            />
            <article className="mb-8" id="lacakPesanan">
              <div className="w-full grid grid-cols-4 gap-y-5 gap-x-6">
                {data?.map((item, index) => (
                  <div className="col-span-4" key={item.order_id}>
                    <div className="w-full shadow-gray p-4 rounded-[10px] bg-white grid grid-cols-6 gap-x-3 gap-y-2 xs:gap-y-3 xl:items-center border border-secondary-700/40">
                      <div className="col-span-6 xl:col-span-2">
                        <p className="text-xs xs:text-sm font-medium mb-1 xs:mb-2 text-secondary-900">
                          No. Pesanan
                        </p>
                        <p className="font-semibold truncate">
                          {item.order_code}
                        </p>
                      </div>
                      <div className="col-span-6 xl:col-span-2">
                        <p className="text-xs xs:text-sm font-medium mb-1 xs:mb-2 text-secondary-900">
                          Jenis Produk
                        </p>
                        <p className="font-semibold">
                          {
                            item.order_details[0]?.products.jenis_products
                              .jenis_product_name
                          }{" "}
                        </p>
                      </div>
                      <div className="xl:col-span-2 hidden xl:block">
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => showTracking(e, item.order_id)}
                            className="text-sm border border-secondary-800 rounded-full px-3 py-1 hover:border-primary-900 transition-200"
                          >
                            Lacak Pesanan
                          </button>
                        </div>
                      </div>
                      <div className="col-span-6 xl:col-span-2 block xl:hidden">
                        <div className="flex xl:justify-center">
                          <button
                            onClick={(e) => showTracking(e, item.order_id)}
                            className="text-sm border border-secondary-800 rounded-full px-3 py-1 hover:border-primary-900 transition-200"
                          >
                            Lacak Pesanan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <nav
              className="flex justify-center items-center gap-x-[.375rem] py-2 mt-10"
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
