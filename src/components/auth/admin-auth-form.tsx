"use client";

import type React from "react";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";

interface AdminAuthFormProps {
  onSubmit: (email: string, password: string) => void;
  initialEmail?: string;
  initialPassword?: string;
}

export function AdminAuthForm({
  onSubmit,
  initialEmail = "",
  initialPassword = "",
}: AdminAuthFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(email, password);
    } catch {
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors focus:border-[#161CCA] focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 shadow-sm transition-colors focus:border-[#161CCA] focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={12} /> : <EyeIcon size={12} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`flex w-full items-center justify-center gap-2 py-3 px-4 font-medium text-white transition-all duration-200 ${
            !isFormValid || isSubmitting
              ? "cursor-not-allowed bg-[#161CCA]"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin" size={20} />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}