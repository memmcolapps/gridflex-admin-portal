// summary-tab.tsx
import SummaryCards from "./summary-cards";
import UtilityCompaniesTable from "./utility-companies-table";

export default function SummaryTab() {
  return (
    <div className="flex flex-col gap-6">
      <SummaryCards />

      <UtilityCompaniesTable />
    </div>
  );
}
