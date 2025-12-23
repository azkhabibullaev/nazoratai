import "./index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { init } from "./init";
import { EnvUnsupported } from "./components/env-unsupported";

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
    try {
        const launchParams = retrieveLaunchParams();
        const { tgWebAppPlatform: platform } = launchParams;
        const debug = (launchParams.tgWebAppStartParam || "").includes("debug") || import.meta.env.DEV;
        await init({
            debug,
            eruda: debug && ["ios", "android"].includes(platform),
            mockForMacOS: platform === "macos",
        }).then(() => {
            root.render(
                <StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </StrictMode>,
            );
        });
    } catch {
        root.render(<EnvUnsupported />);
    }
}
