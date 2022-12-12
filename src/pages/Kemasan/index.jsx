import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../../components/Card/CardProduct";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import useProducts from "../../hooks/useProductDetail";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import Pagination from "../../components/Pagination";

const Kemasan = () => {
  const [active, setActive] = useState("Semua Kemasan");
  const [productData, setProductData] = useState();
  const type = [
    "Semua Kemasan",
    "Karton",
    "Dus Offset",
    "Sablon Plastik, Pouch, Dus",
    "Stiker",
    "Standing Pouch",
  ];
  const { data, isLoading } = useProducts(
    "https://simpelmen.herokuapp.com/api/product"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;
  const currentData = productData?.slice(indexFirstPost, indexLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleActive(type) {
    setActive(type);
    if (type === "Semua Kemasan") {
      setProductData(data);
    } else {
      const filteredData = data.filter(
        (item) => item.jenis_products.jenis_product_name === type
      );
      setProductData(filteredData);
    }
  }
  useEffect(() => {
    if (!isLoading) setProductData(data);
  }, [data, isLoading]);
  return (
    <>
      <main className="containers">
        <section
          id="categoryKemasan"
          className="mt-0 xs:mt-7 mb-12 2xsm:mb-60/sp"
        >
          <div className="mb-5 flex">
            <Link to="/" className="flex items-center mb-3">
              <HiOutlineArrowSmLeft className="text-2xl mr-3" />
              <span className="leading-10">Kembali</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 xs:gap-3 md:gap-4 flex-wrap">
            {type.map((item, index) => (
              <button
                key={index}
                onClick={() => handleActive(item)}
                className={
                  active === item
                    ? "button-gradient-sm !text-xs xs:!text-base !rounded-full"
                    : "button-white-sm !text-xs xs:!text-base !rounded-full"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section id="kemasan" className="mb-9">
          <div className="w-full grid grid-cols-8 md:grid-cols-12 gap-3 2xsm:gap-5 xl:gap-7 mb-60/sp">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div className="col-span-4 lg:col-span-3" key={item}>
                    <CardSkeleton />
                  </div>
                ))
              : currentData?.map((item, index) => {
                  return (
                    <div className="col-span-4 lg:col-span-3" key={index}>
                      <CardProduct {...item} />
                    </div>
                  );
                })}
          </div>
          <Pagination
            currentPage={currentPage}
            postsPerPage={postPerPage}
            totalPosts={data?.length}
            paginate={paginate}
          />
        </section>
      </main>
    </>
  );
};

export default Kemasan;
