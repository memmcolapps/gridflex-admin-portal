'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dot, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";

const RECENT_ACTIVITIES = [
    {
        action: 'Created a new utility',
        name: 'IBDEC',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        userAgent: 'Google Chrome (Windows)',
        date: '12/8/2024',
        time: '3:15:00 PM'
    },
    {
        action: 'Added a new admin',
        name: 'Chinedu Okafor (Admin) ',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        userAgent: 'Google Chrome (Windows)',
        date: '12/8/2024',
        time: '3:15:00 PM'
    },
    {
        action: 'Created a new utility',
        name: 'IBDEC',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        userAgent: 'Google Chrome (Windows)',
        date: '12/8/2024',
        time: '3:15:00 PM'
    },
    {
        action: 'Added a new admin',
        name: 'Chinedu Okafor (Admin) ',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        userAgent: 'Google Chrome (Windows)',
        date: '12/8/2024',
        time: '3:15:00 PM'
    },
    {
        action: 'Created a new utility',
        name: 'IBDEC',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        userAgent: 'Google Chrome (Windows)',
        date: '12/8/2024',
        time: '3:15:00 PM'
    },
]

const ADMIN_DATA = [
    {
        id: '1',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        role: 'Admin',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '2',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        role: 'Developer',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        status: false,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '3',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Developer',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '4',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Support',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '5',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Developer',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
]

export default function AdminDetails({ params }: { params: { id: string } }) {
    const id = params.id
    const admin = ADMIN_DATA.find((a) => a.id === id);
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
                                <CardTitle key={admin?.id} className="flex items-center gap-2 text-xl font-medium">
                                    <User color="#333333" strokeWidth={1.5} />
                                    <div className="flex flex-col">
                                        <span>{admin?.firstName + ' ' + admin?.lastName}</span>
                                        <div className="flex gap-4">
                                            <div>
                                                {admin?.role === 'Developer' && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-100 rounded-sm px-2 py-1 text-[var(--primary)] hover:bg-primary/80"
                                                    >
                                                        Developer
                                                    </Badge>
                                                )}
                                                {admin?.role === 'Admin' && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-green-50 rounded-sm px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                                                    >
                                                        Admin
                                                    </Badge>
                                                )}
                                                {admin?.role === 'Support' && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-50 rounded-sm px-2 py-1 font-normal text-gray-900 hover:bg-green-50"
                                                    >
                                                        Support
                                                    </Badge>
                                                )}
                                            </div>

                                            <div>
                                                {admin?.status === true ? (
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
                                            <p className="text-sm font-medium text-black">
                                                {admin?.email}
                                            </p>
                                            <p className=" text-gray-400">Email</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone size={16} color="#333333" strokeWidth={1} />
                                        <div className="space-y-0">
                                            <p className="text-sm font-medium text-black">
                                                {admin?.phoneNumber}
                                            </p>
                                            <p className=" text-gray-400">Phone</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <MapPin size={16} color="#333333" strokeWidth={1} />
                                        <div className="space-y-0">
                                            <p className="text-sm font-medium text-black">
                                                {admin?.address}
                                            </p>
                                            <p className=" text-gray-400">Address</p>
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
                                    {RECENT_ACTIVITIES.map((activity, index) => (
                                        <div key={index}  className="bg-gray-50 rounded-lg flex flex-col gap-1">

                                            <ul>
                                                <div className="flex py-2">
                                                    <div className="">
                                                        <Dot color="#161CCA" size={40} />
                                                    </div>
                                                    <li className="flex flex-col">
                                                        <span className="text-black">{activity.action + ': ' + activity.name}</span>
                                                        <span className="text-gray-400">Ip Address:{activity.ipAddress} </span>
                                                        <span className="text-gray-400">User Agent:{activity.userAgent} </span>
                                                        <span className="text-gray-400">{activity.date + ', ' + activity.time}</span>
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