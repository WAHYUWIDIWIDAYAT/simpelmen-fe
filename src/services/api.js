import axios from "axios";

// Products
// export const getProducts = axios.create({
//   baseURL: "https://simpelmen.herokuapp.com/api/products",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const userAuth = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminAuth = axios.create({
  baseURL: "https://hookb.in/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postProduct = axios.create({
  baseURL: "https://hookb.in/",
  headers: {
    "Content-Type": "application/json",
  },
});
