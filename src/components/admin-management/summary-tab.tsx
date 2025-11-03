import type { SearchProps } from "@/types/org.interfaces";
import AdminManagementTable from "./admin-management-table";
import AdminSummaryCards from "./summary-cards";

export default function AdminSummaryTab({ filterParams }: SearchProps) {
  return (
    <div className="flex flex-col gap-6">
      <AdminSummaryCards />
      <AdminManagementTable filterParams={filterParams}/>
    </div>
  );
}
