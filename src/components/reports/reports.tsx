import { ChartDownIcon, ChartUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useReportsQuery } from "@/entities/reports/reports.api";
import { useReportsStore } from "@/features/reports/reports.store";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { formatCurrency } from "@/shared/lib/utils";
import { ReportsChart } from "./reports-chart";
import { ReportsList } from "./reports-list";
import type { TPeriod } from "./types";

export function Reports() {
	const period = useReportsStore((s) => s.period);
	const tab = useReportsStore((s) => s.tab);
	const setPeriod = useReportsStore((s) => s.setPeriod);
	const setTab = useReportsStore((s) => s.setTab);

	const { data, isPending } = useReportsQuery(period);

	return (
		<div>
			<div className="flex items-center justify-between gap-2 mb-2">
				{isPending ? (
					<>
						<Skeleton className="flex-1 border h-[58px] w-[250px] rounded-xl" />
						<Skeleton className="flex-1 border h-[58px] w-[250px] rounded-xl" />
					</>
				) : (
					<>
						<div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-red-400 bg-background">
							<HugeiconsIcon
								className="size-6"
								icon={ChartDownIcon}
							/>
							<div className="flex flex-col text-sm font-medium">
								<span>Xarajat</span>
								<span>
									-{formatCurrency(data?.totalExpense ?? 0)}
								</span>
							</div>
						</div>
						<div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-green-400 bg-background">
							<HugeiconsIcon
								className="size-6"
								icon={ChartUpIcon}
							/>
							<div className="flex flex-col text-center text-sm font-medium">
								<span>Daromad</span>
								<span>
									+{formatCurrency(data?.totalIncome ?? 0)}
								</span>
							</div>
						</div>
					</>
				)}
			</div>
			<Tabs
				value={period}
				onValueChange={(v) => setPeriod(v as TPeriod)}
				className="w-full mb-2"
			>
				<TabsList className="w-full">
					<TabsTrigger value="today">Kunlik</TabsTrigger>
					<TabsTrigger value="week">Haftalik</TabsTrigger>
					<TabsTrigger value="month">Oylik</TabsTrigger>
				</TabsList>
			</Tabs>
			<Card className="flex flex-col">
				<CardContent className="flex-1 pb-0">
					<ReportsChart
						tab={tab}
						reports={data}
						loading={isPending}
					/>
				</CardContent>
				<CardFooter className="flex-col gap-2 text-sm">
					<Tabs
						value={tab}
						onValueChange={(v) => setTab(v as "expense" | "income")}
						className="w-full my-2"
					>
						<TabsList className="w-full">
							<TabsTrigger value="expense">Chiqim</TabsTrigger>
							<TabsTrigger value="income">Kirim</TabsTrigger>
						</TabsList>
					</Tabs>
					<ReportsList tab={tab} reports={data} loading={isPending} />
				</CardFooter>
			</Card>
		</div>
	);
}
