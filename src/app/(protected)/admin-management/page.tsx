'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { AddNewAdminDialog } from "@/components/admin-management/admin-management-dialogs/add-new-admin-dialog";
import AdminSummaryTab from "@/components/admin-management/summary-tab";

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

export default function AdminManagement() {
    const [activeTab, setActiveTab] = useState("summary");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (data: UnifiedFormData) => {
        console.log("Submitted data:", data);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col gap-6 py-4">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Admin Management
                </h1>
                <p className="mt-1 text-gray-500">
                    Manage administrators who oversee utility companies on the GridFlex platform
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

                <div className="mt-6 mb-6 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search by name, Email..."
                                className="h-11 w-70 bg-white"
                            />
                            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>

                        <Select>
                            <SelectTrigger className="w-[100px] h-11">
                                <SelectValue placeholder="All Roles" />
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
                            <SelectTrigger className="w-[100px] h-11">
                                <SelectValue placeholder="All Status" />
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

                    <Button
                        className="flex h-11 cursor-pointer items-center border border-1 border-black gap-2 bg-[var(--primary)] hover:bg-gray-800"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <Plus size={16} />
                        Add New Admin
                    </Button>
                </div>


            {activeTab === "summary" && <AdminSummaryTab />}
            </div>

            <AddNewAdminDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSubmit}
            />
        </div>
    )
}