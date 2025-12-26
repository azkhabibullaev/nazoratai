import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import type { TPieDatum, TCategory, TReportsProps, TReports } from "./types";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const pickColorVar = (i: number) => `var(--chart-${(i % 5) + 1})`;

function toPieData(categories: TCategory[]): TPieDatum[] {
    return categories
        .filter((c) => Number(c.totalAmount) > 0)
        .map((c, i) => ({
            key: `cat_${i}`,
            name: c.categoryName,
            value: Number(c.totalAmount),
            fill: pickColorVar(i),
        }));
}

function buildConfig(data: TPieDatum[]): ChartConfig {
    return data.reduce((acc, d) => {
        acc[d.key] = { label: d.name, color: d.fill };
        return acc;
    }, {} as ChartConfig);
}

export function ReportsChart({ reports, tab, loading }: TReportsProps) {
    const safeReports: TReports = reports ?? {
        totalIncome: 0,
        totalExpense: 0,
        incomeCategories: [],
        expenseCategories: [],
    };

    const pieData = React.useMemo(() => {
        return tab === "expense" ? toPieData(safeReports.expenseCategories) : toPieData(safeReports.incomeCategories);
    }, [tab, safeReports.expenseCategories, safeReports.incomeCategories]);

    const chartConfig = React.useMemo(() => buildConfig(pieData), [pieData]);

    const total = React.useMemo(() => pieData.reduce((sum, d) => sum + d.value, 0), [pieData]);

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart key={tab}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                    <Label
                        content={({ viewBox }) => {
                            if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
                            return (
                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground font-bold">
                                        {total.toLocaleString()}
                                    </tspan>
                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                        {tab === "expense" ? "Chiqim" : "Kirim"}
                                    </tspan>
                                </text>
                            );
                        }}
                    />
                </Pie>
                {!loading && pieData.length === 0 ? (
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-muted-foreground"
                    >
                        No data
                    </text>
                ) : null}
            </PieChart>
        </ChartContainer>
    );
}
