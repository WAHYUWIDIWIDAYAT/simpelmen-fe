import React from 'react';
import { useNavigate } from 'react-router-dom';
import svg from '../../assets/svg';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative pt-7">
        <img
          src={svg.bgHero}
          alt=""
          className="absolute top-12 xs:top-8 -z-10 left-0 right-0 mx-auto"
        />
        <div className="containers !pb-12 xs:!pb-20 md:!pb-100/sp flex flex-wrap md:grid md:grid-cols-12">
          <div className="w-full self-center mb-12 md:mb-0 md:col-span-5">
            <figure className="min-w-[200px] md:min-w-0 w-1/2 md:w-3/4 block mb-4">
              <img
                src={svg.simpelmenLetterLogo}
                alt="simpelmen-letter-logo"
                className="w-full"
              />
            </figure>
            <p className="text-lg xmd:text-3xl !leading-snug">
              Sistem Informasi Pelayanan Manajemen Order Kemasan
            </p>
            <button
              className="button-gradient mt-8"
              onClick={() => navigate('/produk-kemasan')}
            >
              Pesan Sekarang
            </button>
          </div>
          <div className="w-full md:col-span-6 md:col-start-7">
            <img
              src={svg.heroImage}
              alt="woman-with-creditcard"
              className="w-[250px] md:w-full mx-auto mb-5"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
