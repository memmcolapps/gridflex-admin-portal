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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useChangePassword } from "@/hooks/use-orgs";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangePasswordDialog = ({
  isOpen,
  onOpenChange,
}: Props) => {
  const [formData, setFormData] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useAuth();

  const {
    mutate: changePassword,
    isError,
    error,
    isSuccess,
    isPending,
  } = useChangePassword();

  useEffect(() => {
    if (!isOpen) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: ""});
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.oldPassword.trim().length > 0 &&
    formData.newPassword.trim().length >= 8 &&
    formData.confirmPassword === formData.newPassword ;

  const handleSubmit = () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    changePassword(
      {
        username: user?.email ?? "",
        oldPassword: formData.oldPassword,
        password: formData.newPassword,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "Password updated successfully!");
            onOpenChange(false);
          } else {
            toast.error(res.message || "Failed to update password");
          }
        },
        onError: (err) => {
          toast.error("Failed to update password");
          console.error("Change password error:", err);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[580px] h-[450px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="border-b my-4"></div>

        {/* Old Password */}
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

        {/* New Password */}
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

        {/* Confirm Password */}
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

        {/* Feedback */}
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
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
