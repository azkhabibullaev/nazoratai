import {
	Item,
	ItemContent,
	ItemDescription,
	ItemHeader,
	ItemTitle,
} from "@/shared/components/ui/item";

export type ReportsListItemProps = {
	title: string;
	amount: number;
};

export function ReportsListItem({ title, amount }: ReportsListItemProps) {
	return (
		<Item>
			<ItemContent>
				<ItemHeader>
					<ItemTitle>{title}</ItemTitle>
				</ItemHeader>
				<ItemDescription>{amount.toLocaleString()}</ItemDescription>
			</ItemContent>
		</Item>
	);
}
