"use client";

import PerformanceOverview from "@/components/utility-companies/performance-overview/performance-overview";

export default function PerformanceViewPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
    <PerformanceOverview params={{
              slug: ""
          }} />
    </div>
  );
}
