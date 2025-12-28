import {
	Bitcoin03Icon,
	Clock01Icon,
	HomeIcon,
	PlusSignIcon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { useDrawerStore } from "@/shared/stores/global";
import { Button } from "../shared/components/ui/button";

const items = [
	{ path: "/", name: "Home", label: "Asosiy", icon: HomeIcon },
	{ path: "/history", name: "History", label: "Tarix", icon: Clock01Icon },
	{ path: "/debts", name: "Debts", label: "Qarzlar", icon: Bitcoin03Icon },
	{ path: "/account", name: "Account", label: "Hisob", icon: UserIcon },
];

export function BottomNavigation() {
	const open = useDrawerStore((s) => s.open);
	return (
		<div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background">
			<div className="relative">
				<nav className="h-16">
					<ul className="grid h-full grid-cols-5 items-center px-2">
						{items
							.slice(0, 2)
							.map(({ path, name, label, icon }) => {
								return (
									<li key={name}>
										<Link
											key={name}
											to={path}
											className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl transition-colors"
											activeProps={{
												className: "text-primary",
											}}
										>
											<HugeiconsIcon
												icon={icon}
												size={20}
											/>
											<span className="text-[12px] leading-none">
												{label}
											</span>
										</Link>
									</li>
								);
							})}
						<div />
						{items.slice(2).map(({ path, name, label, icon }) => {
							return (
								<li key={name}>
									<Link
										key={name}
										to={path}
										className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl transition-colors"
										activeProps={{
											className: "text-primary",
										}}
									>
										<HugeiconsIcon icon={icon} size={20} />
										<span className="text-[12px] leading-none">
											{label}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3">
					<Button
						size="icon"
						type="button"
						onClick={open}
						className="h-16 w-16 rounded-full"
					>
						<HugeiconsIcon icon={PlusSignIcon} className="size-6" />
					</Button>
				</div>
			</div>
		</div>
	);
}
