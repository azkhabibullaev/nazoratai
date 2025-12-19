import React from "react";
import { BottomNavigation } from "./components/bottom-nav";
import { CreditCardsCarousel, type CreditCardDTO } from "./components/credit-cards";

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
                brand: "POCKET",
            },
            {
                id: "cc_1",
                holderName: "Jack Lewis",
                numberMasked: "1234********1121",
                expiry: "06/28",
                brand: "UZCARD",
            },
            {
                id: "cc_2",
                holderName: "Jack Lewis",
                numberMasked: "9911********6677",
                expiry: "11/27",
                brand: "HUMO",
            },
            {
                id: "cc_3",
                holderName: "Jack Lewis",
                numberMasked: "4000********3333",
                expiry: "01/29",
                brand: "VISA",
            },
            {
                id: "cc_4",
                holderName: "Jack Lewis",
                numberMasked: "5555********8888",
                expiry: "09/26",
                brand: "MASTERCARD",
            },
        ],
    };
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockJson), 700); // network delay kabi
    });
}

export function App() {
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
        <div className="relative h-dvh max-w-2xl mx-auto px-4 bg-[#f5f6f7]">
            <div className="p-2">
                {loading && <div className="rounded-2xl border p-6 text-muted-foreground">Loading cards...</div>}
                {!loading && error && (
                    <div className="rounded-2xl border border-destructive/40 p-6 text-destructive">{error}</div>
                )}
                {!loading && !error && <CreditCardsCarousel cards={cards} />}
            </div>
            <BottomNavigation />
        </div>
    );
}

export default App;
