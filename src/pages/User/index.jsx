import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import svg from '../../assets/svg';
import './styles.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LacakPesanan from './LacakPesanan';
import Pembayaran from './Pembayaran';
import Pesanan from './Pesanan';
import Profile from './Profile';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi';
import DetailPesanan from './DetailPesanan';
import BottomNavigation from './components/BottomNavigation';

const Dashboard = () => {
  const [toggle, setToggle] = useState(true);
  const { pathname } = useLocation();
  const [content, setContent] = useState();
  const { pesananId } = useParams();

  useEffect(() => {
    switch (pathname.split('/')[2]) {
      case 'pesanan':
        return setContent(<Pesanan />);
      case 'detail':
        return setContent(<DetailPesanan />);
      case 'pembayaran':
        return setContent(<Pembayaran />);
      case 'lacak-pesanan':
        return setContent(<LacakPesanan />);
      case 'profil':
        return setContent(<Profile />);
      default:
        break;
    }
  }, [pathname, pesananId]);

  return (
    <>
      <div className="min-h-screen relative top-0 h-screen overflow-auto">
        {/* sidebar */}
        <div className="relative hidden sm:block">
          <div className="fixed rounded-tr-2xl rounded-br-2xl shadow-red left-0 inset-y-0 z-10 bg-white">
            <div
              className={`flex flex-col overflow-y-auto overflow-x-hidden h-full whitespace-nowrap justify-between transition-all duration-500 ${
                toggle ? 'w-72' : 'w-[86px]'
              }`}
            >
              <div className="mb-16">
                <div className="mt-10 mb-9">
                  <Link
                    className="h-[58px] flex items-center justify-center"
                    to="/"
                  >
                    <img
                      src={svg.LogoDashboardUser}
                      alt="simpelmenok"
                      className="mx-auto px-3"
                    />
                  </Link>
                </div>
                {/* Sidebar */}
                <Sidebar toggle={toggle} />
              </div>

              <div className={`px-6 mb-8`}>
                <img
                  src={svg.swingChart}
                  alt="swing-chart"
                  className="w-full block"
                />
              </div>
            </div>

            {/* Toggle */}
            <div
              className="bg-white shadow-red flex justify-center items-center absolute w-[20px] h-[20px] top-[55px] -right-[10px] rounded-full cursor-pointer z-20"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <BiChevronsLeft /> : <BiChevronsRight />}
            </div>
          </div>
        </div>

        {/* main content */}
        <div
          className={`relative top-0 float-right h-screen duration-500 min-h-full  ${
            toggle ? 'maximize-main' : 'minimize-main'
          }`}
        >
          <div className="py-10 px-6 xs:px-9 pt-8 sm:pt-[53px]">
            {/* Navbar Top */}
            <Navbar />
            {/* Main Content */}
            <main className="mt-6 sm:mt-6 min-h-screen mb-20 sm:mb-0">
              {content}
            </main>
          </div>
        </div>

        {/* bottom navigation */}
        <div className="fixed inset-x-0 bottom-0 block sm:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
