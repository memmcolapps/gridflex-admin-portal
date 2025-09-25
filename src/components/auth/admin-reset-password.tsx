"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft, EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import Link from "next/link";

interface AdminAuthFormProps {
  onSubmit: (password: string) => void;
  initialPassword?: string;
}

export function AdminResetPassword({
  onSubmit,
  initialPassword = "",
}: AdminAuthFormProps) {
  const [password, setPassword] = useState(initialPassword);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    password.trim().length >= 8 &&
    confirmPassword.trim().length >= 8 &&
    password === confirmPassword;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-semibold">Reset Password</h2>
      <span className="block mb-6 text-center text-gray-600">
        Must be at least 8 characters
      </span>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 shadow-sm transition-colors focus:border-[#161CCA] focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 shadow-sm transition-colors focus:border-[#161CCA] focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`flex w-full mt-10 items-center justify-center gap-2 px-4 py-3 font-medium text-white transition-all duration-200 ${
            !isFormValid || isSubmitting
              ? "cursor-not-allowed bg-[#161CCA]/50"
              : "cursor-pointer bg-[#161CCA] hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Resetting...</span>
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
