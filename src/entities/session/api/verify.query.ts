import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";

export function useVerifyTgTokenQuery(token?: string) {
	return useQuery({
		queryKey: ["tg-verify", token],
		enabled: Boolean(token),
		queryFn: async () => {
			const res = await api.get(`/users/getToken/${token}`);
			return res.data;
		},
	});
}
