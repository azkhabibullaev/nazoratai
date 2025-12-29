import axios, { type InternalAxiosRequestConfig } from "axios";

export const publicApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => Promise.reject(error),
);
