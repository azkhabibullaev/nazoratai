import axios, { type InternalAxiosRequestConfig } from "axios";
import { useSessionStore } from "@/entities/session/model/session.store";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = useSessionStore.getState().accessToken;
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);
