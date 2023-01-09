import React from 'react';
import { useNavigate } from 'react-router-dom';

const PAD = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="mb-28">
        <div className="containers-sm">
          <h3 className="text-center mb-12 md:mb-14">
            Laporan Pendapatan Asli Daerah
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto bg-white w-full mb-4">
              <thead className="bg-[#F29A41]">
                <tr>
                  <th className="text-white py-2 w-[7%] min-w-[40px] align-middle text-center">
                    No
                  </th>
                  <th className="text-white py-2 w-[43%] min-w-[280px] align-middle text-center">
                    No. Pesanan
                  </th>
                  <th className="text-white py-2 w-[20%] min-w-[160px] align-middle text-left">
                    Nama IKM
                  </th>
                  <th className="text-white py-2 w-[30%] min-w-[240px] align-middle text-center">
                    Jumlah Total Retribusi
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-orange-100"
                  >
                    <td className="py-[10px] text-center">{item}</td>
                    <td className="py-[10px] text-center">
                      001/BIKDK/O/VII/2022
                    </td>
                    <td className="py-[10px]">Ikha Catering</td>
                    <td className="py-[10px] text-center">Rp215.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="button-fill"
              onClick={() => navigate('/laporan')}
              type="button"
            >
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PAD;
