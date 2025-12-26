import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";

import { api } from "@/api/base";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Reports } from "@/components/reports/reports";
import { BottomNavigation } from "@/components/bottom-nav";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { CreditCardsCarousel } from "@/components/credit-cards";

export const Route = createFileRoute("/")({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            token: typeof search.token === "string" ? search.token : undefined,
        };
    },
    component: RouteComponent,
});

export type CreditCardDTO = {
    id: string;
    holderName: string;
    numberMasked: string;
    expiry: string;
    cardType: "UZCARD" | "HUMO";
};

const cards: CreditCardDTO[] = [
    {
        id: "cc_0",
        holderName: "Jack Lewis",
        numberMasked: "1234********1121",
        expiry: "06/31",
        cardType: "UZCARD",
    },
    {
        id: "cc_1",
        holderName: "Jack Lewis",
        numberMasked: "1234********1121",
        expiry: "06/28",
        cardType: "HUMO",
    },
    {
        id: "cc_2",
        holderName: "Jack Lewis",
        numberMasked: "9911********6677",
        expiry: "11/27",
        cardType: "UZCARD",
    },
    {
        id: "cc_3",
        holderName: "Jack Lewis",
        numberMasked: "4000********3333",
        expiry: "01/29",
        cardType: "HUMO",
    },
    {
        id: "cc_4",
        holderName: "Jack Lewis",
        numberMasked: "5555********8888",
        expiry: "09/26",
        cardType: "UZCARD",
    },
];

function RouteComponent() {
    const { token } = Route.useSearch();
    const navigate = Route.useNavigate();
    const { setTheme } = useTheme();

    const storedAccessToken = localStorage.getItem("accessToken");

    const verify = useQuery({
        queryKey: ["tg-verify", token],
        enabled: Boolean(token),
        queryFn: async () => {
            const res = await api.get(`/users/getToken/${token}`);
            return res.data;
        },
    });

    const freshAccessToken = verify.data?.data?.accessToken as string | undefined;
    const accessToken = freshAccessToken ?? storedAccessToken ?? undefined;

    useEffect(() => {
        if (!freshAccessToken) return;

        localStorage.setItem("accessToken", freshAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${freshAccessToken}`;

        navigate({
            to: "/",
            replace: true,
            search: (prev) => ({
                ...prev,
                token: undefined,
            }),
        });
    }, [freshAccessToken, navigate]);

    const me = useQuery({
        queryKey: ["tg-user"],
        enabled: Boolean(accessToken),
        refetchOnMount: "always",
        queryFn: async () => {
            const response = await api.get("/users/getMe");
            return response.data;
        },
    });

    return (
        <div className="h-dvh">
            <header className="fixed top-0 left-0 z-50 w-full py-4 bg-background border-b">
                <div className="relative z-50 flex items-center justify-between max-w-xl mx-auto px-4">
                    <div>
                        {me.isPending ? <Skeleton className="h-6 w-[250px]" /> : <>Salom, {me.data?.data?.fullName}</>}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" size="icon">
                                <HugeiconsIcon
                                    icon={Sun03Icon}
                                    className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
                                />
                                <HugeiconsIcon
                                    icon={Moon02Icon}
                                    className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                                />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="relative min-h-screen max-w-xl mx-auto px-4 pb-32 mt-16">
                <div className="mb-2">
                    <CreditCardsCarousel cards={cards} />
                </div>
                <Reports />
            </div>
            <BottomNavigation />
            <AppDrawer />
        </div>
    );
}
