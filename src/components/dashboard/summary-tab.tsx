import DashboardAnalysisGraph from "./analysis-graph";
import DashboardSummaryCards from "./dashboard-cards";
import DasboardIncidentReports from "./dashboard-table";

export default function DashboardSummaryTab() {
  return (
    <div className="flex flex-col mt-6 gap-6">
      <DashboardSummaryCards />
      <DashboardAnalysisGraph/>
      <DasboardIncidentReports />
    </div>
  );
}
