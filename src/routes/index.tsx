import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/bottom-nav";
import { CreditCardsCarousel } from "@/components/credit-cards";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/base";
import { Reports } from "@/components/reports/reports";
import { Skeleton } from "@/components/ui/skeleton";

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
                    {me.isPending ? <Skeleton className="h-6 w-[250px]" /> : <>Salom, {me.data?.data?.fullName}</>}
                </div>
            </header>
            <div className="relative min-h-screen max-w-xl mx-auto px-4 mt-16">
                <div className="mb-2">
                    <CreditCardsCarousel cards={cards} />
                </div>
                <Reports />
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex-1 p-2 border rounded-xl text-center bg-background">Kunlik</div>
                    <div className="flex-1 p-2 border rounded-xl text-center bg-background">Haftalik</div>
                    <div className="flex-1 p-2 border rounded-xl text-center bg-background">Oylik</div>
                </div>
            </div>
            <BottomNavigation />
            <AppDrawer />
        </div>
    );
}
