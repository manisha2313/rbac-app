import axios from "axios";

// create an axios instance with base url from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//request interceptor to add token to headers if it exists in local storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor redirects unauthorized requests, except failed login attempts
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config?.url !== "/api/auth/login"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
