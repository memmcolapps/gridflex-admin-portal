import AdminManagementTable from "./admin-management-table";
import AdminSummaryCards from "./summary-cards";

export default function AdminSummaryTab() {
  return (
    <div className="flex flex-col gap-6">
      <AdminSummaryCards />
      <AdminManagementTable />
    </div>
  );
}
