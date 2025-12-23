import { retrieveLaunchParams } from "@tma.js/sdk";
import { isTMA } from "@tma.js/bridge";

let cachedInitDataRaw: string | undefined;

export function getInitDataRaw(): string | undefined {
    if (cachedInitDataRaw) return cachedInitDataRaw;
    if (!isTMA()) return undefined;
    const { initDataRaw } = retrieveLaunchParams();
    if (typeof initDataRaw === "string" && initDataRaw.length > 0) {
        cachedInitDataRaw = initDataRaw;
        return initDataRaw;
    }
    return undefined;
}

// queryKey uzun bo‘lib ketmasin desangiz, initDataRaw ichidan "hash"ni ajratib oling
export function getInitDataHash(initDataRaw: string): string {
    const p = new URLSearchParams(initDataRaw);
    return p.get("hash") || "no-hash";
}
