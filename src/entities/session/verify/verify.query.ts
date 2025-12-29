import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/base";

export function useVerifyTgTokenQuery(token?: string) {

  return useQuery({
    queryKey: ["tg-verify", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await publicApi.get(`/users/getToken/${token}`);
      return response.data;
    },
  });
}
