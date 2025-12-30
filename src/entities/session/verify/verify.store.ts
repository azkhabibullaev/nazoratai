import { create } from "zustand";
import type { VerifyState } from "./verify.types";

export const useVerifyStore = create<VerifyState>((set) => ({
	accessToken: localStorage.getItem("accessToken") ?? undefined,
	setAccessToken: (at) => {
		if (at) localStorage.setItem("accessToken", at);
		set({ accessToken: at });
	},
}));
