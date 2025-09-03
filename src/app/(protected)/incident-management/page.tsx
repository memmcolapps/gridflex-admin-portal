'use client'

import { useState } from "react";
import RecentIncidents from "@/components/incident-management/recent-incident";

export default function IncidentManagement() {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div className="flex flex-col gap-6 py-4">
            <div>
                <h1 className="text-2xl font-medium text-gray-900">
                    Incident Management
                </h1>
                <p className="mt-1 text-lg text-gray-500">
                    Track, review, and resolve issues reported by users or detected automatically.
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

                {activeTab === "summary" && <RecentIncidents />}
            </div>
        </div>
    )
}