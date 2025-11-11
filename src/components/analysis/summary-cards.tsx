import { AlertCircle, Building2, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useGetAnalytics } from "@/hooks/use-orgs";
import type { SearchProps } from "@/types/org.interfaces";

export default function AnalysisSummaryCards({ filterParams }: SearchProps) {
  const dateParam: number | undefined = filterParams?.date
    ? new Date(filterParams.date).getTime()
    : undefined;

  const { data: mainAnalytics, isError: mainError } = useGetAnalytics();
  const { data: analytics, isLoading, isError } = useGetAnalytics(dateParam);

  const mainSummary = mainAnalytics?.data
  const summary = analytics?.data;
  const systemUptime = summary?.dailySummaries?.[0]?.uptimePercent;
  const activeUtilityCompany = mainSummary?.cardData?.activeUtilityCompany;
  const incidentReported = summary?.cardData?.incidentReport;
  const averageRecovery = mainSummary?.cardData?.averageRecoveryTime;


  const summaryData = [
    {
      title: "System Uptime",
      value: systemUptime ? `${Number(systemUptime.toFixed(2))}%` : 'N/A',
      icon: <TrendingUp size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Active Utility Company",
      value: activeUtilityCompany ?? "N/A",
      icon: <Building2 size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Incidents Reported",
      value: incidentReported ?? "0",
      icon: <AlertCircle size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Average Recovery Time",
      value: averageRecovery ?? "0 mins",
      icon: <Clock size={20} strokeWidth={1.5} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

    const skeletonCards = Array(4).fill(0); 

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isError || mainError ? (
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
