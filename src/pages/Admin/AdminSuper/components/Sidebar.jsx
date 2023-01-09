import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdSettingsInputComponent } from 'react-icons/md';
import { FaUsers, FaBoxOpen } from 'react-icons/fa';
import { IoDocumentAttach } from 'react-icons/io5';

const Sidebar = (props) => {
  return (
    <>
      <nav
        className={`mt-8 flex flex-col gap-3 ${
          props.toggle ? 'px-8' : 'px-18/sp'
        }`}
      >
        <NavLink
          to="/admin/super/dashboard/"
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
        <NavLink
          to="/admin/super/dashboard/anggota"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <FaUsers className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Anggota
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/super/dashboard/produk"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <FaBoxOpen className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Produk
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/super/dashboard/spesifikasi"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <MdSettingsInputComponent className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Spesifikasi
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/super/dashboard/rekap-pesanan"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <IoDocumentAttach className="fill-white text-xl" />

          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Rekap Pesanan
            </span>
          )}
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
