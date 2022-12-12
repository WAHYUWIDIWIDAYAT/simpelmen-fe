import axios from 'axios';

// Products
export const getProducts = axios.create({
  baseURL: "http://localhost:8000/api/products",
  headers: {
    "Content-Type": "application/json",
  },
})

export const userAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = axios.create({
  baseURL: "http://localhost:8000/api/users",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postOrder = axios.create({
  baseURL: "http://localhost:8000/api/order",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSpecification = axios.create({
  baseURL: 'http://localhost:8000/api/product/detail',
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
  baseURL: "http://localhost:8000/api/admin/cs",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminKasir = axios.create({
  baseURL: "http://localhost:8000/api/admin/kasir",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminTU = axios.create({
  baseURL: "http://localhost:8000/api/admin/tu",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminGudang = axios.create({
  baseURL: "http://localhost:8000/api/admin/gudang",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminProduksi = axios.create({
  baseURL: "http://localhost:8000/api/admin/produksi",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminDesain = axios.create({
  baseURL: "http://localhost:8000/api/admin/desain",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const adminSuper = axios.create({
  baseURL: "http://localhost:8000/api/super/admin",
  headers: {
    'Content-Type': 'application/json',
  },
});
export const commonAPI = axios.create({
  baseURL: 'http://localhost:80000.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
