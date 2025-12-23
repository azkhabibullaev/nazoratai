import "./index.css";

import eruda from "eruda";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { isTMA } from "@tma.js/bridge";
import { retrieveLaunchParams } from "@tma.js/sdk";

type TelegramWindow = Window & {
    Telegram?: {
        WebApp?: {
            initData?: string;
            initDataRaw?: string;
            start_param?: string;
        };
    };
};

console.log("href:", window.location.href);
console.log("hash:", window.location.hash);
console.log("isTMA(simple):", isTMA());
try {
    const { initDataRaw } = retrieveLaunchParams();
    console.log("initDataRaw starts:", initDataRaw);
} catch (e) {
    console.error("retrieveLaunchParams error:", e);
}
console.log("window.Telegram?.WebApp:", (window as TelegramWindow).Telegram?.WebApp);
console.log("WebApp.initData:", (window as TelegramWindow).Telegram?.WebApp?.initData?.slice?.(0, 40));

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
