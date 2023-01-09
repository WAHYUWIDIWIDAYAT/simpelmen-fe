import React from 'react';
import svg from '../../assets/svg';
import CardWhyUs from '../../components/Card/CardWhyUs';

const WhyUs = () => {
  const whyUsData = [
    {
      id: 1,
      img: svg.savingMoney,
      altImg: 'saving-money',
      title: 'Harga Terjangkau',
      desc: 'Menghadirkan kualitas terbaik dengan harga terjangkau untuk industri kecil menengah.',
    },
    {
      id: 2,
      img: svg.quantity,
      altImg: 'sorting-gift',
      title: 'Minimal Kuantitas Order Rendah',
      desc: 'Dengan minimal pembelian 200 pcs, order Anda akan kami proses.',
    },
    {
      id: 3,
      img: svg.productQuality,
      altImg: 'good-product-quality',
      title: 'Material Terbaik',
      desc: ' Bahan berkualitas, aman untuk digunakan, memberikan proteksi maksimal.',
    },
  ];

  return (
    <>
      <section className="containers-sm grid grid-systems gap-8">
        {whyUsData.map((item) => (
          <article
            className="col-span-8 2md:col-span-12 lg:col-span-4"
            key={item.id}
          >
            <CardWhyUs {...item} />
          </article>
        ))}
      </section>
    </>
  );
};

export default WhyUs;
