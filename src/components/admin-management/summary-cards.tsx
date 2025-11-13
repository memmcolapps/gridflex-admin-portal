import { useGetAdminResponse } from "@/hooks/use-orgs";
import { AlertCircle, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function AdminSummaryCards() {
    const { data: admin, isLoading, isError } = useGetAdminResponse()
    const totalActive = admin?.data?.totalActiveAdmins;
    const totalAdmins = admin?.data?.totalPortalUsers;
    const totalSuspendedAdmins = admin?.data?.totalSuspendedAdmins;

    const summaryData = [
        {
            title: "Total Admins",
            value: totalAdmins,
            icon: <TrendingUp size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Active Admins",
            value: totalActive,
            icon: <AlertCircle size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
        {
            title: "Suspended Admins",
            value: totalSuspendedAdmins,
            icon: <Users size={20} />,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
        },
    ];

    const skeletonCards = Array(3).fill(0)

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isError ? (
                <div className="col-span-4 text-center text-red-500">
                    Failed to load summary data.
                </div>
            ) : isLoading ? (
                  skeletonCards.map((_, idx) => (
                    <Card key={idx} className="border px-0 h-28 py-4 shadow-none rounded-lg border-gray-200 bg-white animate-pulse">
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
