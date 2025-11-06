import { useGetDashboard } from "@/hooks/use-orgs";
import { AlertCircle, Building2, CircleCheckBig, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function DashboardSummaryCards() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const { data: analytics, isLoading, isError } = useGetDashboard(currentYear, currentMonth);
    const summary = analytics?.data;
    const totalUtilityCompany = summary?.cardData?.totalUtilityCompany;
    const totalCustomers = summary?.cardData?.totalCustomers;
    const totalResolvedIncident = summary?.cardData?.totalResolvedIncident;
    const totalUnresolvedIncident = summary?.cardData?.totalUnresolvedIncident;
    
    const summaryData = [
        {
            title: "Total Utility Companies",
              value: isLoading ? "..." : totalUtilityCompany,
            icon: <Building2 strokeWidth={1.5} size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total Customers",
              value: isLoading ? "..." : totalCustomers?.toLocaleString(),
            icon: <Users strokeWidth={1.5} size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total Resolved Incidents",
              value: isLoading ? "..." : totalResolvedIncident,
            icon: <CircleCheckBig strokeWidth={1.5} size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total unresolved Incidents",
              value: isLoading ? "..." : totalUnresolvedIncident,
            icon: <AlertCircle strokeWidth={1.5} size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isError ? (
                <div className="col-span-4 text-center text-red-500">
                    Failed to load summary data.
                </div>
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
                                <div
                                    className={`rounded-lg bg-gray-50 p-3 border border-gray-200 mt-2`}
                                >
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
