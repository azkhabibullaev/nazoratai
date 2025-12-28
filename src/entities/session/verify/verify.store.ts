import { create } from "zustand";
import type { VerifyState } from "./verify.types";

export const useVerifyStore = create<VerifyState>((set) => ({
	accessToken: undefined,
	tgToken: undefined,

	setTgToken: (tgToken) => set({ tgToken }),

	setAccessToken: (accessToken) => {
		if (accessToken) localStorage.setItem("accessToken", accessToken);
		set({ accessToken });
	},

	hydrateFromStorage: () => {
		const stored = localStorage.getItem("accessToken") ?? undefined;
		set({ accessToken: stored });
	},

	clear: () => {
		localStorage.removeItem("accessToken");
		set({ accessToken: undefined, tgToken: undefined });
	},
}));
