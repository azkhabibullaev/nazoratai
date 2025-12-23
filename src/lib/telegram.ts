import { retrieveLaunchParams } from "@tma.js/sdk";
import { isTMA } from "@tma.js/bridge";

let cached: string | undefined = undefined;

export function getInitDataRaw(): string | undefined {
    if (cached) return cached;
    if (!isTMA()) return undefined;
    const { initDataRaw } = retrieveLaunchParams();
    if (initDataRaw) cached = initDataRaw;
    return initDataRaw;
}

// queryKey uzun bo‘lib ketmasin desangiz, initDataRaw ichidan "hash"ni ajratib oling
export function getInitDataHash(initDataRaw: string): string {
    const p = new URLSearchParams(initDataRaw);
    return p.get("hash") || "no-hash";
}
