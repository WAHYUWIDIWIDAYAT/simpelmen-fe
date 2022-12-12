import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPermMedia } from 'react-icons/md';

const Sidebar = (props) => {
  return (
    <>
      <nav
        className={`mt-8 flex flex-col gap-3 ${
          props.toggle ? 'px-8' : 'px-18/sp'
        }`}
      >
        <NavLink
          to="/admin/desain/dashboard/"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <MdDashboard className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Dashboard
            </span>
          )}
        </NavLink>
        {/* <NavLink
          to="/admin/desain/dashboard/riwayat-chat"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <BsChatSquareDotsFill className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Riwayat Chat
            </span>
          )}
        </NavLink> */}
        <NavLink
          to="/admin/desain/dashboard/konfirmasi-desain"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <MdPermMedia className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Konfirmasi Desain
            </span>
          )}
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
