"use client";

import { Branding } from "../../components/auth/branding";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminForgotPassword } from "@/components/auth/admin-forgot-form";
import { toast } from "sonner";
import { useGenerateOtp } from "@/hooks/use-orgs";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [email, setEmail] = useState('');
  const generateOtpMutation = useGenerateOtp();

  const handleEmailSubmit = async ({ username }: { username: string }) => {
    try {
      const result = await generateOtpMutation.mutateAsync( {username} ); 
      // 👆 send username object to backend
  
      if (result.success) {
        setEmail(username); // store it in local state
        toast.success(result.message || "Verification code sent to your email");
        router.push("/otp");
      } else {
        toast.error(result.message || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
      throw error;
    }
  };
  


  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminForgotPassword  
          onSubmit={handleEmailSubmit}
          initialEmail={email}
          isLoading={generateOtpMutation.isPending} />
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
