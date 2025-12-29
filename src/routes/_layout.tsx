import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { BottomNavigation } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { useEffect, useState } from "react";
import { publicApi } from "@/shared/api/base";
import axios from "axios";

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
  //   const navigate = Route.useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function verifyToken() {
      try {
        const response = await publicApi.get(`/users/getToken/${token}`);
        if (isMounted) {
          setData(response.data?.accessToken);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative min-h-screen max-w-xl mx-auto px-4 pb-32 mt-20">
      <Header />
      <main>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Outlet />
      </main>
      <BottomNavigation />
      <AppDrawer />
    </div>
  );
}
