import { useGetDashboard } from "@/hooks/use-orgs";
import { AlertCircle, Building2, CircleCheckBig, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function DashboardSummaryCards() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const { data: analytics, isLoading, isError } = useGetDashboard(currentYear, currentMonth);
    const summary = analytics?.data?.cardData;
    const totalUtilityCompany = summary?.totalUtilityCompany;
    const totalCustomers = summary?.totalCustomers;
    const totalResolvedIncident = summary?.totalResolvedIncident;
    const totalUnresolvedIncident = summary?.totalUnresolvedIncident;
    
    const summaryData = [
        {
            title: "Total Utility Companies",
            value: totalUtilityCompany,
            icon: <Building2 strokeWidth={1.5} size={20} />,
        },
        {
            title: "Total Customers",
            value: totalCustomers,
            icon: <Users strokeWidth={1.5} size={20} />,
        },
        {
            title: "Total Resolved Incidents",
            value: totalResolvedIncident,
            icon: <CircleCheckBig strokeWidth={1.5} size={20} />,
        },
        {
            title: "Total Unresolved Incidents",
            value: totalUnresolvedIncident,
            icon: <AlertCircle strokeWidth={1.5} size={20} />,
        },
    ];

    const skeletonCards = Array(4).fill(0); 

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isError ? (
                <div className="col-span-4 text-center text-red-500">
                    Failed to load summary data.
                </div>
            ) : isLoading ? (
                skeletonCards.map((_, idx) => (
                    <Card key={idx} className="border px-0 h-34 py-4 shadow-none rounded-lg border-gray-200 bg-white animate-pulse">
                        <CardContent className="mt-2">
                            <div className="flex items-start px-0 justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
                                </div>
                                <div className="rounded-lg bg-gray-200 mt-4 p-3 w-10 h-10"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                summaryData.map((item, idx) => (
                    <Card key={idx} className="border px-0 py-4 shadow-none rounded-lg border-gray-200 bg-white">
                        <CardContent className="mt-2">
                            <div className="flex items-start px-0 justify-between">
                                <div className="flex-1">
                                    <p className="mb-2 text-base font-normal text-gray-700">
                                        {item.title}
                                    </p>
                                    <p className="mb-1 font-medium text-xl text-gray-900">
                                        {item.value}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3 border border-gray-200 mt-2">
                                    {item.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
