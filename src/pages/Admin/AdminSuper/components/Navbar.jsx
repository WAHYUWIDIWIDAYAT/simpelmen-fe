import { HiChevronDown } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Navbar = () => {
  const user = localStorage.getItem("admin");
  const parseUser = JSON.parse(user);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("admin");
    navigate("/");
  };
  return (
    <>
      <nav>
        <Menu as="div" className="relative flex justify-end">
          <Menu.Button>
            <div className="flex items-center ">
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
              className="absolute z-10 flex flex-col shadow-md top-10 right-0 bg-white rounded-xl border w-40 overflow-hidden"
            >
              <Menu.Item as="div">
                <NavLink to="/" className="navlink-mobile">
                  Beranda
                </NavLink>
              </Menu.Item>
              <Menu.Item as="div">
                <NavLink
                  to="/admin/super/dashboard/profil"
                  className="navlink-mobile"
                >
                  Profil
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
    </>
  );
};

export default Navbar;
