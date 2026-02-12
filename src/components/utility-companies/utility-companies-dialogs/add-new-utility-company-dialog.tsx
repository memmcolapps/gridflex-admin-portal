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
import { toast } from "sonner";
import { useNigerianCities, useNigerianStates } from "@/hooks/use-location";
import type { UnifiedFormData } from "@/types/unifiedForm";

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

  const mapToCreateOrgPayload = (data: UnifiedFormData) => ({
    businessName: data.organizationName ?? "",
    postalCode: data.postalCode ?? "",
    address: data.streetAddress ?? "",
    country: data.country ?? "",
    state: data.stateProvince ?? "",
    city: data.city ?? "",
    firstName: data.firstname ?? "",
    lastName: data.lastname ?? "",
    email: data.email ?? "",
    password: data.defaultPassword ?? "",
    phoneNumber: data.phoneNumber ?? "",
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
    "firstname",
    "lastname",
    "phoneNumber",
    "email",
    "defaultPassword",
  ];

  const isFormComplete = requiredFields.every(
    (field) => formData[field] && String(formData[field]).trim() !== "",
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Utility Company</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label className="text-base">Company Information</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organizationName">
                Organization Name <span className="text-red-500">*</span>
              </Label>
              <Input
                className="h-11 w-full"
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
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stateProvince">
                State/Province <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={handleSelectChange("stateProvince")}
                value={formData.stateProvince}
                disabled={isLoadingStates || states?.length === 0}
              >
                <SelectTrigger className="h-11 w-full">
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
                <SelectTrigger className="h-11 w-full">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                className="h-11 w-full"
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
                className="h-11 w-full"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstname"
                className="h-11 w-full"
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
                id="lastname"
                className="h-11 w-full"
                name="lastname"
                value={formData.lastname ?? ""}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                className="h-11 w-full"
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
                id="phoneNumber"
                name="phoneNumber"
                className="h-10 w-full"
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
              Organization created successfully!
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
              {isPending ? "Adding..." : "Add Company"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
