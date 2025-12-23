import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { retrieveRawInitData } from "@tma.js/sdk";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let initDataRaw: string | undefined;
    try {
        initDataRaw = retrieveRawInitData() ?? undefined;
    } catch {
        return config;
    }
    if (!initDataRaw) return config;
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `tma ${initDataRaw}`);
    config.headers = headers;
    return config;
});
