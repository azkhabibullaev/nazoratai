import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { useSessionStore } from "../model/session.store";

export function useMeQuery(enabled: boolean) {
	const setMe = useSessionStore((s) => s.setMe);
	return useQuery({
		queryKey: ["tg-user"],
		enabled,
		queryFn: async () => {
			const response = await api.get("/users/getMe");
			const data = response.data;
			setMe(data);
			return data;
		},
	});
}
