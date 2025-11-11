import { useEffect, useState } from "react";
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
    MoreVertical,
    Eye,
    ArrowLeft,
    ArrowRight,
    SquareCheckBig,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewDetailsDialog } from "./contact-messages-dialog/view-messages-dialog";
import { useGetContactMessages, useMarkContact } from "@/hooks/use-orgs";
import { toast } from "sonner";
import type { SearchProps } from "@/types/org.interfaces";
// import { useGetOrgs } from "@/hooks/use-orgs";

interface Contact {
    id: string
    organizationName: string
    email: string
    message: string
    organizationSize: string
    status: string
    // lastLogin: string
    createdAt: string
}

const SkeletonRow = () => (
    <TableRow className="hover:bg-gray-50">
        <TableCell className="py-4 pl-6">
            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </TableCell>
        <TableCell className="py-4">
            <div className="flex flex-col gap-2">
                <div className="h-3 w-26 bg-gray-100 rounded animate-pulse"></div>
            </div>
        </TableCell>
        <TableCell className="py-4">
            <div className="h-3 w-26 bg-gray-100 rounded animate-pulse"></div>
        </TableCell>
        <TableCell className="py-4">
            <div className="h-3 w-26 bg-gray-100 rounded animate-pulse"></div>
        </TableCell>
        <TableCell className="py-4">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell className="py-4">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell className="pr-6 text-right">
            <div className="flex justify-end">
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </TableCell>
    </TableRow>
);

export default function ContactMessagesTable({ filterParams }: SearchProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const { mutate: markContact } = useMarkContact();

    const apiParams = filterParams?.organizationSize === "all"
        ? {
            searchTerm: filterParams?.searchTerm,
            status: filterParams?.status,
            dateEntered: filterParams?.dateEntered
        }
        : filterParams;

    const { data: contact, isLoading, error } = useGetContactMessages(apiParams);
    const contactInfo = contact?.data?.messages ?? [];
    const itemsPerPage = 10;
    const totalPages = Math.ceil(
        (contactInfo?.length || 0) / itemsPerPage,
    );

    const skeletonItems = Array(itemsPerPage).fill(0);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [filterParams]);

    const handleViewDetails = (contact: Contact) => {
        setSelectedContact(contact);
        setIsViewDialogOpen(true);
    };

    const handleMarkAsRead = (contactId: string) => {
        markContact(
            { id: contactId },
            {
                onSuccess: () => {
                    toast.success(`${selectedContact?.organizationName} suspended successfully`);
                },
                onError: (err) => {
                    toast.error(`Failed to suspend ${selectedContact?.organizationName}`);
                    console.error(err);
                },
            }
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-red-500">Failed to load contact messages</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-medium">
                    Messages
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
                                Organization
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Size
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Contact
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Message Preview
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Date
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Status
                            </TableHead>
                            <TableHead className="pr-6 text-right text-base font-medium text-gray-700">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            skeletonItems.map((_, index) => (
                                <SkeletonRow key={index} />
                            ))
                        ) :
                            contactInfo.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No contact message found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contactInfo.map((data) => (
                                    <TableRow key={data.id} className="hover:bg-gray-50">
                                        <TableCell className="py-6 pl-6">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {data.organizationName}
                                                </div>
                                                <div className="text-xs text-gray-500">{""}</div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-sm font-medium text-gray-900">
                                            {data.organizationSize}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-900">
                                            {data.email}
                                        </TableCell>
                                        <TableCell className="py-4 max-w-xs">
                                            <div className="truncate text-sm text-gray-900">
                                                {data.message}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-900">
                                            {data.createdAt}
                                        </TableCell>
                                        <TableCell>
                                            {data.status === 'New' && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-50 rounded-sm px-2 py-1 font-semibold text-green-700 hover:bg-green-50"
                                                >
                                                    New
                                                </Badge>
                                            )
                                            }
                                            {data.status === 'Read' && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-yellow-50 rounded-sm px-2 py-1 font-semibold text-yellow-700 hover:bg-yellow-50"
                                                >
                                                    Read
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="pr-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 bg-white p-0 shadow-sm hover:bg-gray-50"
                                                    >
                                                        <MoreVertical size={16} className="text-gray-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="center">
                                                    <DropdownMenuItem
                                                        className="align-items-center cursor-pointer"
                                                        onClick={() => handleViewDetails(data)}
                                                    >
                                                        <Eye size={14} className="mt-1 mr-2 text-black" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="align-items-center cursor-pointer"
                                                        onClick={() => handleMarkAsRead(data.id)}
                                                        disabled={data.status === 'Read'}
                                                    >
                                                        <SquareCheckBig className="mr-2 text-black" />
                                                        Mark as read
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                                )
                            )}
                    </TableBody>
                </Table>

                {contactInfo.length > 0 && (
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
                )}

            </CardContent>

            {/* Dialogs */}
            <ViewDetailsDialog
                isOpen={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
                selectedContact={selectedContact}
            />
        </Card>
    );
}