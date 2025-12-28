import { create } from "zustand";
import type { TPeriod } from "@/entities/reports/reports.types";

type Tab = "expense" | "income";

type ReportsState = {
	period: TPeriod;
	tab: Tab;
	setPeriod: (p: TPeriod) => void;
	setTab: (t: Tab) => void;
};

export const useReportsStore = create<ReportsState>((set) => ({
	period: "today",
	tab: "expense",

	setPeriod: (period) => set({ period }),
	setTab: (tab) => set({ tab }),
}));
