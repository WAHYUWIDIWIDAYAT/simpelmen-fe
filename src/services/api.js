import axios from 'axios';

export const userAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminAuth = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postOrder = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}order`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSpecification = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}product/detail`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postProduct = axios.create({
  baseURL: 'httpss://hookb.in/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminCS = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/cs`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminKasir = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/kasir`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminTU = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/tu`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminGudang = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/gudang`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminProduksi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/produksi`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminDesain = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}admin/desain`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminSuper = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/super/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const commonAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
