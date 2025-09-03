import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
// import { useGetOrgs } from "@/hooks/use-orgs";

const ADMIN_DATA = [
    {
        id: '1',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        role: 'Admin',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
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
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
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
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
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
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
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
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '6',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        role: 'Admin',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '7',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        role: 'Developer',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        status: false,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '8',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Developer',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '9',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Support',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '10',
        firstName: 'Adeyemi',
        lastName: ' Oyewo',
        email: 'Deyemioyewo@gmail.com',
        phoneNumber: '+234 810 XXX XXXX',
        address: '12 Adeola Odeku St, Lagos',
        role: 'Developer',
        activity: 'Created a new utility: IBDEC',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
]

export default function AuditLogTable() {
    const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 10;
    // const { data: utilityCompaniesData, isLoading, isError } = useGetOrgs();
    // const totalPages = Math.ceil(
    //   (utilityCompaniesData?.organizations.length || 0) / itemsPerPage,
    // );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-medium">
                    Audit Logs
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow
                            className="border-b border-black hover:bg-[hsla(0,0%,20%,0.1)]"
                            style={{ backgroundColor: "hsla(0, 0%, 96%)" }}
                        >
                            <TableHead className="h-12 pl-6 text-base font-medium text-gray-700">
                                Admin Name
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Role
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Activity
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                User Agent
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Ip Address
                            </TableHead>
                            <TableHead className="pr-6 text-right text-base font-medium text-gray-700">
                                Time Stamp
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ADMIN_DATA.map((data) => (
                            <TableRow key={data.id} className="hover:bg-gray-50">
                                <TableCell className="py-4 pl-6">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            <div>
                                                <div>
                                                    {data.firstName +
                                                        " " +
                                                        data.lastName}
                                                </div>
                                                <div>
                                                    {data.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">{""}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-900">
                                    {data.role === 'Developer' && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 rounded-sm px-2 py-1 text-[var(--primary)] hover:bg-blue-100"
                                        >
                                            Developer
                                        </Badge>
                                    )}
                                    {data.role === 'Admin' && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-50 rounded-sm px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                                        >
                                            Admin
                                        </Badge>
                                    )}
                                    {data.role === 'Support' && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-50 rounded-sm px-2 py-1 font-normal text-gray-900 hover:bg-blue-50"
                                        >
                                            Support
                                        </Badge>
                                    )}
                                </TableCell>

                                <TableCell className="text-sm font-normal text-gray-900">
                                    {data.activity}
                                </TableCell>

                                <TableCell className="py-4">
                                    {data.userAgent}
                                </TableCell>

                                <TableCell>
                                    {data.ipAddress}
                                </TableCell>
                                <TableCell className="text-sm text-gray-900">
                                    {data.lastLogin}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-6 py-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
                    >
                        <ArrowLeft color="#414651" strokeWidth={1.75} />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                                    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}
                        <span className="px-2 text-gray-400">...</span>
                        {[8, 9, 10].map((page) => (
                            <Button
                                key={page}
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                                    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="lg"
                        // onClick={() =>
                        //   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        // }
                        // disabled={currentPage === totalPages}
                        className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
                    >
                        Next
                        <ArrowRight color="#414651" strokeWidth={1.75} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
