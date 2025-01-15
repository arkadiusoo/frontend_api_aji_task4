import axios from "axios";

// axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// JWT token handling
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // set token in request header
  }
  return config;
});

// API functions

// products
// for all users
export const getProducts = () => apiClient.get("/products");
export const getProduct = (id) => apiClient.get(`/products/${id}`);
export const getSeoDescription = (id) =>
  apiClient.get(`/products/${id}/seo-description`);
// only for workers
export const createProduct = (productData) =>
  apiClient.post("/products", productData);
export const updateProduct = (id, productData) =>
  apiClient.put(`/products/${id}`, productData);
export const initializeProducts = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.post("/products/init", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// routes
export const getStatues = () => apiClient.get("/status");

// orders
// only for workers
export const fetchAllOrders = () => apiClient.get("/orders");
export const fetchOrdersByUsername = (username) =>
  apiClient.get(`/orders/user/${username}`);
export const fetchOrderById = (id) => apiClient.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  apiClient.patch(`/orders/${id}/status`, { status });
export const fetchOrderStatus = (id) => apiClient.get(`/orders/${id}/status`);
export const fetchOrdersByStatus = (status) =>
  apiClient.get(`/orders/status/${status}`);
// only for clients
export const createOrder = (orderData) => apiClient.post("/orders", orderData);

// opinion
export const addOpinion = (orderId, opinionData) =>
  apiClient.post(`/orders/${orderId}/opinions`, opinionData);

// category
export const fetchCategories = () => apiClient.get("/categories");

// auth
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);
export const refreshToken = (refreshTokenData) =>
  apiClient.post("/auth/refresh", refreshTokenData);

export {
  getProducts,
  getProduct,
  getSeoDescription,
  createProduct,
  updateProduct,
  initializeProducts,
  getStatues,
  fetchAllOrders,
  fetchOrdersByUsername,
  fetchOrderById,
  updateOrderStatus,
  fetchOrderStatus,
  fetchOrdersByStatus,
  createOrder,
  addOpinion,
  fetchCategories,
  login,
  refreshToken,
};
