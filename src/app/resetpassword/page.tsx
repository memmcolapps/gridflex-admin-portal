"use client";

import { Suspense } from "react";
import ResetPassword from "./resetpassword";

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
