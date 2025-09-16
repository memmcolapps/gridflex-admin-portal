import { AlertCircle, Building2, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useGetAnalytics } from "@/hooks/use-orgs";

export default function AnalysisSummaryCards() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const { data: analytics, isLoading, isError } = useGetAnalytics(currentYear, currentMonth);
  const summary = analytics?.data;
  const systemUptime = summary?.dailySummaries?.[0]?.uptimePercent;
  const activeUtilityCompany = summary?.activeUtilityCompany;
  const incidentReported = summary?.incidentReport;
  const averageRecovery = summary?.averageRecoveryTime;
  

  const summaryData = [
    {
      title: "System Uptime",
      value: isLoading ? "..." : systemUptime ? `${Number(systemUptime.toFixed(2))}%` : 'N/A',
      icon: <TrendingUp size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Active Utility Company",
      value: isLoading ? "..." : activeUtilityCompany ?? "N/A",
      icon: <Building2 size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Incidents Reported",
      value: isLoading ? "..." : incidentReported ?? "0",
      icon: <AlertCircle size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Average Recovery Time",
      value: isLoading ? "..." : averageRecovery ?? "0 mins",
      icon: <Clock size={20} strokeWidth={1.5} />,
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
                  <p className="mb-1 font-normal text-xl text-gray-900">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`rounded-lg bg-gray-50 p-3 border border-gray-200 mt-2 ${item.iconBg} ${item.iconColor}`}
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
