import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { HomeIcon, Clock01Icon, Bitcoin03Icon, UserIcon, PlusSignIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useDrawerStore } from "@/store/global";

type Tab = "home" | "history" | "center" | "loans" | "profile";

type Props = {
    value?: Tab;
    defaultValue?: Tab;
    onChange?: (tab: Tab) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const items: Array<{ key: Exclude<Tab, "center">; label: string; icon: any }> = [
    { key: "home", label: "Asosiy", icon: HomeIcon },
    { key: "history", label: "Tarix", icon: Clock01Icon },
    { key: "loans", label: "Qarzlar", icon: Bitcoin03Icon },
    { key: "profile", label: "Hisob", icon: UserIcon },
];

export function BottomNavigation({ value, defaultValue = "home", onChange }: Props) {
    const open = useDrawerStore((s) => s.open);

    const [internal, setInternal] = React.useState<Tab>(defaultValue);
    const active = value ?? internal;

    const setActive = (tab: Tab) => {
        if (value == null) setInternal(tab);
        onChange?.(tab);
    };

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t">
            <div className="relative">
                <nav className="h-16">
                    <ul className="grid h-full grid-cols-5 items-center px-2">
                        {items.slice(0, 2).map(({ key, label, icon }) => {
                            const isActive = active === key;
                            return (
                                <li key={key}>
                                    <a
                                        href="#"
                                        onClick={() => setActive(key)}
                                        className={cn(
                                            "flex h-full flex-col items-center justify-center gap-1 rounded-2xl transition-colors",
                                            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        <HugeiconsIcon icon={icon} size={20} />
                                        <span className="text-[12px] leading-none">{label}</span>
                                    </a>
                                </li>
                            );
                        })}
                        <div />
                        {items.slice(2).map(({ key, label, icon }) => {
                            const isActive = active === key;
                            return (
                                <li key={key}>
                                    <a
                                        href="#"
                                        onClick={() => setActive(key)}
                                        className={cn(
                                            "flex h-full flex-col items-center justify-center gap-1 rounded-2xl transition-colors",
                                            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        <HugeiconsIcon icon={icon} size={20} />
                                        <span className="text-[12px] leading-none">{label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3">
                    <Button size="icon" type="button" onClick={open} className="h-16 w-16 rounded-full">
                        <HugeiconsIcon icon={PlusSignIcon} className="size-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
