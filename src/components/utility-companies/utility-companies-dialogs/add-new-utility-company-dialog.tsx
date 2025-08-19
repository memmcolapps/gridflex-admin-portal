"use client";
import { useState, useEffect } from "react";
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
import { fetchNigerianStates, fetchNigerianCitiesByState } from "@/services/location-service";
import type { NigerianState, NigerianCity } from "@/types/location";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UnifiedFormData) => void;
  initialData?: Partial<UnifiedFormData>;
};

// Fallback data for Nigerian states and cities
const fallbackStates: NigerianState[] = [
  { id: "lagos", name: "Lagos" },
  { id: "abia", name: "Abia" },
  { id: "kano", name: "Kano" },
  { id: "abuja", name: "Abuja" },
];

const fallbackCities: Record<string, NigerianCity[]> = {
  lagos: [
    { id: "ikeja", name: "Ikeja", stateId: "lagos" },
    { id: "alimosho", name: "Alimosho", stateId: "lagos" },
    { id: "surulere", name: "Surulere", stateId: "lagos" },
  ],
  abia: [
    { id: "aba-north", name: "Aba North", stateId: "abia" },
    { id: "aba-south", name: "Aba South", stateId: "abia" },
  ],
  kano: [
    { id: "kano-municipal", name: "Kano Municipal", stateId: "kano" },
    { id: "dala", name: "Dala", stateId: "kano" },
  ],
  abuja: [
    { id: "abaji", name: "Abaji", stateId: "abuja" },
    { id: "gwagwalada", name: "Gwagwalada", stateId: "abuja" },
  ],
};

export const AddNewUtilityCompanyDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData = {},
}: Props) => {
  const [formData, setFormData] = useState<UnifiedFormData>(initialData);
  const [states, setStates] = useState<NigerianState[]>([]);
  const [cities, setCities] = useState<NigerianCity[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const {
    mutate: createOrg,
    isError,
    error,
    isSuccess,
    isPending,
  } = useCreateOrg();

  // Fetch states on component mount
  useEffect(() => {
    const loadStates = async () => {
      setIsLoadingStates(true);
      try {
        const fetchedStates = await fetchNigerianStates();
        setStates(fetchedStates);
      } catch (error) {
        console.error("Failed to load states:", error);
        toast.error("Failed to fetch states. Using fallback data.");
        setStates(fallbackStates);
      } finally {
        setIsLoadingStates(false);
      }
    };
    loadStates();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (formData.stateProvince) {
      const stateId = states.find((s) => s.name === formData.stateProvince)?.id || "";
      if (stateId) {
        const loadCities = async () => {
          setIsLoadingCities(true);
          try {
            const fetchedCities = await fetchNigerianCitiesByState(stateId);
            setCities(fetchedCities);
          } catch (error) {
            console.error(`Failed to load cities for state ${stateId}:`, error);
            toast.error(`Failed to fetch cities for ${formData.stateProvince}. Using fallback data.`);
            setCities(fallbackCities[stateId] || []);
          } finally {
            setIsLoadingCities(false);
          }
        };
        loadCities();
      } else {
        setCities(fallbackCities[stateId] || []);
      }
      // Reset city when state changes
      setFormData((prev) => ({ ...prev, city: "" }));
    } else {
      setCities([]);
    }
  }, [formData.stateProvince, states]);

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
                disabled={isLoadingStates || states.length === 0}
              >
                <SelectTrigger className="w-55">
                  <SelectValue placeholder={isLoadingStates ? "Loading states..." : "Select state"} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
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
                disabled={isLoadingCities || !formData.stateProvince || cities.length === 0}
              >
                <SelectTrigger className="w-55">
                  <SelectValue placeholder={isLoadingCities ? "Loading cities..." : "Select city"} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
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