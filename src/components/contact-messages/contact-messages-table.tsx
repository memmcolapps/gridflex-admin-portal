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
// import { useGetOrgs } from "@/hooks/use-orgs";

interface Contact {
    id: string
    organization: string
    email: string
    message: string
    size: string
    status: boolean
    lastLogin: string
}

const CONTACT_DATA = [
    {
        id: '1',
        organization: 'TechCorp Solutions',
        email: 'Deyemioyewo@gmail.com',
        message: 'Interested in your enterprise solution for our growing team. We are looking for a comprehensive platform that can handle our workflow management and team collaboration needs. Please provide more details about pricing and implementation timeline.',
        size: '1-50',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '2',
        organization: 'StartupXYZ',
        email: 'Deyemioyewo@gmail.com',
        message: 'We are a fast-growing startup looking for scalable solutions. Can you provide information about your startup packages and any available discounts for early-stage companies? Our team is expanding rapidly and we need tools that can grow with us.',
        size: '51-100',
        status: false,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '3',
        organization: 'Enterprise Global',
        email: 'Deyemioyewo@gmail.com',
        message: 'Our enterprise requires a robust solution that can handle multiple departments and complex workflows. We have specific compliance requirements and need to ensure data security. Could you schedule a demo to discuss our needs in detail?',
        size: '51-100',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '4',
        organization: 'MidSize Corp',
        email: 'Deyemioyewo@gmail.com',
        message: 'Looking to modernize our current systems and improve efficiency across our organization. We are particularly interested in automation features and integration capabilities with our existing tools.',
        size: '51-100',
        status: true,
        lastLogin: '2024-01-15 09:30',
    },
    {
        id: '5',
        organization: 'Creative Agency Plus',
        email: 'Deyemioyewo@gmail.com',
        message: 'As a creative agency, we need flexible project management tools that can adapt to our unique workflows. We work with multiple clients simultaneously and need better visibility into project progress and resource allocation.',
        size: '101-200',
        status: false,
        lastLogin: '2024-01-15 09:30',
    },
];

export default function ContactMessagesTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [contactData, setContactData] = useState<Contact[]>(CONTACT_DATA);

    const handleViewDetails = (contact: Contact) => {
        setSelectedContact(contact);
        setIsViewDialogOpen(true);
    };

    const handleMarkAsRead = (contactId: string) => {
        setContactData(prevData =>
            prevData.map(contact =>
                contact.id === contactId
                    ?
                    { ...contact, status: false }
                    : contact))
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
                        {contactData.map((data) => (
                            <TableRow key={data.id} className="hover:bg-gray-50">
                                <TableCell className="py-6 pl-6">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {data.organization}
                                        </div>
                                        <div className="text-xs text-gray-500">{""}</div>
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm font-medium text-gray-900">
                                    {data.size}
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
                                    {data.lastLogin}
                                </TableCell>
                                <TableCell>
                                    {data.status === true ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-50 rounded-sm px-2 py-1 font-semibold text-green-700 hover:bg-green-50"
                                        >
                                            New
                                        </Badge>
                                    ) : (
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
                                                disabled={!data.status} 
                                            >
                                                <SquareCheckBig className="mr-2 text-black" />
                                                Mark as read
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

            {/* Dialogs */}
            <ViewDetailsDialog
                isOpen={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
                selectedContact={selectedContact}
            />
        </Card>
    );
}