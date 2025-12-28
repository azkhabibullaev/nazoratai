export type TPeriod = "today" | "week" | "month";

export type ReportCategory = {
	categoryName: string;
	totalAmount: number;
};

export type ReportsResponse = {
	totalIncome: number;
	totalExpense: number;
	incomeCategories: ReportCategory[];
	expenseCategories: ReportCategory[];
};
