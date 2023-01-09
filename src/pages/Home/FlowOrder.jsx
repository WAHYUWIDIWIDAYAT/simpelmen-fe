import React from 'react';
import svg from '../../assets/svg';
import CardFlow from '../../components/Card/CardFlow';

const FlowOrder = () => {
  const flowOrderData = [
    {
      id: 1,
      title: 'Pilih Produk dan Spesifikasi',
      img: svg.flowOrder1,
      altImg: 'pilih-produk-dan-spesifikasi',
    },
    {
      id: 2,
      title: 'Masukkan Keranjang',
      img: svg.flowOrder2,
      altImg: 'masukkan-keranjang',
    },
    {
      id: 3,
      title: 'Pesan',
      img: svg.flowOrder3,
      altImg: 'pesan',
    },
    {
      id: 4,
      title: 'Persetujuan Pesanan',
      img: svg.flowOrder4,
      altImg: 'persetujuan-pesanan',
    },
    {
      id: 5,
      title: 'Pembayaran',
      img: svg.flowOrder5,
      altImg: 'pembayaran',
    },
    {
      id: 6,
      title: 'Desain',
      img: svg.flowOrder6,
      altImg: 'desain',
    },
    {
      id: 7,
      title: 'Produksi',
      img: svg.flowOrder7,
      altImg: 'produksi',
    },
    {
      id: 8,
      title: 'Pengiriman',
      img: svg.flowOrder8,
      altImg: 'pengiriman',
    },
  ];
  return (
    <>
      <section className="containers-sm">
        <p className="text-3xl text-orange-900 font-bold text-center mb-12 md:mb-14">
          Alur Pemesanan
        </p>
        <div className="grid grid-systems gap-x-6 xs:gap-x-8 gap-y-6 xs:gap-y-9">
          {flowOrderData.map((item) => (
            <div
              className="col-span-2 2xsm:col-span-4 2md:col-span-3"
              key={item.id}
            >
              <CardFlow {...item} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FlowOrder;
