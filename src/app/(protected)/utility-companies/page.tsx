"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import SummaryTab from "@/components/utility-companies/summary-tab";
import { AddNewUtilityCompanyDialog } from "@/components/utility-companies/utility-companies-dialogs/add-new-utility-company-dialog";
import type { UnifiedFormData } from "@/types/unifiedForm";

export default function UtilityCompaniesPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (data: UnifiedFormData) => {
    console.log("Submitted data:", data);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Utility Companies
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all utility organizations using GridFlex
        </p>
      </div>

      <div className="w-full">
        <div className="border-b border-gray-200">
          <button
            onClick={() => setActiveTab("summary")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "summary"
                ? "text-black after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-black after:content-['']"
                : "text-gray-600 hover:text-gray-900"
            } `}
          >
            Summary
          </button>
        </div>

        <div className="mt-6 mb-6 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Companies..."
              className="h-9 w-64 pl-9"
            />
          </div>

          <Button
            className="flex h-9 cursor-pointer items-center gap-2 bg-black hover:bg-gray-800"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus size={16} />
            Add Company
          </Button>
        </div>

        {activeTab === "summary" && <SummaryTab />}
      </div>

      <AddNewUtilityCompanyDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
