export type TCategory = {
    categoryName: string;
    totalAmount: number;
};

export type TReports = {
    totalIncome: number;
    totalExpense: number;
    incomeCategories: TCategory[];
    expenseCategories: TCategory[];
};

export type TReportsProps = {
    tab?: "expense" | "income";
    reports?: TReports;
    loading?: boolean;
};

export type TPieDatum = {
    key: string;
    name: string;
    value: number;
    fill: string;
};
