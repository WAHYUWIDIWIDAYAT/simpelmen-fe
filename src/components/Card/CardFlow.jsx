import React from 'react';

const CardFlow = ({ id, title, img, altImg }) => {
  return (
    <>
      <div className="w-full h-full">
        <div className="relative mb-8">
          <img
            src={img}
            alt={altImg}
            className="w-[205px] h-40 xs:h-[211px] mx-auto"
          />
          <div className="absolute -bottom-3 left-5 flex justify-center items-center w-[50px] h-[50px] md:w-[100px] md:h-[100px] bg-orange-400 rounded-full">
            <p className="text-2xl md:text-6xl font-bold text-center">{id}</p>
          </div>
        </div>
        <p className="font-bold text-sm xs:text-base 2xsm:text-lg text-center">
          {title}
        </p>
      </div>
    </>
  );
};

export default CardFlow;
