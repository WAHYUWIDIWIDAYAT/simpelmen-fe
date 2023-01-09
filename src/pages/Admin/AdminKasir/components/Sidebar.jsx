import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdAnalytics, MdDashboard } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';

const Sidebar = (props) => {
  return (
    <>
      <nav
        className={`mt-8 flex flex-col gap-3 ${
          props.toggle ? 'px-8' : 'px-18/sp'
        }`}
      >
        <NavLink
          to="/admin/kasir/dashboard/"
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
          to="/admin/kasir/dashboard/pembayaran"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <FaMoneyBillWave className="fill-white text-xl" />
          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Pembayaran
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/kasir/dashboard/pad"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? 'px-5 py-[14px]' : 'p-4 justify-center'
          } rounded-lg`}
        >
          <MdAnalytics className="fill-white text-xl" />
          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              PAD
            </span>
          )}
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
