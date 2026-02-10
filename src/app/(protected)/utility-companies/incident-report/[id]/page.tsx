"use client";

import { useState } from "react";
import CompanyIncidentTable from "./incident-table";

export default function UtilityCompanyPage() {
  const [activeTab, setActiveTab] = useState<"unresolved" | "resolved">(
    "unresolved",
  );

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">
          Incident Management
        </h1>
        <p className="mt-1 text-lg text-gray-500">
          Manage and resolve incidents across all utility companies
        </p>
      </div>

      <div className="w-full">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("unresolved")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "unresolved"
                ? "text-black after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-black after:content-['']"
                : "text-gray-600 hover:text-gray-900"
            } `}
          >
            Unresolved
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "resolved"
                ? "text-black after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-black after:content-['']"
                : "text-gray-600 hover:text-gray-900"
            } `}
          >
            Resolved
          </button>
        </div>

        <div className="my-10">
          <CompanyIncidentTable
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
}
