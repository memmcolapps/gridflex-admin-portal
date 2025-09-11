"use client";
import { useState } from "react";
import { useCreateAdmin } from "@/hooks/use-orgs";
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
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UnifiedFormData) => void;
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

const ALL_DEPARTMENT = [
    {
        department: 'System Integration'
    },
    {
        department: 'R$D Software'
    },
]

export const AddNewAdminDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData = {},
}: Props) => {
    const [formData, setFormData] = useState<UnifiedFormData>(initialData);
    const {
        mutate: createAdmin,
        isError,
        error,
        isSuccess,
        isPending,
    } = useCreateAdmin();

    const mapToCreateAdminPayload = (data: UnifiedFormData) => ({
        firstname: data.firstname ?? "",
        lastname: data.lastname ?? "",
        email: data.email ?? '',
        department: data.department ?? '',
        password: data.defaultPassword ?? '',
        role: data.role ?? '',
        phoneNo: data.phoneNo ?? ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const payload = mapToCreateAdminPayload(formData);
        createAdmin(payload, {
            onSuccess: () => {
                onSubmit(formData);
                onOpenChange(false);
            },
            onError: () => {
                toast.error("Failed to create Admin");
            },
        });
    };

    const requiredFields: (keyof UnifiedFormData)[] = [
        'firstname',
        'lastname',
        'role',
        'department',
        'email',
        'defaultPassword',
        'phoneNo',
    ];

    const isFormComplete = requiredFields.every(
        (field) => formData[field] && String(formData[field]).trim() !== "",
    );

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <div className="mt-2 grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="firstname">
                            First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="firstname"
                            className="w-[250px] h-12 text-sm"
                            name="firstname"
                            value={formData.firstname ?? ""}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="lastname">
                            Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            className="w-[250px] h-12"
                            value={formData.lastname ?? ""}
                            onChange={handleChange}
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
                            value={formData.email ?? ""}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="phoneNo">
                            Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phoneNo"
                            name="phoneNo"
                            className="w-[250px] h-12"
                            value={formData.phoneNo ?? ""}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="role">
                            Role <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.role ?? ""}
                            onValueChange={handleSelectChange("role")}
                        >
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
                        <Label htmlFor="department">
                            Department <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.department ?? ""}
                            onValueChange={handleSelectChange("department")}
                        >
                            <SelectTrigger className="text-gray-500 w-[250px] h-12">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {ALL_DEPARTMENT.map((department, index) => (
                                    <SelectItem key={index} value={department.department}>
                                        {department.department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label htmlFor="defaultPassword">
                            Default Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="defaultPassword"
                            name="defaultPassword"
                            className="w-[250px] h-12"
                            value={formData.defaultPassword ?? ""}
                            onChange={handleChange}
                            placeholder="Enter Default Password"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="defaultPassword">
                            Confirm Default Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="defaultPassword"
                            name="defaultPassword"
                            className="w-full h-12"
                            value={formData.defaultPassword ?? ""}
                            onChange={handleChange}
                            placeholder="Confirm Default Password"
                        />
                    </div>

                </div>

                {isError && (
                    <div className="mt-2 text-sm text-red-500">{String(error)}</div>
                )}
                {isSuccess && (
                    <div className="mt-2 text-sm text-green-600">
                        Admin created successfully!
                    </div>
                )}
                <DialogFooter>
                    <div className="flex mt-10 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] px-6 py-5 rounded-sm border-1 bg-white text-[#161CCA] hover:text-[#161CCA]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#161CCA] px-6 py-6 rounded-sm text-white hover:bg-[#161CCA]"
                            disabled={!isFormComplete || isPending}
                        >
                            {isPending ? "Adding..." : "Add Admin"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
