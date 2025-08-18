import { useGetOrgs } from "@/hooks/use-orgs";
import { AlertCircle, Building2, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function SummaryCards() {
  const { data, isLoading, isError } = useGetOrgs();
  const orgs = data?.organizations ?? [];
  const totalActive = orgs.filter((org) => org.status).length;
  const totalSuspended = orgs.filter((org) => !org.status).length;
  const totalUtilities = orgs.length;
  const totalCustomers = data?.overallCustomers ?? 0;

  const summaryData = [
    {
      title: "Total Active",
      value: isLoading ? "..." : totalActive,
      subtitle: `Out of ${totalUtilities}`,
      icon: <TrendingUp size={20} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Total Suspended",
      value: isLoading ? "..." : totalSuspended,
      subtitle: "Across all utilities",
      icon: <AlertCircle size={20} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Total Customers",
      value: isLoading ? "..." : totalCustomers.toLocaleString(),
      subtitle: "Across all utilities",
      icon: <Users size={20} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Total Utilities",
      value: isLoading ? "..." : totalUtilities,
      subtitle: `${totalActive} Active`,
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
          <Card key={idx} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    {item.title}
                  </p>
                  <p className="mb-1 text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <div
                  className={`rounded-lg p-5 ${item.iconBg} ${item.iconColor}`}
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
