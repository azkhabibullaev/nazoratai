import { create } from "zustand";
import type { MeState } from "./me.types";

export const useMeStore = create<MeState>((set) => ({
	me: undefined,
	setMe: (res) => set({ me: res }),
}));
