"use client";

import { Branding } from "../../components/auth/branding";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminForgotPassword } from "@/components/auth/admin-forgot-form";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (email: string) => {
    setError("");
    try {
      router.push("/otp"); 
    } catch (err) {
      setError("Failed to send reset password link. Try again.");
    }
  };

// const handleSubmit = async (email: string, password: string) => {
//     setError("");
//     const success = await login({ username: email, password });
//     if (success) {
//       router.push("/dashboard");
//     } else {
    // setError("Failed to send reset password link. Try again.");
//     }
//   };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminForgotPassword onSubmit={handleSubmit} />
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
