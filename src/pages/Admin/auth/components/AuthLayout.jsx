import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import svg from '../../../../assets/svg';

const AuthLayout = ({ images, altImages, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <main className="grid grid-cols-12 h-screen">
        <div className="hidden lg:block !py-[20px] lg:col-span-7 bg-gradient-to-r from-primary-900 to-orange-900 px-[70px]">
          {pathname !== '/admin/login' && (
            <div
              onClick={() => navigate(-1)}
              className="flex items-center mb-3 absolute cursor-pointer"
            >
              <BsArrowLeftShort className="text-2xl mr-3 fill-white" />
              <span className="leading-10 text-white">Kembali</span>
            </div>
          )}
          <div className="h-full flex flex-col items-center justify-center">
            <img
              src={images}
              alt={altImages}
              className="w-[40rem] mb-8"
            />
            <h3 className="text-white text-center mb-2">
              Halaman dashboard admin Simpelmen Oke
            </h3>
            <p className="text-white text-center">
              Ini merupakan halaman dashboard admin yang berfungsi untuk
              mengelola halaman web Simpelmen Oke
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 flex flex-col py-10 px-12 lg:justify-between">
          <div className="images flex items-center gap-5 ml-auto mb-9 2md:mb-4">
            <img
              src={svg.logoSimpelmen}
              alt="simelmenok-home"
              className="h-12 xmd:h-16"
            />
            <img
              src={svg.logoLetterSimppelmenPrimaryDark}
              alt="simpelmenok-letter-primary-dark"
              className="h-12 xmd:h-16"
            />
          </div>
          {pathname !== '/admin/login' && (
            <div
              onClick={() => navigate(-1)}
              className="flex lg:hidden items-center mb-3 cursor-pointer"
            >
              <BsArrowLeftShort className="text-2xl mr-3" />
              <span className="leading-10">Kembali</span>
            </div>
          )}
          {children}
          <p className="text-center text-sm mt-9 2md:mt-4">
            &copy; 2022 BIKDK Provinsi Jawa Tengah. All Rights Reserved.
          </p>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
