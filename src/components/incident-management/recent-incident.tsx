'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { useIncidentReports } from "@/hooks/use-orgs";

export default function RecentIncidents() {
    const { data: incidents } = useIncidentReports()

    return (
        <div className="py-8">
            <div className="w-full">
                <div className="Recent Incidents">
                    <Card className="shadow-none gap-0 rounded-lg pb-6 pt-6 bg-white">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium">
                                Recent Incidents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-col gap-5">
                                {incidents?.data?.map((incident, index) => (
                                    <div key={index} className={`
                                        rounded-lg flex flex-col gap-1
                                        ${incident.status === false ? 'bg-red-100' : ''}
                                        ${incident.status === true ? 'bg-yellow-100' : ''}
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
                                                            {incident?.user && (
                                                            <span className="text-gray-600">User: `{incident.user.firstname} {incident.user.lastname} `</span>
                                                            )}
                                                            {incident?.organization && (
                                                            <span className="text-gray-600">Utility Company: {incident.organization.businessName} </span>
                                                            )}
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
                                                <Button
                                                    className="flex h-10 cursor-pointer text-black items-center border border-1 border-gray-400 gap-2 bg-gray-50 hover:bg-gray-100"
                                                >
                                                    Resolve
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
