import { getInitDataRaw } from "@/lib/telegram";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const initDataRaw = getInitDataRaw();
    alert(`[api] request, ${config.url}, "auth:", ${config.headers?.Authorization}`);
    if (!initDataRaw) return config;
    if (config.headers && "set" in config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `tma ${initDataRaw}`);
    } else {
        config.headers = {
            ...(config.headers ?? {}),
            Authorization: `tma ${initDataRaw}`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
    }
    return config;
});
