import React from "react";

const ModalConfirm = ({ setToggleConfirm }) => {
  return (
    <>
      <div className="fixed z-10 opacity-50 bg-black top-0 bottom-0 left-0 right-0"></div>
      <div className="bg-white z-[11] text-center absolute right-0 left-0 mx-auto rounded-2xl py-[30px] px-16 w-[300px]">
        <h5>Konfirmasi Desain</h5>
        <p className="mt-[10px]">
          Anda tidak dapat mengubah desain setelah konfirmasi
        </p>
        <div className="buttons flex gap-[10px] mt-5 justify-center">
          <button
            onClick={() => setToggleConfirm(false)}
            className="button-white !px-5 !py-2"
          >
            Kembali
          </button>
          <button className="button-fill-sm !px-5 !py-2">Lanjutkan</button>
        </div>
      </div>
    </>
  );
};

export default ModalConfirm;
