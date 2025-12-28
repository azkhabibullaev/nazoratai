import { ReportsListItem } from "./reports-list-item";
import type { TReportsProps } from "./types";

export function ReportsList({ reports, tab }: TReportsProps) {
	const categories =
		tab === "expense"
			? reports?.expenseCategories
			: reports?.incomeCategories;
	if (!categories) return null;
	return (
		<div className="flex flex-col gap-2 w-full">
			{categories.map((c) => (
				<ReportsListItem
					key={c.categoryName}
					title={c.categoryName}
					amount={Number(c.totalAmount)}
				/>
			))}
		</div>
	);
}
