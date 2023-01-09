import React from 'react';

const CardWhyUs = ({ title, desc, img, altImg }) => {
  return (
    <>
      <div className="w-full h-full bg-white rounded-2xl p-8 xs:p-9 flex flex-col shadow-red items-center hover:scale-[1.03] transition-all-200">
        <figure className="w-full mb-8">
          <img
            src={img}
            alt={altImg}
            className="w-4/5 xs:w-auto min-h-[7.5rem] h-auto xs:h-64 mx-auto"
          />
        </figure>
        <p className="font-bold mb-3 text-lg text-center">{title}</p>
        <p className="text-center text-secondary-900">{desc}</p>
      </div>
    </>
  );
};

export default CardWhyUs;
