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
import type { UnifiedFormData } from "@/types/unifiedForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (data: UnifiedFormData) => void;
    initialData?: Partial<UnifiedFormData>;
};

const ALL_ROLES = [
    {
        role: 'Admin'
    },
    {
        role: 'Developer'
    },
    {
        role: 'Support'
    }
]

export const EditAdminDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData = {},
}: Props) => {
    const [formData] = useState<UnifiedFormData>(initialData);
    const {
        mutate: createOrg,
        isError,
        error,
        isSuccess,
        isPending,
    } = useCreateOrg();

    // const { data: states, isLoading: isLoadingStates } = useNigerianStates();
    // const stateId = states?.find(
    //     (state) => state.name === formData.stateProvince,
    // )?.id;
    //   const { data: cities, isLoading: isLoadingCities } =
    //     useNigerianCities(stateId);

    //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };

    //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //       setFormData({ ...formData, companyLogo: e.target.files[0]?.name });
    //     }
    //   };

    //   const handleSelectChange = (name: string) => (value: string) => {
    //     setFormData({ ...formData, [name]: value });
    //   };

    //   const mapToCreateOrgPayload = (data: UnifiedFormData) => ({
    //     businessName: data.organizationName ?? "",
    //     postalCode: data.postalCode ?? "",
    //     address: data.streetAddress ?? "",
    //     country: data.country ?? "",
    //     state: data.stateProvince ?? "",
    //     city: data.city ?? "",
    //     firstName: data.adminName?.split(" ")[0] ?? "",
    //     lastName: data.adminName?.split(" ")[1] ?? "",
    //     email: data.email ?? "",
    //     password: data.defaultPassword ?? "",
    //     phoneNumber: data.adminPhoneNumber ?? "",
    //   });

    const handleSubmit = () => {
        // const payload = mapToCreateOrgPayload(formData);
        // createOrg(payload, {
        //   onSuccess: () => {
        //     onSubmit(formData);
        //     onOpenChange(false);
        //   },
        //   onError: () => {
        //     toast.error("Failed to create organization");
        //   },
        // });
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
                    <DialogTitle>Edit Admin</DialogTitle>
                </DialogHeader>
                <div className="mt-2 grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="firstName"
                            className="w-[250px] h-12 text-sm"
                            name="firstName"
                            // value={formData.firstName ?? ""}
                            // onChange={handleChange}
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            className="w-[250px] h-12"
                            // value={formData.lastName ?? ""}
                            // onChange={handleChange}
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            className="w-[250px] h-12"
                            // value={formData.email ?? ""}
                            // onChange={handleChange}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="phoneNumber">
                            Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            className="w-[250px] h-12"
                            // value={formData.phoneNumber ?? ""}
                            // onChange={handleChange}
                            placeholder="Enter Phone Number"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="role">
                            Role <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                            <SelectTrigger className="text-gray-500 w-[250px] h-12">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_ROLES.map((role, index) => (
                                    <SelectItem key={index} value={role.role}>
                                        {role.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="defaultPassword">
                            Default Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="defaultPassword"
                            name="defaultPassword"
                            className="w-[250px] h-12"
                            // value={formData.defaultPassword ?? ""}
                            // onChange={handleChange}
                            placeholder="Enter Default Password"
                        />
                    </div>

                </div>
                {isError && (
                    <div className="mt-2 text-sm text-red-500">{String(error)}</div>
                )}
                {isSuccess && (
                    <div className="mt-2 text-sm text-green-600">
                        Admin edited successfully!
                    </div>
                )}
                <DialogFooter>
                    <div className="flex mt-10 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] px-6 py-6 rounded-sm border-1 bg-white text-[#161CCA] hover:text-[#161CCA]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#161CCA] px-6 py-6 rounded-sm text-white hover:bg-[#161CCA]"
                            disabled={!isFormComplete || isPending}
                        >
                            {isPending ? "Editing..." : "Edit Admin"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
