import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { BottomNavigation } from "@/components/bottom-nav";
import { CreditCardsCarousel } from "@/components/credit-cards";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons";
import { AppDrawer } from "@/components/app-drawer/app-drawer";

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

type CreditCardsResponse = {
    creditCards: CreditCardDTO[];
};

function mockFetchCreditCards(): Promise<CreditCardsResponse> {
    const mockJson: CreditCardsResponse = {
        creditCards: [
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
        ],
    };
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockJson), 700); // network delay kabi
    });
}

function RouteComponent() {
    const [loading, setLoading] = React.useState(true);
    const [cards, setCards] = React.useState<CreditCardDTO[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                // fetch o‘rniga mock fetch
                const json = await mockFetchCreditCards();
                if (!alive) return;

                setCards(json.creditCards ?? []);
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message ?? "Unknown error");
            } finally {
                if (!alive) return;
                setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    return (
        <div className="relative h-dvh max-w-xl mx-auto px-4 bg-[#f5f6f7]">
            <div className="p-2">
                <div className="text-xl font-medium">Azamat</div>
            </div>
            <div className="mb-2">
                {loading && <div className="rounded-2xl border p-6 text-muted-foreground">Loading cards...</div>}
                {!loading && error && (
                    <div className="rounded-2xl border border-destructive/40 p-6 text-destructive">{error}</div>
                )}
                {!loading && !error && <CreditCardsCarousel cards={cards} />}
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
