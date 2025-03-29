import axios, { InternalAxiosRequestConfig } from "axios";


const API_BASE_URL = 'http://localhost:8080/api1';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      
    },
  });


function addAuthToken(
    config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig {
    const token = localStorage.getItem("token");
    if (token) {
        if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}

axiosInstance.interceptors.request.use(addAuthToken);

export default axiosInstance;