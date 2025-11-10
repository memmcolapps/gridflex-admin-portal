import type { SearchProps } from "@/types/org.interfaces";
import AnalysisGraph from "./analysis-graph";
import AnalysisSummaryCards from "./summary-cards";

export default function AnalysisSummaryTab({ filterParams}: SearchProps) {
  return (
    <div className="flex pt-6 flex-col gap-6">
      <AnalysisSummaryCards filterParams={filterParams} />
      <AnalysisGraph/>
    </div>
  );
}
