'use client'

import { useState } from "react";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { AddNewAdminDialog } from "@/components/admin-management/admin-management-dialogs/add-new-admin-dialog";
import DashboardSummaryTab from "@/components/dashboard/summary-tab";

export default function DashboardPage() {
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
          Dashboard
        </h1>
        <p className="mt-1 text-lg text-gray-500">
          Overview of all utility companies
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

        {activeTab === "summary" && <DashboardSummaryTab />}
      </div>

      <AddNewAdminDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  )
}