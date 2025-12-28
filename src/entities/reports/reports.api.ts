import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import type { ReportsResponse, TPeriod } from "./reports.types";

export function useReportsQuery(period: TPeriod) {
	return useQuery({
		queryKey: ["reports", period],
		queryFn: async () => {
			const res = await api.get<ReportsResponse>(
				"/transaction/getReport",
				{
					params: { reportDuration: period },
				},
			);
			return res.data;
		},
		placeholderData: (prev) => prev,
	});
}
