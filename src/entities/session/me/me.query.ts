import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { useMeStore } from "./me.store";

export function useMeQuery(accessToken?: string | null) {
	const setMe = useMeStore((s) => s.setMe);
	return useQuery({
		queryKey: ["tg-user"],
		enabled: Boolean(accessToken),
		queryFn: async () => {
			const response = await api.get("/users/getMe");
			const data = response.data?.data;
			setMe(data);
			return response.data;
		},
	});
}
