import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    {
        name: 'Jan',
        uptime: 40,
        downtime: 24,
    },
    {
        name: 'Feb',
        uptime: 30,
        downtime: 13,
    },
    {
        name: 'Mar',
        uptime: 20,
        downtime: 98,
    },
    {
        name: 'Apr',
        uptime: 27,
        downtime: 39,
    },
    {
        name: 'May',
        uptime: 18,
        downtime: 48,
    },
    {
        name: 'Jun',
        uptime: 23,
        downtime: 38,
    },
    {
        name: 'Jul',
        uptime: 34,
        downtime: 43,
    },
    {
        name: 'Aug',
        uptime: 20,
        downtime: 98,
    },
    {
        name: 'Sep',
        uptime: 27,
        downtime: 39,
    },
    {
        name: 'Oct',
        uptime: 18,
        downtime: 48,
    },
    {
        name: 'Nov',
        uptime: 23,
        downtime: 38,
    },
    {
        name: 'Dec',
        uptime: 34,
        downtime: 43,
    },
];

export default function DashboardAnalysisGraph() {
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
                        <LineChart data={data} margin={{ right: 30, bottom: 20 }}>
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