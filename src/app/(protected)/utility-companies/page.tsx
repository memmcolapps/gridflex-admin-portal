// page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import SummaryTab from "@/components/utility-companies/summary-tab";

export default function UtilityCompaniesPage() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Utility Companies
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all utility organizations using GridFlex
        </p>
      </div>

      {/* Custom Tab Implementation */}
      <div className="w-full">
        {/* Tab List with full width border */}
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

        {/* Search and Add Company Row */}
        <div className="mt-6 mb-6 flex items-center justify-between">
          {/* Search on the left */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search Companies..."
              className="h-9 w-64 pl-9"
            />
          </div>

          {/* Add Company on the right */}
          <Button className="flex h-9 items-center gap-2 bg-black hover:bg-gray-800">
            <Plus size={16} />
            Add Company
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "summary" && <SummaryTab />}
      </div>
    </div>
  );
}
