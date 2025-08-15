"use client";

import PerformanceOverview from "@/components/utility-companies/performance-overview/performance-overview";
import { useState } from "react";

export default function PerformanceViewPage() {
  return (
    <div className="flex flex-col gap-4">

     
      <PerformanceOverview params={{
        slug: ""
      }} />
    </div>
  );
}
