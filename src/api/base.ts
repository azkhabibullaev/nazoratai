import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return config;
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);
