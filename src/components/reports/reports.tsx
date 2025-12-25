import { useQuery } from "@tanstack/react-query";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons";
import { api } from "@/api/base";

export function Reports() {
    const reports = useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const response = await api.get("/v1/transaction/getReports");
            return response.data;
        },
    });

    return (
        <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-green-500 bg-background">
                <HugeiconsIcon className="size-6" icon={ChartUpIcon} />
                <div className="flex flex-col text-center text-sm font-medium">
                    <span>Xarajat</span>
                    <span>+{reports.data?.totalExpense}</span>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-4 border rounded-xl p-2 text-red-500 bg-background">
                <HugeiconsIcon className="size-6" icon={ChartDownIcon} />
                <div className="flex flex-col text-sm font-medium">
                    <span>Daromad</span>
                    <span>-{reports.data?.totalIncome}</span>
                </div>
            </div>
        </div>
    );
}
