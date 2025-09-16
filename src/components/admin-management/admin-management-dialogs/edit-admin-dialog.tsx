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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useUpdateAdmin } from "@/hooks/use-orgs";
import { toast } from "sonner";

export interface AdminData {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    defaultPassword: string;
    department: string;
    phoneNo: string;
    role: string;
}

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UnifiedFormData) => void;
    selectedContact?: AdminData | null;
    initialData?: Partial<UnifiedFormData>;
}

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

export const EditAdminDialog = ({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData,
    selectedContact
}: Props) => {
    const [formData, setFormData] = useState<UnifiedFormData>(() => {
        if (selectedContact) {
            return {
                firstName: selectedContact.firstname || "",
                lastName: selectedContact.lastname || "",
                email: selectedContact.email || "",
                phoneNo: selectedContact.phoneNo || "",
                role: selectedContact.role || "",
                defaultPassword: selectedContact.defaultPassword || "",
                id: selectedContact.id
            };
        }
        return initialData || {};
    });

    const {
        mutate: updateAdmin,
        isError,
        error,
        isSuccess,
        isPending,
    } = useUpdateAdmin();

    useEffect(() => {
        if (selectedContact && isOpen) {
            setFormData({
                firstname: selectedContact.firstname || "",
                lastname: selectedContact.lastname || "",
                email: selectedContact.email || "",
                phoneNo: selectedContact.phoneNo || "",
                role: selectedContact.role || "",
                defaultPassword: selectedContact.defaultPassword || "",
                id: selectedContact.id
            });
        }
    }, [selectedContact, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            role: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.firstname || !formData.lastname || !formData.email || 
            !formData.phoneNo || !formData.role) {
            toast.error("Please fill in all required fields");
            return;
        }

        updateAdmin(formData, {
            onSuccess: () => {
                toast.success("Admin updated successfully!");
                onOpenChange(false);
                onSubmit(formData);
            },
            onError: (error) => {
                toast.error("Failed to update admin");
                console.error("Update error:", error);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
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
                        <Select value={formData.role ?? ""} onValueChange={handleRoleChange}>
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
                            Default Password 
                            {/* <span className="text-red-500">*</span> */}
                        </Label>
                        <Input
                            disabled
                            id="defaultPassword"
                            name="defaultPassword"
                            type="password"
                            className="w-[250px] h-12"
                            value={formData.defaultPassword ?? ""}
                            onChange={handleChange}
                            placeholder="Enter Default Password"
                        />
                    </div>
                </div>
                {isError && (
                    <div className="mt-2 text-sm text-red-500">
                        {error?.message || "Failed to update admin"}
                    </div>
                )}
                {isSuccess && (
                    <div className="mt-2 text-sm text-green-600">
                        Admin updated successfully!
                    </div>
                )}
                <DialogFooter>
                    <div className="flex mt-10 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] px-6 py-6 rounded-sm border-1 bg-white text-[#161CCA] hover:text-[#161CCA]"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#161CCA] px-6 py-6 rounded-sm text-white hover:bg-[#161CCA]"
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? "Updating..." : "Update Admin"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};