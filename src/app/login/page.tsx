"use client";

import { Branding } from "../../components/auth/branding";
import { AdminAuthForm } from "../../components/auth/admin-auth-form";
// import { useAuth } from "../../../context/auth-context";

export default function AdminLogin() {
//   const { login } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    // await login(email, password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg"> {/* Increased from max-w-md to max-w-lg */}
        <Branding
          labelTitle="GridFlex"
          label="Admin Portal"
        />
        <div className="bg-white shadow-lg p-8 mt-8">
          <AdminAuthForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}