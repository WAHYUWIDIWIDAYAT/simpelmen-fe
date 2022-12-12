import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const FABWhatsApp = () => {
  const [tooltip, showTooltip] = useState(true);

  const handleChat = () => {
    window.open('https://wa.me/6281288888888', '_blank');
  };

  return (
    <>
      <button
        className="fixed z-50 right-[5%] bottom-8 xs:bottom-12 md:bottom-14 lg:bottom-16 flex items-center justify-center w-12 md:w-16 h-12 md:h-16 rounded-full bg-[#25D366] shadow-gray"
        type="button"
        data-tip="React-tooltip"
        data-for="fab-whatsapp"
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 100);
        }}
        onClick={handleChat}
      >
        <FaWhatsapp className="fill-white text-3xl md:text-4xl" />
      </button>
      {tooltip && (
        <ReactTooltip
          id="fab-whatsapp"
          place="top"
          type="dark"
          effect="solid"
          delayHide={1000}
          className="!bg-dark"
          isCapture={true}
        >
          <span className="text-white bg-dark !text-center">
            Hubungi Customer Service
          </span>
        </ReactTooltip>
      )}
    </>
  );
};

export default FABWhatsApp;
