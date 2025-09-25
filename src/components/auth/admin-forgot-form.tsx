"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";

interface AdminAuthFormProps {
  onSubmit: (email: string) => void; 
  initialEmail?: string;
}

export function AdminForgotPassword({
  onSubmit,
  initialEmail = "",
}: AdminAuthFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = email.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } catch {
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors focus:border-[#161CCA] focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}

          className={`flex w-full items-center justify-center gap-2 px-4 py-3 font-medium text-white transition-all duration-200 ${
            !isFormValid || isSubmitting
              ? "cursor-not-allowed bg-[#161CCA]/50"
              : "cursor-pointer bg-[#161CCA] hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Reseting...</span>
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        <div className="flex justify-center">
          <Link
            className="text-md mt-4 text-black transition-colors hover:text-blue-800 hover:underline"
            href="/login"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft size={18} color="#161CCA" strokeWidth={1.5} />
              <span>Back to login</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
