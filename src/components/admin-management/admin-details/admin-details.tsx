'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminResponse, useGetRecentActiviy } from "@/hooks/use-orgs";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";


export default function AdminDetails({ params }: { params: { id: string } }) {
    const id = params.id
    const { data: admin } = useGetAdminResponse()
    const { data: recentactivities } = useGetRecentActiviy()
    const adminData = admin?.data?.operators.find((a => a.id === id));
    const [activeTab, setActiveTab] = useState('summary');

    return (
        <div className="space-y-6 py-4">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Admin Detail
                </h1>
                <p className="mt-1 text-gray-500">
                    Manage Gridflex admin
                </p>
            </div>

            <div className="w-full">
                <div className="border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("summary")}
                        className={`relative pb-3 text-medium font-medium transition-colors ${activeTab === "summary"
                            ? "text-black after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-black after:content-['']"
                            : "text-gray-600 hover:text-gray-900"
                            } `}
                    >
                        Summary
                    </button>
                </div>

                <div className="grid grid-cols-1 pt-8 gap-6 lg:grid-cols-10">
                    <div className="space-y-4 lg:col-span-3">
                        <Card className="w-full rounded-lg pb-2 pt-6 gap-0 shadow-none bg-white">
                            <CardHeader>
                                <CardTitle key={adminData?.id} className="flex items-center gap-2 text-xl font-medium">
                                    <User color="#333333" strokeWidth={1.5} />
                                    <div className="flex flex-col">
                                        <span>{adminData?.firstname + ' ' + adminData?.lastname}</span>
                                        <div className="flex gap-4">
                                            <div>
                                                {adminData?.roles.map((role, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className={`rounded-sm px-2 py-1 font-semibold ${role.userRole === "SUPER_ADMIN"
                                                            ? "bg-green-50 text-green-700"
                                                            : role.userRole === "Developer"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-gray-100 text-gray-900"
                                                            }`}
                                                    >
                                                        {role.userRole}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div>
                                                {adminData?.status === true ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-green-50 rounded-sm px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                                                    >
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-red-50 rounded-sm px-2 py-1 font-normal text-red-700 hover:bg-red-50"
                                                    >
                                                        Suspended
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 py-0 pt-3">
                                <h3 className="text-lg font-normal text-gray-900">
                                    Contact information
                                </h3>
                                <div className="border border-gray-100 w-full px-0 "></div>
                                <ul>
                                    <li className="flex pt-2 items-center gap-3">
                                        <Mail color="#333333" size={16} strokeWidth={1} />
                                        <div className="mt-2 space-y-0">
                                            <p className="text-sm text-black">
                                                {adminData?.email}
                                            </p>
                                            <p className=" text-gray-400">Email</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone size={16} color="#333333" strokeWidth={1} />
                                        <div className="space-y-0">
                                            <p className="text-sm font-medium text-black">
                                                {adminData?.phoneNo}
                                            </p>
                                            <p className=" text-gray-400">Phone</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-7">
                        <Card className="shadow-none gap-0 rounded-lg pb-6 pt-6 bg-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-medium">
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex flex-col gap-5">
                                    {recentactivities?.data?.map((activity) => (
                                        <div key={activity.id} className="bg-gray-50 rounded-lg flex flex-col gap-1">

                                            <ul>
                                                <div className="flex py-2 gap-2">
                                                    <div className="pt-2 pl-2">
                                                        <div className="w-[5.5px] h-[5.5px]  bg-[#161CCA] rounded-full"></div>
                                                    </div>
                                                    <li className="flex flex-col">
                                                        <span className="text-black">{activity.description}</span>
                                                        <span className="text-gray-400">Ip Address:{activity.ipAddress} </span>
                                                        <span className="text-gray-400">User Agent:{activity.userAgent} </span>
                                                        <span className="text-gray-400">{activity.createdAt}</span>
                                                    </li>
                                                </div>

                                            </ul>
                                        </div>

                                    ))}
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}