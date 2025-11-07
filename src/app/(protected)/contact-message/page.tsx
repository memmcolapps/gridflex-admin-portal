'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { AddNewAdminDialog } from "@/components/admin-management/admin-management-dialogs/add-new-admin-dialog";
import { DatePicker } from "@/components/atoms/date-picker";
import ContactSummaryTab from "@/components/contact-messages/summary-tab";

const ALL_ROLES = [
    {
        role: '1-50 (Employees)'
    },
    {
        role: '51-100 (Employees)'
    },
    {
        role: '101 and Above (Employees)'
    }
]

const ALL_STATUS = [
    {
        status: 'New'
    },
    {
        status: 'Read'
    },
]

export default function ContactMessage() {
    const [activeTab, setActiveTab] = useState("summary");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [selecetdStatus, setSelectedStatus] = useState<string>("")
    const [selecetdDate, setSelectedDate] = useState<string>("")


    const handleSubmit = (data: UnifiedFormData) => {
        console.log("Submitted data:", data);
        setIsDialogOpen(false);
    };

    const filterParams = {
        ...(selecetdStatus && selecetdStatus !== "all" && {status: selecetdStatus}),
        ...(selectedSize && selectedSize !== "all" && {organizationSize: selectedSize}),
        ...(searchQuery && {searchTerm: searchQuery}),
        ...(selecetdDate && {dateEntered: selecetdDate})
    }

    return (
        <div className="flex flex-col gap-6 py-4">
            <div>
                <h1 className="text-2xl font-medium text-gray-900">
                    Contact Messages
                </h1>
                <p className="mt-1 text-lg text-gray-500">
                    Manage and respond to incoming inquiries
                </p>
            </div>

            <div className="w-full">
                <div className="border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("summary")}
                        className={`relative pb-3 text-base font-normal transition-colors ${activeTab === "summary"
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
                                placeholder="Search by organization, Email..."
                                className="h-10 w-70 bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>

                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="All Sizes" />
                            </SelectTrigger>
                            <SelectContent >
                            <SelectItem value="all">All Sizes</SelectItem>
                                {ALL_ROLES.map((role, index) => (
                                    <SelectItem key={index} value={role.role}>
                                        {role.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selecetdStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-35 h-10">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                                {ALL_STATUS.map((status, index) => (
                                    <SelectItem key={index} value={status.status}>
                                        {status.status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="w-full">
                            <DatePicker value={selecetdDate} onChange={setSelectedDate} placeHolder={"Date Range"} className={"w-35"} />
                        </div>

                    </div>
                </div>


                {activeTab === "summary" && <ContactSummaryTab filterParams={filterParams} />}
            </div>

            <AddNewAdminDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSubmit}
            />
        </div>
    )
}