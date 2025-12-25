import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/bottom-nav";
import { CreditCardsCarousel } from "@/components/credit-cards";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/base";

export const Route = createFileRoute("/")({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            id: typeof search.token === "string" ? search.token : "",
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
    const { id } = Route.useSearch();
    const { data } = useQuery({
        queryKey: ["tg-verify", id],
        enabled: Boolean(id),
        queryFn: async () => {
            const response = await api.get(`/users/getToken/${id}`);
            return response.data;
        },
    });
    const accessToken = data?.data?.accessToken;
    localStorage.setItem("accessToken", accessToken ?? "");
    const telegramUser = useQuery({
        queryKey: ["tg-user", accessToken],
        enabled: Boolean(accessToken),
        queryFn: async () => {
            const response = await api.get(`/users/getMe`);
            return response.data;
        },
    });
    return (
        <div className="relative h-dvh max-w-xl mx-auto px-4 bg-[#f5f6f7]">
            <div className="py-4">
                <div>{telegramUser.data?.data?.fullName}</div>
            </div>
            <div className="mb-2">
                <CreditCardsCarousel cards={cards} />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-green-500 bg-background">
                    <HugeiconsIcon className="size-6" icon={ChartUpIcon} />
                    <div className="flex flex-col text-center text-sm font-medium">
                        <span>Xarajat</span>
                        <span>+100,000</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-red-500 bg-background">
                    <HugeiconsIcon className="size-6" icon={ChartDownIcon} />
                    <div className="flex flex-col text-sm font-medium">
                        <span>Daromad</span>
                        <span>-50,000</span>
                    </div>
                </div>
            </div>
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
