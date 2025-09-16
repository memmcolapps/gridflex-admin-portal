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
        role: 'SUPER_ADMIN'
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
        department: 'R&D Software'
    },
]

export const AddNewAdminDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData = {},
}: Props) => {
    const [formData, setFormData] = useState<UnifiedFormData>(initialData);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    
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
        defaultPassword: data.defaultPassword ?? '',
        role: data.role ?? '',
        phoneNo: data.phoneNo ?? ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (name === 'defaultPassword' && passwordError) {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        
        if (passwordError) {
            setPasswordError("");
        }
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validatePasswords = (): boolean => {
        const password = formData.defaultPassword ?? "";
        
        if (!password) {
            setPasswordError("Password is required");
            return false;
        }
        
        if (!confirmPassword) {
            setPasswordError("Please confirm your password");
            return false;
        }
        
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        
        return true;
    };

    const handleSubmit = () => {
        if (!validatePasswords()) {
            return;
        }
        
        const payload = mapToCreateAdminPayload(formData);
        createAdmin(payload, {
            onSuccess: () => {
                onSubmit(formData);
                onOpenChange(false);
                setFormData({});
                setConfirmPassword("");
                setPasswordError("");
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
    ) && confirmPassword.trim() !== "";

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
                            type="email"
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
                            type="password"
                            className="w-[250px] h-12"
                            value={formData.defaultPassword ?? ""}
                            onChange={handleChange}
                            placeholder="Enter Default Password"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="confirmPassword">
                            Confirm Default Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="w-[250px] h-12"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm Default Password"
                        />
                    </div>
                </div>

                {passwordError && (
                    <div className="text-sm text-red-500">{passwordError}</div>
                )}

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