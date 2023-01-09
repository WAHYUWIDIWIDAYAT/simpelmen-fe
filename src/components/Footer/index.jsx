import React from "react";

import svg from "../../assets/svg";

const Footer = () => {
  const iconLink = [
    {
      icon: svg.facebookIcon,
      link: "https://www.facebook.com/",
    },
    {
      icon: svg.twitterIcon,
      link: "https://twitter.com/",
    },
    {
      icon: svg.instagramIcon,
      link: "https://www.instagram.com/",
    },
    {
      icon: svg.youtubeIcon,
      link: "https://www.youtube.com/",
    },
  ];
  return (
    <>
      <footer className='w-full bg-warning'>
        <section className='containers !pt-20 !pb-8'>
          <div className='w-full grid grid-cols-4 2xsm:grid-cols-8 lg:flex lg:justify-between gap-x-4 2xsm:gap-x-12 lg:gap-x-16 gap-y-4 2xsm:gap-y-6 mb-8 pt-8 border-t border-t-orange-900'>
            <div className='col-span-4 2xsm:col-span-8 lg:max-w-[4.5rem]'>
              <img
                src={svg.logoSimpelmen}
                alt="simplemen-brand-logo"
                className="block lg:w-full h-[3rem] lg:h-auto"
              />
            </div>
            <div className="col-span-4">
              <p className="font-bold mb-1 xs:mb-2">
                Balai Industri Kreatif Digital dan Kemasan
              </p>
              <p>
                Jl. Ki Mangunsarkoro No. 10, Karangkidul, Kec. Semarang Tengah,
                Kota Semarang, Jawa Tengah 50241
              </p>
            </div>
            <div className="col-span-4">
              <p className="font-bold mb-1 xs:mb-2">Kontak</p>
              <p>(024) 845-1775</p>
              <p>bikdkprovjateng@gmail.com</p>
            </div>
            <div className="lg:min-w-[300px] col-span-4">
              <p className="font-bold mb-1 xs:mb-2">Jam Kerja</p>
              <p>Senin &#8211; Kamis : 07.00 &#8211; 15.30</p>
              <p>Jum&apos;at : 07.00 &#8211; 14.00</p>
              <p>Sabtu, Minggu, Hari Besar : Tutup</p>
            </div>
          </div>
          <div className="mb-8 flex items-center justify-center gap-x-5">
            {iconLink.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="w-8 h-8 flex items-center justify-center"
              >
                <img src={item.icon} alt="social-media-icon" />
              </a>
            ))}
          </div>
          <p className='text-center text-xs xs:text-sm'>
            &copy; 2022 BIKDK Provinsi Jawa Tengah. All Rights Reserved.
          </p>
        </section>
      </footer>
    </>
  );
};

export default Footer;
