import "./index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { getWebApp } from "@/lib/getWebApp";
import { isTMA } from "@tma.js/bridge";
import { retrieveLaunchParams } from "@tma.js/sdk";
const webApp = getWebApp();
console.log("href:", window.location.href);
console.log("hash:", window.location.hash);
console.log("isTMA(simple):", isTMA());
try {
    const lp = retrieveLaunchParams();
    console.log("launchParams:", lp);
    console.log("initDataRaw starts:", lp.initDataRaw?.slice(0, 40));
} catch (e) {
    console.error("retrieveLaunchParams error:", e);
}
console.log("window.Telegram?.WebApp:", (window as any).Telegram?.WebApp);
console.log("WebApp.initData:", (window as any).Telegram?.WebApp?.initData?.slice?.(0, 40));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Launch eruda and enable SDK debug mode, if debug mode was requested outside.
const debug = webApp.initDataUnsafe.start_param === "debug";
if (debug) {
    import("eruda").then((lib) => lib.default.init());
}

const rootElement = document.getElementById("root") as HTMLElement;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>,
    );
}
