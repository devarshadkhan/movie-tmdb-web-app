import axios from "axios";
import { useLoader } from "../contextApp/LoaderContext";
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {

    // Retrieve the token from localStorage
  const token = import.meta.env.VITE_API_TOKEN;

  // Add the token to the request headers All API security not directly not access browser API.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
