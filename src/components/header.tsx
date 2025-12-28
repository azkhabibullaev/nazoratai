import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useSessionStore } from "@/entities/session/model/session.store";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function Header() {
	const { setTheme } = useTheme();
	const me = useSessionStore((s) => s.me);

	return (
		<header className="fixed top-0 left-0 z-50 w-full py-4 bg-background border-b">
			<div className="relative z-50 flex items-center justify-between max-w-xl mx-auto px-4">
				<div>
					{!me ? (
						<Skeleton className="h-6 w-[250px]" />
					) : (
						<>Salom, {me.fullName}</>
					)}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								size="icon"
								variant="outline"
								className="relative"
							/>
						}
					>
						<HugeiconsIcon
							icon={Sun03Icon}
							className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
						/>
						<HugeiconsIcon
							icon={Moon02Icon}
							className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
						/>
						<span className="sr-only">Toggle theme</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
