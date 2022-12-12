import { HiChevronDown } from "react-icons/hi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import svg from "../../../assets/svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = localStorage.getItem("user");

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const capitalizeFirstLetter = (str) => {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  return (
    <>
      <nav className="flex justify-between items-center pb-5 sm:pb-4 border-b border-transparent sm:border-primary-600">
        <p className="text-[18px] font-semibold mr-8 hidden sm:block">
          Dashboard
        </p>
        <img
          src={svg.LogoDashboardUser}
          alt="logo-dashboard-user"
          className="block sm:hidden w-100/sp"
        />
        <Menu as="div" className="relative">
          <Menu.Button>
            <div className="flex items-center ml-4">
              <p className="text-15/sp font-semibold mr-2 max-w-[5.625rem] lg:max-w-none truncate">
                {JSON.parse(user).data.user_name}
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
              className="absolute flex flex-col shadow-md top-10 right-0 bg-white rounded-xl border w-40 overflow-hidden z-50"
            >
              <Menu.Item as="div">
                <NavLink to="/" className="navlink-mobile">
                  Beranda
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
      </nav>
      <p className="text-2xl font-bold block sm:hidden">
        {capitalizeFirstLetter(pathname.split("/")[2].replace("-", " "))}
      </p>
    </>
  );
};

export default Navbar;
