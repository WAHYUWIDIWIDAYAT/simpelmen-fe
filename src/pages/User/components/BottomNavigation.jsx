import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import { IoIosWallet } from 'react-icons/io';

const BottomNavigation = () => {
  return (
    <>
      <nav
        id="bottomNav"
        className="w-full shadow-[0px_-4px_12px_0px_#00000014] px-18/sp bg-white"
      >
        <div className="flex items-center justify-between">
          <NavLink
            to="/dashboard/pesanan"
            className="flex flex-col px-[14px] pb-3 pt-2 items-center border-t-4 border-transparent rounded-sm"
          >
            <span className="block p-[10px]">
              <GiBookshelf className="text-2xl fill-secondary-800 transition-200" />
            </span>
            <span className="font-semibold text-secondary-800 transition-200 truncate text-xs">
              Pesanan
            </span>
          </NavLink>
          <NavLink
            to="/dashboard/pembayaran"
            className="flex flex-col px-[14px] pb-3 pt-2 items-center border-t-4 border-transparent rounded-sm"
          >
            <span className="block p-[10px]">
              <IoIosWallet className="text-2xl fill-secondary-800 transition-200" />
            </span>
            <span className="font-semibold text-secondary-800 transition-200 truncate text-xs">
              Pembayaran
            </span>
          </NavLink>
          <NavLink
            to="/dashboard/lacak-pesanan"
            className="flex flex-col px-[14px] pb-3 pt-2 items-center border-t-4 border-transparent rounded-sm"
          >
            <span className="block p-[10px]">
              <MdLocalShipping className="text-2xl fill-secondary-800 transition-200" />
            </span>
            <span className="font-semibold text-secondary-800 transition-200 truncate text-xs">
              Lacak
            </span>
          </NavLink>
          <NavLink
            to="/dashboard/profil"
            className="flex flex-col px-[14px] pb-3 pt-2 items-center border-t-4 border-transparent rounded-sm"
          >
            <span className="block p-[10px]">
              <BsFillPersonFill className="text-2xl fill-secondary-800 transition-200" />
            </span>
            <span className="font-semibold text-secondary-800 transition-200 truncate text-xs">
              Profil
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
