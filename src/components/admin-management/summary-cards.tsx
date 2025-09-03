import { useGetOrgs } from "@/hooks/use-orgs";
import { AlertCircle, Building2, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function AdminSummaryCards() {
    const { isError } = useGetOrgs();
    //   const orgs = data?.organizations ?? [];
    //   const totalActive = orgs.filter((org) => org.status).length;
    //   const totalSuspended = orgs.filter((org) => !org.status).length;
    //   const totalUtilities = orgs.length;
    //   const totalCustomers = data?.overallCustomers ?? 0;

    const summaryData = [
        {
            title: "Total Active",
            //   value: isLoading ? "..." : totalActive,
            value: '200',
            icon: <TrendingUp size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total Suspended",
            //   value: isLoading ? "..." : totalSuspended,
            value: '200',
            icon: <AlertCircle size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total Customers",
            //   value: isLoading ? "..." : totalCustomers.toLocaleString(),
            value: '200',
            icon: <Users size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Total Utilities",
            //   value: isLoading ? "..." : totalUtilities,
            value: '200',
            icon: <Building2 size={20} />,
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
                    <Card key={idx} className="border shadow-none rounded-lg border-gray-200 bg-white">
                        <CardContent>
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
