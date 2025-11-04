import type { SearchProps } from "@/types/org.interfaces";
import AuditLogTable from "./audit-log-table";

export default function AuditSummaryTab({ filterParams }: SearchProps) {
  return (
    <div className="flex flex-col gap-6">
      <AuditLogTable filterParams={filterParams} />
    </div>
  );
}