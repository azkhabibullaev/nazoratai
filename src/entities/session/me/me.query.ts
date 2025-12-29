import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { useVerifyStore } from "../verify/verify.store";
import { useMeStore } from "./me.store";

export function useMeQuery() {
  const accessToken = useVerifyStore((s) => s.accessToken);
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
