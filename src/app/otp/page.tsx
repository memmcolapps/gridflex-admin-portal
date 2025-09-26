"use client";

import { Suspense } from "react";
import OtpPage from "./otppage";

export default function OtpPageWrapper() {
  return (
    <Suspense>
      <OtpPage />
    </Suspense>
  );
}
