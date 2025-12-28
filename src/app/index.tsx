import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@/shared/styles/index.css";
import {
	QueryClientProvider,
	RouterProvider,
	ThemeProvider,
} from "./providers";

const rootElement = document.getElementById("root") as HTMLElement;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider>
				<QueryClientProvider>
					<RouterProvider />
				</QueryClientProvider>
			</ThemeProvider>
		</StrictMode>,
	);
}
