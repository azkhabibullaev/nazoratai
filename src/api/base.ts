import { getInitDataRaw } from "@/lib/telegram";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const initDataRaw = getInitDataRaw();
    if (initDataRaw) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `tma ${initDataRaw}`;
    }
    return config;
});
