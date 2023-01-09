const dummySize = [
  {
    id: 1,
    p: 10,
    l: 12,
  },
  {
    id: 2,
    p: 10,
    l: 15,
  },
  {
    id: 3,
    p: 12,
    l: 20,
  },
  {
    id: 4,
    p: 13,
    l: 20,
  },
  {
    id: 5,
    p: 14,
    l: 20,
  },
  {
    id: 6,
    p: 15,
    l: 22,
  },
  {
    id: 7,
    p: 16,
    l: 24,
  },
  {
    id: 8,
    p: 18,
    l: 26,
  },
  {
    id: 9,
    p: 20,
    l: 30,
  },
];

const dummyLamination = ['Laminasi Glossy', 'Laminasi Doff', 'Tanpa Laminasi'];

const dummyDesign = [
  {
    value: 'lama',
    desc: 'Lama (Diambil dari data pesanan file pesanan sebelumnya)',
  },
  { value: 'baru', desc: 'Baru (Dibuatkan oleh desainer BIKDK)' },
  { value: 'swadesign', desc: 'Swadesign (File desain dari konsumen)' },
  {
    value: 'redesign',
    desc: 'Re-design (Desain ulang dari pesanan sebelumnya)',
  },
];

const dummySpecification = [];

for (let i = 0; i < dummySize.length; i++) {
  for (let j = 0; j < dummyLamination.length; j++) {
    dummySpecification.push({
      size: dummySize[i],
      lamination: dummyLamination[j],
    });
  }
}

const dummyBentuk = ['Bulat', 'Oval', 'Kotak', 'Custom'];

const dummyData = {
  dummySize,
  dummyLamination,
  dummyDesign,
  dummySpecification,
  dummyBentuk,
};

export default dummyData;
