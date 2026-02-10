"use client";
import { useState } from "react";
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
import type { UnifiedFormData } from "@/types/unifiedForm.ts";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UnifiedFormData) => void;
  initialData?: Partial<UnifiedFormData>;
};

export function AddServiceCenterDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData = {},
}: Props) {
  const [formData, setFormData] = useState<UnifiedFormData>({
    serviceCenterId: "",
    serviceCenterName: "",
    phoneNumber: "",
    email: "",
    contactPerson: "",
    address: "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  const isFormValid =
    (formData.serviceCenterId ?? "").trim() !== "" &&
    (formData.serviceCenterName ?? "").trim() !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service Center</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceCenterId">
                Service Center ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serviceCenterId"
                name="serviceCenterId"
                value={formData.serviceCenterId ?? ""}
                onChange={handleChange}
                placeholder="Enter Service Center ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceCenterName">
                Service Center Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serviceCenterName"
                name="serviceCenterName"
                value={formData.serviceCenterName ?? ""}
                onChange={handleChange}
                placeholder="Enter Service Center Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Contact Person Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber ?? ""}
                onChange={handleChange}
                placeholder="Enter Contact Person Phone Number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Person Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                placeholder="Enter Contact Person Email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person Name</Label>
            <Input
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson ?? ""}
              onChange={handleChange}
              placeholder="Enter Contact Person Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Contact Person Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address ?? ""}
              onChange={handleChange}
              placeholder="Enter Contact Person Address"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer border-[#161CCA] text-[#161CCA] hover:text-[#161CCA]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`text-white ${isFormValid ? "cursor-pointer bg-[#161CCA] hover:bg-[#161CCA]" : "cursor-not-allowed bg-[#161CCA]/40"}`}
          >
            Add Service Center
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
