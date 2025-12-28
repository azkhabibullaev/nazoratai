import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { queryClient } from "@/shared/api/query-client";

export type Props = {
	children: Readonly<React.ReactNode>;
};

export function QueryClientProvider({ children }: Props) {
	return (
		<TanstackQueryClientProvider client={queryClient}>
			{children}
		</TanstackQueryClientProvider>
	);
}
