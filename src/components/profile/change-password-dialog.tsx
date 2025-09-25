"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/use-orgs";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface AdminData {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  defaultPassword?: string;
  phoneNo?: string;
}

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContact?: AdminData | null;
  initialData?: Partial<UnifiedFormData>;
}

export const ChangePasswordDialog = ({
  isOpen,
  onOpenChange,
//   initialData,
  selectedContact,
}: Props) => {
  const [formData, setFormData] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    otp: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    mutate: updateAdmin,
    isError,
    error,
    isSuccess,
    isPending,
  } = useUpdateProfile(String(selectedContact?.id ?? ""));

  useEffect(() => {
    if (!isOpen) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "", otp: "" });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.oldPassword.trim().length > 0 &&
    formData.newPassword.trim().length >= 8 &&
    formData.confirmPassword === formData.newPassword &&
    formData.otp.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // updateAdmin(formData, {
    //   onSuccess: () => {
    //     toast.success("Password updated successfully!");
    //     onOpenChange(false);
    //   },
    //   onError: (error) => {
    //     toast.error("Failed to update password");
    //     console.error("Update error:", error);
    //   },
    // });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[580px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="border-b my-4"></div>

        <div className="space-y-2">
          <Label htmlFor="oldPassword">
            Old Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showOld ? "text" : "password"}
              className="w-full h-12 pr-12"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter Old Password"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {showOld ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">
            New Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNew ? "text" : "password"}
              className="w-full h-12 pr-12"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {showNew ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              className="w-full h-12 pr-12"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">
            OTP <span className="text-red-500">*</span>
          </Label>
          <Input
            id="otp"
            name="otp"
            type="text"
            className="w-full h-12"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
          />
          <Link href="" onClick={(e) => e.preventDefault()}>
            <span className="flex justify-start text-[var(--primary)] mt-0">
              Get OTP
            </span>
          </Link>
        </div>

        {isError && (
          <div className="mt-2 text-sm text-red-500">
            {error?.message || "Failed to update password"}
          </div>
        )}
        {isSuccess && (
          <div className="mt-2 text-sm text-green-600">
            Password updated successfully!
          </div>
        )}

        <DialogFooter>
          <div className="flex mt-10 w-full justify-between gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
              className="border-[var(--primary)] px-6 py-6 rounded-sm bg-white text-[#161CCA] hover:text-[#161CCA]"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#161CCA] px-6 py-6 rounded-sm text-white hover:bg-[#161CCA]"
              onClick={handleSubmit}
              disabled={
                // !isFormValid
                //  ||
                  isPending
                }
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
