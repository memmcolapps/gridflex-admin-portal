"use client";

import { Branding } from "../../components/auth/branding";
import { AdminSuccess } from "@/components/auth/admin-success";

export default function AdminLogin() {
  return (
    <div className="bg-background pb-70 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminSuccess />
        </div>
      </div>
    </div>
  );
}
