"use client";

import { Branding } from "../../components/auth/branding";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminResetPassword } from "@/components/auth/admin-reset-password";
import { useResetPassword } from "@/hooks/use-orgs";
import { toast } from "sonner";

export default function ResetPassword () {
  const router = useRouter();
  const [error, setError] = useState("");
  const searchParams = useSearchParams()

  const email = searchParams.get('email') || ''
  const otp = searchParams.get('otp') || ''

  const resetPasswordMutation = useResetPassword();

  useEffect(() => {
    if(!email || !otp){
      toast.error("Session expired. Please start again.");
      router.push('/forgotpassword');
    }
  },[email, otp, router])

  const handleSubmit = async (password: string) => {
    setError("");
    try {
      const result = await resetPasswordMutation.mutateAsync({
        username: email,
        password: password,
        retype_password: password, 
        otp: otp
      })

      if(result.success) {
        toast.success(result.message || "Password reset successfully");
        router.push("/successpassword"); 
      } else {
        toast.error(result.message || "Failed to reset password");
        setError(result.message || "Failed to reset password");
      }
    } catch (error) {
      const errorMessage = "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
      console.error('Password reset error:', error);
    }
  };

  if(!email || !otp){
    return(
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
    )
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminResetPassword 
          onSubmit={handleSubmit}
          isLoading= {resetPasswordMutation.isPending}
           />
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
