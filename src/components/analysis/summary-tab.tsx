import AnalysisGraph from "./analysis-graph";
import AnalysisSummaryCards from "./summary-cards";

export default function AnalysisSummaryTab() {
  return (
    <div className="flex pt-6 flex-col gap-6">
      <AnalysisSummaryCards />
      <AnalysisGraph/>
    </div>
  );
}
