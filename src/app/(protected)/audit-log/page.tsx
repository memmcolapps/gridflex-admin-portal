'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Filter, ListFilter, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { AddNewAdminDialog } from "@/components/admin-management/admin-management-dialogs/add-new-admin-dialog";
import AuditSummaryTab from "@/components/audit-log/summary-tab";

const ALL_ROLES = [
    {
        role: 'Admin'
    },
    {
        role: 'Developer'
    },
    {
        role: 'Support'
    }
]

const ALL_STATUS = [
    {
        status: 'Active'
    },
    {
        status: 'Suspended'
    },
]

export default function AuditLog() {
    const [activeTab, setActiveTab] = useState("summary");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (data: UnifiedFormData) => {
        console.log("Submitted data:", data);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col gap-6 py-4">
            <div>
                <h1 className="text-2xl font-medium text-gray-900">
                    Audit Log
                </h1>
                <p className="mt-1 text-lg text-gray-500">
                    Track system events and user actions for security and accountability here.
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

                <div className="mt-6 mb-6 flex items-center justify-between overflow-visible">
                    <div className="flex gap-4 overflow-visible">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search by name, Role..."
                                className="h-11 w-70 bg-white"
                            />
                            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>

                        <Select>
                            <SelectTrigger className="w-full flex justify-center h-11 [&>svg]:hidden">
                                <div className="flex items-center gap-2">
                                    <ListFilter size={14} strokeWidth={1.5} />
                                    <SelectValue placeholder="Filter" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_ROLES.map((role, index) => (
                                    <SelectItem key={index} value={role.role}>
                                        {role.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full h-11 flex justify-center [&>svg]:hidden">
                                <div className="flex items-center gap-2">
                                    <ArrowDownUp size={14} strokeWidth={1.5} />
                                    <SelectValue placeholder="Sort" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_STATUS.map((status, index) => (
                                    <SelectItem key={index} value={status.status}>
                                        {status.status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {activeTab === "summary" && <AuditSummaryTab />}
            </div>

            <AddNewAdminDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSubmit}
            />
        </div>
    )
}