"use client";

import AdminDetails from "@/components/admin-management/admin-details/admin-details";
import { useParams } from "next/navigation";


export default function AdminDetailsView() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex flex-col gap-4">
      <AdminDetails
        params={{
          id: id,
        }}
      />
    </div>
  );
}
