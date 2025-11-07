import ContactMessagesTable from "./contact-messages-table";
import type { SearchProps } from "@/types/org.interfaces";

export default function ContactSummaryTab({ filterParams}: SearchProps) {
  return (
    <div className="flex flex-col gap-6">
      <ContactMessagesTable filterParams={filterParams} />
    </div>
  );
}
