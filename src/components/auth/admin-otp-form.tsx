"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import OtpInput from "react-otp-input";

interface AdminOtpFormProps {
  onSubmit: (otp: string) => void;
  email?: string;
  onResendOtp?: () => void;
  isResending?: boolean;
}

export function AdminOtpForm({ 
  onSubmit, 
  email = "", 
  onResendOtp,
  isResending = false 
}: AdminOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = otp.trim().length === 4;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(otp); 
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending || !onResendOtp) return;
    await onResendOtp();
    setOtp(""); 
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Enter Verification Code
      </h2>
      <span className="block mb-6 text-center text-gray-600">
        We sent an OTP code to <strong>{email}</strong>
      </span>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            shouldAutoFocus
            renderSeparator={<span className="mx-4"></span>}
            inputStyle={{
              width: "60px",
              height: "60px",
            }}
            renderInput={(props) => (
              <input
                {...props}
                className="border rounded-md text-center text-3xl focus:outline-none focus:ring-[1.1px] focus:ring-[#161CCA]"
              />
            )}
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
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Code"
          )}
        </button>

        <div className="flex flex-col items-center gap-6 justify-center">
          <span className="mt-2 text-center">
           {`Didn't receive the email?`}
            <button
              type="button"
              className="text-[#161CCA] hover:underline disabled:opacity-50"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Click here to resend"}
            </button>
          </span>

          <Link
            className="mt-4 flex items-center gap-2 text-md text-black transition-colors hover:text-blue-800 hover:underline"
            href="/reset-password"
          >
            <ArrowLeft size={18} color="#161CCA" strokeWidth={1.5} />
            <span>Back</span>
          </Link>
        </div>
      </form>
    </div>
  );
}