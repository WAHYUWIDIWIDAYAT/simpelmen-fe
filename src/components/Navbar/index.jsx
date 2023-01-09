import React, { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import svg from "../../assets/svg";
import "./styles.css";
import { HiChevronDown } from "react-icons/hi";
import NavbarMobile from "./components/NavbarMobile";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full shadow-md bg-white fixed z-10">
      <div className="containers flex items-center justify-between bg-white !py-3 xmd:!py-6">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src={svg.logoSimpelmen}
            alt="simplemen-brand-logo"
            className="block h-10"
          />
        </div>
        <div className="hidden xmd:block">
          <div className="flex justify-end gap-8 items-center">
            <NavLink to="/" className="navlinks transition-200">
              Beranda
            </NavLink>
            <NavLink to="/produk-kemasan" className="navlinks transition-200">
              Produk Kemasan
            </NavLink>
            <NavLink to="/laporan" className="navlinks transition-200">
              Laporan PAD
            </NavLink>
            <NavLink to="/keranjang" className="navlinks transition-200">
              Keranjang
            </NavLink>
            <Link to="/login" className={`ml-4 ${user && "hidden"}`}>
              <button className="button-fill-sm">Masuk</button>
            </Link>
            {user && (
              <Menu as="div" className="relative">
                <Menu.Button>
                  <div className="flex items-center ml-4">
                    <p className="text-15/sp font-semibold mr-2 max-w-[5.625rem] lg:max-w-none truncate">
                      {parseUser.data.user_name}
                    </p>
                    <HiChevronDown className="text-2xl" />
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    as="nav"
                    className="absolute flex flex-col shadow-md top-10 right-0 bg-white rounded-xl border w-40 overflow-hidden"
                  >
                    <Menu.Item as="div">
                      <NavLink
                        to="/dashboard/pesanan"
                        className="navlink-mobile"
                      >
                        Dashboard
                      </NavLink>
                    </Menu.Item>
                    <hr />
                    <Menu.Item as="div">
                      <p
                        onClick={(e) => handleLogout(e)}
                        className="navlink-mobile"
                        aria-label="button"
                      >
                        Logout
                      </p>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>

        <NavbarMobile
          userLog={parseUser}
          handleLogout={(e) => handleLogout(e)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
