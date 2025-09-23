'use client'

import { useState } from "react";
import AnalysisSummaryTab from "@/components/analysis/summary-tab";
import { DatePicker } from "@/components/atoms/date-picker";

export default function Analysis() {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div className="flex flex-col gap-6 py-4">
            <div>
                <h1 className="text-2xl font-medium text-gray-900">
                Analysis
                </h1>
                <p className="mt-1 text-lg text-gray-500">
                Real-time system monitoring and incident tracking
                </p>
            </div>
            <div>
                <DatePicker placeHolder={"Today"} className={"w-30"}/>
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

            {activeTab === "summary" && <AnalysisSummaryTab />}
            </div>
        </div>
    )
}