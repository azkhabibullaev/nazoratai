import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";

export type CreditCardDTO = {
    id: string;
    holderName: string;
    numberMasked: string;
    expiry: string;
    brand?: "POCKET" | "UZCARD" | "HUMO" | "VISA" | "MASTERCARD" | string;
};

function BrandText({ brand }: { brand?: string }) {
    return <div className="text-lg font-semibold tracking-wide">{brand ?? "VISA"}</div>;
}

function CreditCardVisual({ data }: { data: CreditCardDTO; className?: string }) {
    const number = <div className="text-lg md:text-xl">{data.numberMasked}</div>;
    return (
        <div className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
                <BrandText brand={data.brand} />
            </div>
            <div className="mt-10">{number}</div>
            <div className="mt-8 flex items-end justify-between">
                <div className="space-y-1">
                    <div className="text-sm">{data.holderName}</div>
                    <div className="text-sm opacity-95">{data.expiry}</div>
                </div>
            </div>
        </div>
    );
}

export function CreditCardsCarousel({ cards }: { cards: CreditCardDTO[]; title?: string }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: false,
        skipSnaps: false,
    });

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
                {cards.map((c) => (
                    <div
                        key={c.id}
                        className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_70%] lg:flex-[0_0_46%] xl:flex-[0_0_36%]"
                    >
                        <CreditCardVisual data={c} />
                    </div>
                ))}
            </div>
        </div>
    );
}
