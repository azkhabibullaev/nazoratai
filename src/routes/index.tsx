import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/bottom-nav";
import { CreditCardsCarousel } from "@/components/credit-cards";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons";
import { AppDrawer } from "@/components/app-drawer/app-drawer";
import { useQuery } from "@tanstack/react-query";
import { getInitDataHash, getInitDataRaw } from "@/lib/telegram";
import { api } from "@/api/base";
import { isTMA } from "@tma.js/bridge";

export const Route = createFileRoute("/")({
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

async function verify() {
    const response = await api.get("/users/getMe/593aa48d-d82d-46ec-a0e0-67e43a2cbe5f");
    return response.data;
}

function RouteComponent() {
    const initDataRaw = getInitDataRaw();
    console.log("initDataRaw:", initDataRaw?.slice(0, 30));
    console.log("isTMA:", isTMA());
    const key = initDataRaw ? getInitDataHash(initDataRaw) : "no-init-data";
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tg-verify", key],
        queryFn: () => verify(),
        enabled: Boolean(initDataRaw),
        staleTime: Infinity,
        retry: false,
    });
    if (!initDataRaw) {
        return <div style={{ padding: 16 }}>Telegram ichida oching (initData yo‘q).</div>;
    }
    if (isLoading) return <div style={{ padding: 16 }}>Tekshirilmoqda...</div>;
    if (isError) {
        return <div style={{ padding: 16 }}>Verify xato: {(error as Error).message}</div>;
    }
    return (
        <div className="relative h-dvh max-w-xl mx-auto px-4 bg-[#f5f6f7]">
            <div style={{ padding: 16 }}>
                <div>✅ Verified</div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <div className="p-2">
                <div className="text-xl font-medium">Azamat</div>
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
