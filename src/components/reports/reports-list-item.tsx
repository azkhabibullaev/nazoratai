import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item";
import { HugeiconsIcon } from "@hugeicons/react";
import { PieChartIcon } from "@hugeicons/core-free-icons";

export type ReportsListItemProps = {
    title: string;
    amount: number;
};

export function ReportsListItem({ title, amount }: ReportsListItemProps) {
    return (
        <Item>
            <ItemMedia>
                <HugeiconsIcon icon={PieChartIcon} strokeWidth={2} className="size-6" />
            </ItemMedia>
            <ItemContent>
                <ItemHeader>
                    <ItemTitle>{title}</ItemTitle>
                </ItemHeader>
                <ItemDescription>{amount.toLocaleString()}</ItemDescription>
            </ItemContent>
        </Item>
    );
}
