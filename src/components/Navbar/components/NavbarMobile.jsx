import React, { Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { FiMenu } from 'react-icons/fi';

const NavbarMobile = ({ userLog, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="xmd:hidden">
        <Menu
          as="div"
          className="relative flex"
        >
          <Menu.Button>
            <FiMenu
              size={25}
              className="cursor-pointer"
            />
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
              className="absolute flex flex-col shadow-md top-14 border right-0 bg-white rounded-xl min-w-[15rem] max-w-[17rem] overflow-hidden"
            >
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                {userLog && (
                  <>
                    <NavLink
                      to="/dashboard/profil"
                      className="nav-hidden hidden"
                    ></NavLink>
                    <button
                      className="navlink-mobile transition-200 text-left"
                      onClick={() => navigate('/dashboard/profil')}
                    >
                      👋 Hi, <span>{userLog.data.user_name}</span>!
                    </button>
                  </>
                )}
              </Menu.Item>
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                <NavLink
                  to="/"
                  className="nav-hidden hidden"
                ></NavLink>
                <button
                  className={`navlink-mobile transition-200 text-left ${
                    !userLog && '!pt-4'
                  }`}
                  onClick={() => navigate('/')}
                >
                  Beranda
                </button>
              </Menu.Item>
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                <NavLink
                  to="/produk-kemasan"
                  className="nav-hidden hidden"
                ></NavLink>
                <button
                  className="navlink-mobile transition-200 text-left"
                  onClick={() => navigate('/produk-kemasan')}
                >
                  Produk Kemasan
                </button>
              </Menu.Item>
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                <NavLink
                  to="/laporan"
                  className="nav-hidden hidden"
                ></NavLink>
                <button
                  className="navlink-mobile transition-200 text-left"
                  onClick={() => navigate('/laporan')}
                >
                  Laporan PAD
                </button>
              </Menu.Item>
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                <NavLink
                  to="/keranjang"
                  className="nav-hidden hidden"
                ></NavLink>
                <button
                  className="navlink-mobile transition-200 text-left"
                  onClick={() => navigate('/keranjang')}
                >
                  Keranjang
                </button>
              </Menu.Item>
              <hr />
              <Menu.Item
                as="div"
                className="flex w-full"
              >
                {!userLog && (
                  <div className="w-full flex justify-center py-4">
                    <Link to="/login">
                      <button className="button-fill-sm !px-14">Masuk</button>
                    </Link>
                  </div>
                )}
                {userLog && (
                  <div className="flex flex-col w-full">
                    <NavLink
                      to="/dashboard/pesanan"
                      className="navlink-mobile transition-200 !pt-4"
                    >
                      Dashboard
                    </NavLink>
                    <p
                      className="navlink-mobile transition-200 !pb-4"
                      aria-label="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default NavbarMobile;
