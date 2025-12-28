import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { BottomNavigation } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { useMeQuery } from "@/entities/session/api/me.query";
import { useVerifyTgTokenQuery } from "@/entities/session/api/verify.query";
import { useSessionStore } from "@/entities/session/model/session.store";
import { api } from "@/shared/api/base";

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

	const accessToken = useSessionStore((s) => s.accessToken);
	const setTgToken = useSessionStore((s) => s.setTgToken);
	const setAccessToken = useSessionStore((s) => s.setAccessToken);
	const hydrateFromStorage = useSessionStore((s) => s.hydrateFromStorage);

	useEffect(() => {
		hydrateFromStorage();
	}, [hydrateFromStorage]);

	useEffect(() => {
		setTgToken(token);
	}, [token, setTgToken]);

	const verify = useVerifyTgTokenQuery(token);

	const freshAccessToken =
		(verify.data?.data?.accessToken as string | undefined) ?? undefined;

	useEffect(() => {
		if (!freshAccessToken) return;

		setAccessToken(freshAccessToken);

		navigate({
			to: "/",
			replace: true,
			search: (prev) => ({
				...(prev as Record<string, unknown>),
				token: undefined,
			}),
		});
	}, [freshAccessToken, navigate, setAccessToken]);

	useMeQuery(Boolean(accessToken));

	return (
		<div className="relative min-h-screen max-w-xl mx-auto px-4 pb-32 mt-20">
			<Header />
			<main>
				<Outlet />
			</main>
			<BottomNavigation />
			<AppDrawer />
		</div>
	);
}
