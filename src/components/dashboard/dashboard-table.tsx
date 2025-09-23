'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useGetDashboard } from "@/hooks/use-orgs";
import { useRouter } from "next/navigation";

export default function DasboardIncidentReports() {
    const router = useRouter()
    const { data: recentIncidents } = useGetDashboard();
    const recentIncident = recentIncidents?.data?.incidentReports

    return (
        <div className="py-8">
            <div className="w-full">
                <div className="Recent Incidents">
                    <Card className="shadow-none gap-0 rounded-lg pb-6 pt-6 bg-white">
                        <CardHeader>
                            <div className="flex flex-row justify-between items-center">
                                <CardTitle className="text-xl font-medium">
                                    Recent Incident Reports
                                </CardTitle>

                                <div>
                                    <Button
                                        className="flex h-10 cursor-pointer text-gray-700 items-center border border-1 border-gray-300 gap-2 bg-gray-200 hover:bg-gray-100"
                                        onClick={() => router.push('/incident-management')}
                                    >
                                        View All Report
                                        <SquareArrowOutUpRight color="#333333" strokeWidth={1.25} />
                                    </Button>
                                </div>
                            </div>

                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-col gap-5">
                                {recentIncident?.map((incident, index) => (
                                    <div key={index} className={`
                                        rounded-lg flex flex-col gap-1 bg-gray-100
                                        `}>
                                        <div className="flex justify-between items-center pr-4">
                                            <div>
                                                <ul>
                                                    <div className="flex py-2 gap-2">
                                                        <div className="pt-2 pl-2">
                                                            <div className="w-[5.5px] h-[5.5px] bg-[#161CCA] rounded-full"></div>
                                                        </div>
                                                        <li className="flex flex-col">
                                                            <span className="text-gray-900">{incident.message}</span>
                                                            <span className="text-gray-600">User: {incident?.user?.firstname} {incident?.user?.lastname} </span>
                                                            <span className="text-gray-600">Utility Company: {incident?.organization?.businessName} </span>
                                                            <span className="text-gray-600 gap-1 flex items-center">
                                                                {new Date(incident.createdAt).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    })}
                                                                <div className="w-[4px] h-[4px] bg-[#6D6D6D] rounded-full"></div>
                                                                <Clock size={16} color="#6D6D6D" />
                                                                {new Date(incident.createdAt).toLocaleTimeString("en-US", {
                                                                        hour: "numeric",
                                                                        minute: "2-digit",
                                                                        hour12: true,
                                                                    })}
                                                            </span>

                                                        </li>
                                                    </div>

                                                </ul>
                                            </div>
                                            <div>
                                                <Button className=
                                                    {`
                                                    flex h-10 cursor-pointer rounded text-black items-center gap-2 
                                                    ${incident.status === true ? 'bg-green-100 border border-1 text-green-600 border-green-300' : ''}
                                                    ${incident.status === false ? 'bg-yellow-100 border border-1 text-yellow-600 border-yellow-300' : ''}
                                                `}
                                                >
                                                    {incident.status === false ? 'In Progress' : 'Resolved'}
                                                </Button>
                                            </div>
                                        </div>

                                    </div>

                                ))}
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}