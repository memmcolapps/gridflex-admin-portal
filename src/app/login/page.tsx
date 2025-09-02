"use client";

import { Branding } from "../../components/auth/branding";
import { AdminAuthForm } from "../../components/auth/admin-auth-form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (email: string, password: string) => {
    setError("");
    const success = await login({ username: email, password });
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials or login failed.");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Branding labelTitle="GridFlex" label="Admin Portal" />
        <div className="mt-8 bg-white p-8 shadow-lg">
          <AdminAuthForm onSubmit={handleSubmit} />
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
