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
import { useGetAuditLog } from "@/hooks/use-orgs";

export default function AuditLogTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: auditLog } = useGetAuditLog()
    const auditData = auditLog?.data
    const itemsPerPage = 10;
    const totalPages = Math.ceil(
      (auditData?.data.length || 0) / itemsPerPage,
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = auditData?.data.slice(startIndex, endIndex) || [];

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10; 
        
        for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
            pages.push(i);
        }
        
        if (totalPages > maxVisiblePages) {
            pages.push('...');
            for (let i = Math.max(maxVisiblePages + 1, totalPages - 2); i <= totalPages; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

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
                        {currentPageData.map((data) => (
                            <TableRow key={data.id} className="hover:bg-gray-50">
                                <TableCell className="py-4 pl-6">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            <div>
                                                <div>
                                                    {data.username}
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
                                    <Badge
                                        variant="secondary"
                                        className={`rounded-sm px-2 py-1 font-semibold ${data.role === "SUPER_ADMIN"
                                            ? "bg-green-50 text-green-700"
                                            : data.role === "Developer"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-900"
                                            }`}
                                    >
                                        {data.role}
                                    </Badge>
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
                                    {data.timeStamp}
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
                        {getPageNumbers().map((page, index) => (
                            page === '...' ? (
                                <span key={index} className="px-2 text-gray-400">...</span>
                            ) : (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                        : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </Button>
                            )
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
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