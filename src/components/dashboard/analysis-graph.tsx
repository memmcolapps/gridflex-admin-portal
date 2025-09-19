import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useGetDashboard } from "@/hooks/use-orgs";


export default function DashboardAnalysisGraph() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const { data,isLoading, isError, error } = useGetDashboard(currentYear, currentMonth);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
  
    if (!data?.success) {
      return <p className="text-red-500 text-center">Failed: {data?.error ?? "Something went wrong"}</p>;
    }

    const monthShortNames: Record<string, string> = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec",
      };
    
  
    const chartData =
    data.data?.monthlySummaries?.map((report) => ({
      name: monthShortNames[report.monthDisplay ?? ''],
      uptime: report.uptimePercent,
      downtime: report.downtimePercent,
      month: report.month, 
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    ?? [];
  

    return (
        <Card className="shadow-none w-full">
            <CardHeader>
                <div className="flex px-4 justify-between items-center">
                    <div>
                        <CardTitle className="text-xl font-medium">
                            Annual Uptime & Downtime Performance (%)
                        </CardTitle>
                        <CardDescription>Monthly uptime and downtime trend across all utilities for the past year.</CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                            Uptime
                            <div className="w-5 h-5 bg-green-400 rounded-sm"></div>
                        </div>
                        <div className="flex gap-2 items-center">
                            Downtime
                            <div className="w-5 h-5 bg-[#7086FD] rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div style={{ width: '100%', height: '377px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ right: 30, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 1" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="uptime"
                                stroke="#6FD195E5"
                                strokeWidth={1}
                                dot={{ r: 3, stroke: "#6FD19530", fill: "#6FD195", strokeWidth: 8 }}
                                activeDot={{ r: 3, stroke: "#6FD19530", fill: "#6FD195", strokeWidth: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="downtime"
                                stroke="#7086FD"
                                strokeWidth={1}
                                dot={{ r: 3, stroke: "#7086FD30", fill: "#7086FD", strokeWidth: 8 }}
                                activeDot={{ r: 3, stroke: "#7086FD30", fill: "#7086FD", strokeWidth: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}