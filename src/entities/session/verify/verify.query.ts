import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/base";
import { useVerifyStore } from "./verify.store";

export function useVerifyTgTokenQuery(token?: string) {
  const setAccessToken = useVerifyStore((s) => s.setAccessToken);
  return useQuery({
    queryKey: ["tg-verify", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await publicApi.get(`/users/getToken/${token}`);
      const accessToken = response.data?.data?.accessToken;
      if (accessToken) setAccessToken(accessToken);
      return response.data;
    },
  });
}
