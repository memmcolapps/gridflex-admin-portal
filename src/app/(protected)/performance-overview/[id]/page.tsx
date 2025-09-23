"use client";

import { useParams } from "next/navigation";
import PerformanceOverview from "@/components/utility-companies/performance-overview/perfomance-overview";

export default function PerformanceViewPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col gap-6">
      <PerformanceOverview
        params={{
          id: id,
        }}
      />
    </div>
  );
}
