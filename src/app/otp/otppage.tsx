"use client";

import { Branding } from "../../components/auth/branding";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminOtpForm } from "@/components/auth/admin-otp-form";
import { useGenerateOtp } from "@/hooks/use-orgs";
import { toast } from "sonner";

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [error, setError] = useState("");

  const email = searchParams.get('email') || '';
  const generateOtpMutation = useGenerateOtp();

  useEffect(() => {
    if (!email) {
      toast.error('Session has expired , Please start again.')
      router.push('/forgotpassword');
    }
  }, [email, router])

  const handleSubmit = async (otp: string) => {
    setError("");
    try {
      router.push(`/resetpassword?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
    } catch {
      setError("Failed to verify OTP.  Try again.");
    }
  };

  const handleOtpResend = async () => {
    try {
      const result = await generateOtpMutation.mutateAsync({ username: email });

      if (result.success) {
        toast.success("New verification code sent to your email");
      } else {
        toast.error(result.message || "Failed to resend verification code");
      }
    } catch {
      toast.error("Failed to resend verification code");
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminOtpForm
            onSubmit={handleSubmit}
            email={email}
            onResendOtp={handleOtpResend}
            isResending={generateOtpMutation.isPending}
          />
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
