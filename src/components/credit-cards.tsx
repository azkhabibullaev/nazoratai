import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ClientCards } from "./client-cards/client-cards";
import type { CreditCardDTO } from "@/routes";

export function CreditCardsCarousel({ cards }: { cards: CreditCardDTO[] }) {
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
                        className="min-w-0 flex-[0_0_75%] sm:flex-[0_0_75%] lg:flex-[0_0_65%] xl:flex-[0_0_55%]"
                    >
                        <ClientCards cardType={c.cardType} />
                    </div>
                ))}
            </div>
        </div>
    );
}
