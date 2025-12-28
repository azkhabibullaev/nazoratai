import { create } from "zustand";

export type MeData = {
	chatId: number;
	telegramId: number;
	phone: string;
	fullName: string;
	language: "UZ" | "RU" | "EN";
};

export type MeResponse = {
	data: MeData;
};

type SessionState = {
	accessToken?: string;
	tgToken?: string;
	me?: MeData;

	setTgToken: (token?: string) => void;
	setAccessToken: (token?: string) => void;
	setMe: (res?: MeResponse) => void;
	hydrateFromStorage: () => void;
	clear: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
	accessToken: undefined,
	tgToken: undefined,
	me: undefined,

	setTgToken: (tgToken) => set({ tgToken }),

	setAccessToken: (accessToken) => {
		if (accessToken) localStorage.setItem("accessToken", accessToken);
		set({ accessToken });
	},

	setMe: (res) => set({ me: res?.data }),

	hydrateFromStorage: () => {
		const stored = localStorage.getItem("accessToken") ?? undefined;
		set({ accessToken: stored });
	},

	clear: () => {
		localStorage.removeItem("accessToken");
		set({ accessToken: undefined, tgToken: undefined });
	},
}));
