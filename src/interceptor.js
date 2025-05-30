import axios from "axios";
import { isEmpty } from "lodash";
import { useAuthStore } from "./stores/auth.store";

const headersReg = {
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  "Content-Type": "application/json",
  Authorization: "",
  Accept: "*/*",
  "Accept-Language": "id",
};

const axiosInstance = axios.create({
  // baseURL: `${service.API}`,
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: headersReg,
});

const requestInterceptor = (config) => {
  return config;
};

const responseInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  if (axios.isCancel(error)) {
    return;
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
axiosInstance.interceptors.request.use(requestInterceptor);

export default axiosInstance;
