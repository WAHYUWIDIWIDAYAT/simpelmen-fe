import React, { useEffect, useState } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import svg from '../../../assets/svg';
import Dashboard from './Dashboard';
import Retribusi from './Retribusi';
import Status from './Status';
import Rekap from './Rekap';
import PAD from './PAD';
import Profil from './Profil';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import DetailRetribusi from './DetailRetribusi';
import '../styles.css';

const AdminCS = () => {
  const [toggle, setToggle] = useState(true);
  const { pathname } = useLocation();
  const [content, setContent] = useState();
  const { retribusiId } = useParams();

  const adminRole = localStorage.getItem('admin');
  console.log(retribusiId);
  const navigate = useNavigate();
  useEffect(() => {
    if (parseInt(adminRole) !== 1) navigate('/admin/login');
  }, [adminRole, navigate]);

  useEffect(() => {
    switch (pathname.split('/')[4]) {
      case '':
        return setContent(<Dashboard />);
      case 'retribusi-pelanggan':
        return setContent(<Retribusi />);
      case 'detail-retribusi-pelanggan':
        return setContent(<DetailRetribusi />);
      case 'status-po':
        return setContent(<Status />);
      case 'rekap-pesanan':
        return setContent(<Rekap />);
      case 'pad':
        return setContent(<PAD />);
      // case "profil":
      //   return setContent(<Profil />);
      default:
        break;
    }
  }, [pathname, retribusiId]);

  return (
    <>
      <div className="min-h-screen relative top-0 h-screen overflow-y-auto overflow-x-hidden md:overflow-x-auto">
        {/* sidebar */}
        <div className="relative">
          <div className="fixed rounded-tr-2xl rounded-br-2xl shadow-red left-0 inset-y-0 z-10 bg-orange-900">
            <div
              className={`flex flex-col overflow-y-auto overflow-x-hidden h-full whitespace-nowrap justify-between transition-all duration-500 ${
                toggle ? 'w-[15rem] md:w-72' : 'w-[88px]'
              }`}
            >
              <div className="mb-16 mt-10">
                <img
                  src={svg.simpelmenLetterLogo}
                  alt="simpelmenok"
                  className="mx-auto px-18/sp h-16"
                />
                {/* Sidebar */}
                <Sidebar toggle={toggle} />
              </div>
            </div>
            <div
              className="bg-orange-900 cursor-pointer border-white border-2 flex justify-center items-center absolute w-[20px] h-[20px] top-16 -right-[10px] rounded-full"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <BiChevronsLeft /> : <BiChevronsRight />}
            </div>
          </div>
        </div>

        {/* main content */}
        <div
          className={`relative top-0 float-right h-screen duration-500 min-h-full  ${
            toggle ? 'maximize-admin-main' : 'minimize-admin-main'
          }`}
        >
          <div className="pb-6 px-6 xs:px-9 pt-8 sm:pt-12">
            {/* Navbar Top */}
            <Navbar />
            {/* Main Content */}
            <main className="mt-6 min-h-screen mb-16">{content}</main>
            {/* footer */}
            <div className="copyright mt-10 flex items-center justify-end gap-4">
              <p>
                &copy; 2022 BIKDK Provinsi Jawa Tengah. All Rights Reserved.
              </p>
              <div className="icons flex gap-2">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1877F2] p-2 rounded-full"
                >
                  <FaFacebook fill="#FFFFFF" />
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1DA1F2] p-2 rounded-full"
                >
                  <FaTwitter fill="#FFFFFF" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#F00073] p-2 rounded-full"
                >
                  <FaInstagram fill="#FFFFFF" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#C9111B] p-2 rounded-full"
                >
                  <FaYoutube fill="#FFFFFF" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCS;
