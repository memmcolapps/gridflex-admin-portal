import AuditLogTable from "./audit-log-table";

export default function AuditSummaryTab() {
  return (
    <div className="flex flex-col gap-6">
      <AuditLogTable />
    </div>
  );
}
