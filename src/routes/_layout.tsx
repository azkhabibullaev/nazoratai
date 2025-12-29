import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";
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
	useMeQuery();

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

	useEffect(() => {
		const { browser, cpu, device } = UAParser(
			"Mozilla/5.0 (X11; U; Linux armv7l; en-GB; rv:1.9.2a1pre) Gecko/20090928 Firefox/3.5 Maemo Browser 1.4.1.22 RX-51 N900",
		);
		console.log(browser.name);
		console.log(cpu.is("arm"));
		console.log(device.is("mobile"));
		console.log(device.model);
	}, []);

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
