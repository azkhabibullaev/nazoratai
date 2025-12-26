import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

export type Category = {
    categoryName: string;
    totalAmount: number;
};

export type Reports = {
    totalIncome: number;
    totalExpense: number;
    incomeCategories: Category[];
    expenseCategories: Category[];
};

export type ReportsChartProps = {
    reports?: Reports;
    loading?: boolean;
};

type PieDatum = {
    key: string;
    name: string;
    value: number;
    fill: string;
};

const pickColorVar = (i: number) => `var(--chart-${(i % 5) + 1})`;

function toPieData(categories: Category[]): PieDatum[] {
    return categories
        .filter((c) => Number(c.totalAmount) > 0)
        .map((c, i) => ({
            key: `cat_${i}`,
            name: c.categoryName,
            value: Number(c.totalAmount),
            fill: pickColorVar(i),
        }));
}

function buildConfig(data: PieDatum[]): ChartConfig {
    return data.reduce((acc, d) => {
        acc[d.key] = { label: d.name, color: d.fill };
        return acc;
    }, {} as ChartConfig);
}

export function ReportsChart({ reports }: ReportsChartProps) {
    const [tab, setTab] = React.useState<"expense" | "income">("expense");

    const safeReports: Reports = reports ?? {
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
        <Card className="flex flex-col">
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground font-bold">
                                                {total.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {tab === "expense" ? "Chiqim" : "Kirim"}
                                            </tspan>
                                        </text>
                                    );
                                }}
                            />
                        </Pie>
                        {pieData.length === 0 ? null : null}
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <Tabs value={tab} onValueChange={(v) => setTab(v as "expense" | "income")} className="w-full my-2">
                    <TabsList className="w-full">
                        <TabsTrigger value="expanse">Chiqim</TabsTrigger>
                        <TabsTrigger value="income">Kirim</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardFooter>
        </Card>
    );
}
