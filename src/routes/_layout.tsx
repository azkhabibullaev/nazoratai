import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { BottomNavigation } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { useVerifyTgTokenQuery } from "@/entities/session/verify/verify.query";
import { useMeQuery } from "@/entities/session/me/me.query";
import { useEffect } from "react";
import { useVerifyStore } from "@/entities/session/verify/verify.store";

export const Route = createFileRoute("/_layout")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: typeof search.token === "string" ? search.token : undefined,
    };
  },
  component: Layout,
});

function Layout() {
  const { token } = Route.useSearch();
  const navigate = Route.useNavigate();
  const setAccessToken = useVerifyStore((s) => s.setAccessToken);

  const verify = useVerifyTgTokenQuery(token);
  const userMe = useMeQuery();

  useEffect(() => {
	if (!token) return;
	if (!verify.isSuccess) return
	const accessToken = verify.data?.data?.accessToken
	if (accessToken) setAccessToken(accessToken)
	navigate({
		to: "/",
		replace: true,
		search: (prev) => ({
			...(prev as Record<string, unknown>),
			token: undefined,
		}),
	});
  }, [navigate]);

  return (
    <div className="relative min-h-screen max-w-xl mx-auto px-4 pb-32 mt-20">
      <Header />
      <main>
        <pre>{JSON.stringify(verify.data, null, 2)}</pre>
        <pre>{JSON.stringify(userMe.data, null, 2)}</pre>
        <Outlet />
      </main>
      <BottomNavigation />
      <AppDrawer />
    </div>
  );
}
