import React from "react";
import { NavLink } from "react-router-dom";
import { BsPencilSquare, BsPersonSquare } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiBookReadFill, RiStickyNoteFill } from "react-icons/ri";

const Sidebar = (props) => {
  return (
    <>
      <nav
        className={`mt-8 flex flex-col gap-3 ${
          props.toggle ? "px-8" : "px-18/sp"
        }`}
      >
        <NavLink
          to="/admin/cs/dashboard/"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? "px-5 py-[14px]" : "p-4 justify-center"
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
          to="/admin/cs/dashboard/status-po"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? "px-5 py-[14px]" : "p-4 justify-center"
          } rounded-lg`}
        >
          <RiBookReadFill className="fill-white text-xl" />
          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Status PO
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/cs/dashboard/retribusi-pelanggan"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? "px-5 py-[14px]" : "p-4 justify-center"
          } rounded-lg`}
        >
          <BsPersonSquare className="fill-white text-xl" />
          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Retribusi Pelanggan
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/cs/dashboard/rekap-pesanan"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? "px-5 py-[14px]" : "p-4 justify-center"
          } rounded-lg`}
        >
          <BsPencilSquare className="fill-white text-xl" />
          {props.toggle && (
            <span className="font-semibold text-white transition-200 truncate">
              Rekap Pesanan
            </span>
          )}
        </NavLink>
        <NavLink
          to="/admin/cs/dashboard/pad"
          className={`sidebar-admin text-15/sp flex items-center gap-6 hover:!bg-orange-600/80 duration-500 transition-200 ${
            props.toggle ? "px-5 py-[14px]" : "p-4 justify-center"
          } rounded-lg`}
        >
          <RiStickyNoteFill className="fill-white text-xl" />
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
