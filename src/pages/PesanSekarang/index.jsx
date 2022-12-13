import React from 'react';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import FormKarton from './components/FormKarton';
import FormPesan from './components/FormPesan';
import FormSablon from './components/FormSablon';
import FormSpecial from './components/FormSpecial';

const PesanSekarang = () => {
  const location = useLocation();
  const productData = location.state;

  const formProduct = (product) => {
    switch (product) {
      case 'K':
        return <FormKarton data={productData.formData} />;
      case 'S':
        return <FormSablon data={productData.formData} />;
      case 'O':
        return (
          <FormSpecial
            data={productData.formData}
            type={productData.formType}
          />
        );
      default:
        break;
    }
  };
  return (
    <>
      <main className="containers relative">
        <div className="mb-5 mt-0 xs:mt-7 flex">
          <Link
            to="/produk-kemasan"
            className="flex items-center mb-3"
          >
            <HiOutlineArrowSmLeft className="text-2xl mr-3" />
            <span className="leading-10">Kembali</span>
          </Link>
        </div>
        <article
          className="relative mb-10 shadow-gray rounded-2xl pt-8 px-8 pb-9 grid grid-cols-4 2xsm:grid-cols-8 2md:grid-cols-12 gap-x-8"
          key={productData.data?.order_id}
        >
          <div className="lg:col-start-2 col-span-4 2xsm:col-span-8 2md:col-span-12 lg:col-span-4">
            <div className="mb-3 w-11/12 xs:w-3/4 lg:w-full mx-auto">
              <img
                src={`data:image/jpg;base64,${productData.data?.product_image}`}
                alt={productData.data?.altImg}
                className="w-full object-cover object-center"
              />
            </div>
            <p className="text-xs xs:text-base">
              {productData.data?.product_categories?.product_category_name}
            </p>
            <p className="font-bold text-base xs:text-xl md:text-2xl mb-3 line-clamp-2">
              {productData.data?.product_description}
            </p>
          </div>

          <div className="lg:col-start-7 col-span-4 2xsm:col-span-8 2md:col-span-12 lg:col-span-5">
            {/* just view */}
            {formProduct(productData.data?.product_category)}
          </div>
        </article>
        <FormPesan
          productId={productData.data.product_id}
          formFields={productData.formData}
        />
      </main>
    </>
  );
};

export default PesanSekarang;
