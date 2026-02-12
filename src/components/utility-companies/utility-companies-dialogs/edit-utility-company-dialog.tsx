"use client";
import { useEffect, useState } from "react";
import { useUpdateOrg } from "@/hooks/use-orgs";
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
import { toast } from "sonner";
import { useNigerianCities, useNigerianStates } from "@/hooks/use-location";
import type { UnifiedFormData } from "@/types/unifiedForm";

export interface OrganizationData {
  id?: string;
  businessName: string;
  postalCode: string;
  address: string;
  country: string;
  state: string;
  userId: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type Props = {
  isOpen: boolean;
  organizationId?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UnifiedFormData) => void;
  initialData?: Partial<UnifiedFormData>;
  selectedOrganization?: OrganizationData | null;
};

export const EditUtilityCompanyDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  organizationId,
  selectedOrganization,
  initialData = {},
}: Props) => {
  const [formData, setFormData] = useState<UnifiedFormData>(initialData || {});

  useEffect(() => {
    if (selectedOrganization && isOpen) {
      setFormData((prev) => ({
        ...prev,
        id: selectedOrganization.id ?? organizationId ?? "",
        organizationName: selectedOrganization.businessName || "",
        postalCode: selectedOrganization.postalCode || "",
        streetAddress: selectedOrganization.address || "",
        country: selectedOrganization.country || "",
        userId: selectedOrganization.userId || "",
        stateProvince: selectedOrganization.state || "",
        city: selectedOrganization.city || "",
        firstname: selectedOrganization.firstName || "",
        lastname: selectedOrganization.lastName || "",
        email: selectedOrganization.email || "",
        phoneNumber: selectedOrganization.phoneNumber || "",
      }));
    }
  }, [selectedOrganization, isOpen, organizationId]);

  const {
    mutate: updateOrg,
    isError,
    error,
    isSuccess,
    isPending,
  } = useUpdateOrg();

  const { data: states, isLoading: isLoadingStates } = useNigerianStates();
  const stateId = states?.find(
    (state) => state.name === formData.stateProvince,
  )?.id;
  const { data: cities, isLoading: isLoadingCities } =
    useNigerianCities(stateId);

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

  const mapToUpdateOrgPayload = (data: UnifiedFormData) => ({
    id: data.id ?? organizationId ?? "",
    businessName: data.organizationName ?? "",
    postalCode: data.postalCode ?? "",
    address: data.streetAddress ?? "",
    country: data.country ?? "",
    state: data.stateProvince ?? "",
    city: data.city ?? "",
    userId: data.userId ?? "",
    firstName: data.firstname ?? "",
    lastName: data.lastname ?? "",
    email: data.email ?? "",
    password: data.defaultPassword ?? "",
    phoneNumber: data.phoneNumber ?? "",
  });

  const handleSubmit = () => {
    const payload = mapToUpdateOrgPayload(formData);

    if (!payload.id) {
      toast.error("Organization ID is missing — cannot update");
      return;
    }

    updateOrg(payload, {
      onSuccess: () => {
        toast.success("Organization updated successfully!");
        onSubmit(formData);
        onOpenChange(false);
      },
      onError: (err) => {
        toast.error("Failed to update organization");
        console.error(err);
      },
    });
  };

  const requiredFields: (keyof UnifiedFormData)[] = [
    "organizationName",
    "country",
    "city",
    "stateProvince",
    "streetAddress",
    "firstname",
    "lastname",
    "phoneNumber",
    "email",
  ];

  const isFormComplete = requiredFields.every(
    (field) => formData[field] && String(formData[field]).trim() !== "",
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Utility Company</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label className="text-base">Company Information</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">
                Organization Name <span className="text-red-500">*</span>
              </Label>
              <Input
                className="h-11 w-[200px]"
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
                <SelectTrigger className="h-11 w-[200px]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stateProvince">
                State/Province <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={handleSelectChange("stateProvince")}
                value={formData.stateProvince}
                disabled={isLoadingStates || states?.length === 0}
              >
                <SelectTrigger className="h-11 w-[200px]">
                  <SelectValue
                    placeholder={
                      isLoadingStates ? "Loading states..." : "Select state"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {states?.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={handleSelectChange("city")}
                value={formData.city}
                disabled={
                  isLoadingCities ||
                  !formData.stateProvince ||
                  cities?.length === 0
                }
              >
                <SelectTrigger className="h-11 w-[200px]">
                  <SelectValue
                    placeholder={
                      isLoadingCities ? "Loading cities..." : "Select city"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                className="h-11 w-[200px]"
                name="postalCode"
                value={formData.postalCode ?? ""}
                onChange={handleChange}
                placeholder="Enter Postal Code"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streetAddress">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="streetAddress"
                className="h-11 w-[200px]"
                name="streetAddress"
                value={formData.streetAddress ?? ""}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyLogo">+ Add company logo</Label>
            <Input
              className="h-11"
              id="companyLogo"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <Label className="mt-4">Admin Details</Label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                id="firstname"
                className="h-11 w-[200px]"
                name="firstname"
                value={formData.firstname ?? ""}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                id="lastname"
                className="h-11 w-[200px]"
                name="lastname"
                value={formData.lastname ?? ""}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                id="email"
                name="email"
                className="h-11 w-[200px]"
                value={formData.email ?? ""}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                id="phoneNumber"
                name="phoneNumber"
                className="h-10 w-[200px]"
                value={formData.phoneNumber ?? ""}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <Label htmlFor="defaultPassword">
                Default Password <span className="text-red-500">*</span>
              </Label>
              <Input
                disabled
                id="defaultPassword"
                name="defaultPassword"
                className="h-11 w-full"
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
              Organization updated successfully!
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-sm border-1 border-[var(--primary)] bg-white px-6 py-5 text-[#161CCA] hover:text-[#161CCA]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-sm bg-[#161CCA] px-6 py-5 text-white hover:bg-[#161CCA]"
              disabled={!isFormComplete || isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
