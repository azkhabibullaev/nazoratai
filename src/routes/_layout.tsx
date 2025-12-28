import { createFileRoute, Outlet } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { BottomNavigation } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { publicApi } from "@/shared/api/base";

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

	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string | undefined>();

	console.log(loading, errorMessage, accessToken, navigate);

	useEffect(() => {
		const controller = new AbortController();
		(async () => {
			setLoading(true);
			setErrorMessage(null);
			try {
				const res = await publicApi.get(`/users/getToken/${token}`, {
					signal: controller.signal,
				});
				setAccessToken(res.data.accessToken);
			} catch (e) {
				if (controller.signal.aborted) return;
				if (axios.isAxiosError(e)) {
					setErrorMessage(e.response?.data?.message ?? e.message);
				} else {
					setErrorMessage("Noma'lum xatolik");
				}
			} finally {
				setLoading(false);
			}
		})();
		return () => controller.abort();
	}, [token]);

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
