import type { SearchProps } from "@/types/org.interfaces";
import SummaryCards from "./summary-cards";
import UtilityCompaniesTable from "./utility-companies-table";

export default function SummaryTab({filterParams}: SearchProps) {
  return (
    <div className="flex flex-col gap-6">
      <SummaryCards />
      <UtilityCompaniesTable filterParams={filterParams} />
    </div>
  );
}
