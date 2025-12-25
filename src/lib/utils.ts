import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale = "uz-UZ") {
    const n = Number(amount ?? 0);
    const formatted = new Intl.NumberFormat(locale, {
        style: "decimal",
        maximumFractionDigits: 0,
    }).format(n);
    return formatted;
}
