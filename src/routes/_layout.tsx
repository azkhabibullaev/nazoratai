import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { BottomNavigation } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { useMeQuery } from "@/entities/session/me/me.query";
import { useVerifyTgTokenQuery } from "@/entities/session/verify/verify.query";

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

	const verify = useVerifyTgTokenQuery(token);
	// const accessToken = useVerifyStore((s) => s.accessToken);
	const accessToken =
		typeof window !== "undefined"
			? localStorage.getItem("accessToken")
			: null;
	useMeQuery(accessToken);

	useEffect(() => {
		if (!token) return;
		if (!verify.isSuccess) return;
		navigate({
			to: "/",
			replace: true,
			search: (prev) => ({
				...(prev as Record<string, unknown>),
				token: undefined,
			}),
		});
	}, [token, verify.isSuccess, navigate]);

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
