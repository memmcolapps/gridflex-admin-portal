"use client";
import { useState } from "react";
import { useCreateOrg } from "@/hooks/use-orgs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UnifiedFormData } from "@/types/unifiedForm.ts";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UnifiedFormData) => void;
  initialData?: Partial<UnifiedFormData>;
};

export const AddNewUtilityCompanyDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData = {},
}: Props) => {
  const [formData, setFormData] = useState<UnifiedFormData>(initialData);
  const {
    mutate: createOrg,
    isError,
    error,
    isSuccess,
    isPending,
  } = useCreateOrg();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, companyLogo: e.target.files[0]?.name });
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Map UnifiedFormData to CreateOrgPayload
  const mapToCreateOrgPayload = (data: UnifiedFormData) => ({
    businessName: data.organizationName ?? "",
    postalCode: data.postalCode ?? "",
    address: data.streetAddress ?? "",
    country: data.country ?? "",
    state: data.stateProvince ?? "",
    city: data.city ?? "",
    firstName: data.adminName?.split(" ")[0] ?? "",
    lastName: data.adminName?.split(" ")[1] ?? "",
    email: data.email ?? "",
    password: data.defaultPassword ?? "",
    phoneNumber: data.adminPhoneNumber ?? "",
  });

  const handleSubmit = () => {
    const payload = mapToCreateOrgPayload(formData);
    createOrg(payload, {
      onSuccess: () => {
        onSubmit(formData);
        onOpenChange(false);
      },
      onError: () => {
        toast.error("Failed to create organization");
      },
    });
  };

  const requiredFields: (keyof UnifiedFormData)[] = [
    "organizationName",
    "country",
    "city",
    "stateProvince",
    "streetAddress",
    "adminName",
    "adminPhoneNumber",
    "email",
    "defaultPassword",
  ];

  const isFormComplete = requiredFields.every(
    (field) => formData[field] && String(formData[field]).trim() !== "",
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Utility Company</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>Company Information</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">
                Organization Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="organizationName"
                name="organizationName"
                value={formData.organizationName ?? ""}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={handleSelectChange("country")}
                defaultValue={formData.country}
              >
                <SelectTrigger className="w-55">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city ?? ""}
                onChange={handleChange}
                placeholder="Enter City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode ?? ""}
                onChange={handleChange}
                placeholder="Enter Postal Code"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stateProvince">
                State/Province <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stateProvince"
                name="stateProvince"
                value={formData.stateProvince ?? ""}
                onChange={handleChange}
                placeholder="Enter state or province"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streetAddress">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress ?? ""}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyLogo">+ Add company logo</Label>
            <Input id="companyLogo" type="file" onChange={handleFileChange} />
          </div>
          <Label className="mt-4">Admin Details</Label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">
                Admin Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adminName"
                name="adminName"
                value={formData.adminName ?? ""}
                onChange={handleChange}
                placeholder="Enter person name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPhoneNumber">
                Admin Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adminPhoneNumber"
                name="adminPhoneNumber"
                value={formData.adminPhoneNumber ?? ""}
                onChange={handleChange}
                placeholder="Enter person number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                placeholder="Enter contact email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultPassword">
                Default Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="defaultPassword"
                name="defaultPassword"
                value={formData.defaultPassword ?? ""}
                onChange={handleChange}
                placeholder="Enter default password"
              />
            </div>
          </div>
          {isError && (
            <div className="mt-2 text-sm text-red-500">{String(error)}</div>
          )}
          {isSuccess && (
            <div className="mt-2 text-sm text-green-600">
              Organization created successfully!
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#161CCA] text-[#161CCA] hover:text-[#161CCA]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#161CCA] text-white hover:bg-[#161CCA]"
              disabled={!isFormComplete || isPending}
            >
              {isPending ? "Adding..." : "Add Company"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
