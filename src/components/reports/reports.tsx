import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons";

import { api } from "@/api/base";
import { formatCurrency } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ReportsChart } from "./reports-chart";
import { ReportsList } from "./reports-list";

export function Reports() {
    const [tab, setTab] = React.useState<"expense" | "income">("expense");

    const { data, isPending } = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const response = await api.get("/transaction/getReport");
            return response.data;
        },
    });

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
                        <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-red-500 bg-background">
                            <HugeiconsIcon className="size-6" icon={ChartDownIcon} />
                            <div className="flex flex-col text-sm font-medium">
                                <span>Xarajat</span>
                                <span>-{formatCurrency(data?.totalExpense ?? 0)}</span>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-green-500 bg-background">
                            <HugeiconsIcon className="size-6" icon={ChartUpIcon} />
                            <div className="flex flex-col text-center text-sm font-medium">
                                <span>Daromad</span>
                                <span>+{formatCurrency(data?.totalIncome ?? 0)}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Tabs defaultValue="today" className="w-full mb-2">
                <TabsList className="w-full">
                    <TabsTrigger value="today">Kunlik</TabsTrigger>
                    <TabsTrigger value="week">Haftalik</TabsTrigger>
                    <TabsTrigger value="month">Oylik</TabsTrigger>
                </TabsList>
            </Tabs>
            <Card className="flex flex-col">
                <CardContent className="flex-1 pb-0">
                    <ReportsChart tab={tab} reports={data} loading={isPending} />
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <Tabs value={tab} onValueChange={(v) => setTab(v as "expense" | "income")} className="w-full my-2">
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
