import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import { IoIosWallet } from 'react-icons/io';
const Sidebar = (props) => {
  return (
    <>
      <nav
        className={`mb-8 flex flex-col gap-9 ${
          props.toggle ? 'px-6 xs:px-10' : 'px-6'
        }`}
      >
        <NavLink
          to="/dashboard/pesanan"
          className={`flex items-center ${
            props.toggle ? 'gap-4' : 'gap-0 justify-center'
          } duration-500 transition-200 sidebar-nav`}
        >
          <GiBookshelf className="text-2xl fill-secondary-800 transition-200" />
          <span className="font-semibold text-secondary-800 transition-200 truncate">
            {props.toggle ? 'Pesanan' : ''}
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/pembayaran"
          className={`flex items-center ${
            props.toggle ? 'gap-5' : 'gap-0 justify-center'
          } duration-500 transition-200 sidebar-nav`}
        >
          <IoIosWallet className="text-2xl fill-secondary-800 transition-200" />
          <span className="font-semibold text-secondary-800 transition-200 truncate">
            {props.toggle ? 'Status Pesanan' : ''}
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/lacak-pesanan"
          className={`flex items-center ${
            props.toggle ? 'gap-5' : 'gap-0 justify-center'
          } duration-500 transition-200 sidebar-nav`}
        >
          <MdLocalShipping className="text-2xl fill-secondary-800 transition-200" />
          <span className="font-semibold text-secondary-800 transition-200 truncate">
            {props.toggle ? 'Lacak Pesanan' : ''}
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/profil"
          className={`flex items-center ${
            props.toggle ? 'gap-5' : 'gap-0 justify-center'
          } duration-500 transition-200 sidebar-nav`}
        >
          <BsFillPersonFill className="text-2xl fill-secondary-800 transition-200" />
          <span className="font-semibold text-secondary-800 transition-200 truncate">
            {props.toggle ? 'Profil Saya' : ''}
          </span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
