import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/api/base";

import { Reports } from "@/components/reports/reports";
import { BottomNavigation } from "@/components/bottom-nav";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { CreditCardsCarousel } from "@/components/credit-cards";

export const Route = createFileRoute("/")({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            token: typeof search.token === "string" ? search.token : "",
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

    const verify = useQuery({
        queryKey: ["tg-verify", token],
        enabled: Boolean(token),
        queryFn: async () => {
            const response = await api.get(`/users/getToken/${token}`);
            return response.data;
        },
    });

    const accessToken: string = verify.data?.data?.accessToken;

    useEffect(() => {
        const at = verify.data?.data?.accessToken as string | undefined;
        if (!at) return;
        localStorage.setItem("accessToken", at);
    }, [verify.data]);

    const me = useQuery({
        queryKey: ["tg-user"],
        enabled: Boolean(accessToken),
        queryFn: async () => {
            const response = await api.get("/users/getMe");
            return response.data;
        },
    });

    return (
        <div className="relative h-dvh max-w-xl mx-auto px-4 bg-[#f5f6f7]">
            <div className="py-4">
                <div>{me.data?.data?.fullName}</div>
            </div>
            <div className="mb-2">
                <CreditCardsCarousel cards={cards} />
            </div>
            <Reports />
            <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 p-2 border rounded-xl text-center bg-background">Kunlik</div>
                <div className="flex-1 p-2 border rounded-xl text-center bg-background">Haftalik</div>
                <div className="flex-1 p-2 border rounded-xl text-center bg-background">Oylik</div>
            </div>
            <BottomNavigation />
            <AppDrawer />
        </div>
    );
}
