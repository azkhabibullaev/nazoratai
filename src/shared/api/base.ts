import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useVerifyStore } from "@/entities/session/verify/verify.store";

export const publicApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = useVerifyStore.getState().accessToken;
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		const status = error.response?.status;
		if (status === 401) {
			const store = useVerifyStore.getState();
			store.clear();
			store.setNeedsReauth(true);
		}
		return Promise.reject(error);
	},
);
