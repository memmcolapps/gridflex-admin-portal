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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/use-orgs";

export interface AdminData {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    defaultPassword?: string;
    phoneNo?: string;
}

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UnifiedFormData) => void;
    selectedContact?: AdminData | null;
    initialData?: Partial<UnifiedFormData>;
}

export const EditProfileDialog = ({
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
                id: String(selectedContact.id)
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
    } = useUpdateProfile(String(selectedContact?.id ?? ""));

    useEffect(() => {
        if (selectedContact && isOpen) {
            setFormData({
                firstname: selectedContact.firstname || "",
                lastname: selectedContact.lastname || "",
                email: selectedContact.email || "",
                phoneNo: selectedContact.phoneNo || "",
                defaultPassword: selectedContact.defaultPassword || "",
                id: String(selectedContact.id)
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

    const handleSubmit = () => {
        if (!formData.firstname || !formData.lastname || 
            !formData.phoneNo ) {
            toast.error("Please fill in all required fields");
            return;
        }

        updateAdmin(formData, {
            onSuccess: () => {
                toast.success("Profile updated successfully!");
                onOpenChange(false);
                onSubmit(formData);
            },
            onError: (error) => {
                toast.error("Failed to update profile");
                console.error("Update error:", error);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
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
                            disabled
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
                <div className="w-full">
                    <div className="space-y-4">
                        <Label htmlFor="defaultPassword">
                            Default Password
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            disabled
                            id="defaultPassword"
                            name="defaultPassword"
                            type="password"
                            className="w-full h-12"
                            value={formData.defaultPassword ?? ""}
                            onChange={handleChange}
                            placeholder="•••••••••"
                        />
                    </div>
                </div>
                {isError && (
                    <div className="mt-2 text-sm text-red-500">
                        {error?.message || "Failed to update profile"}
                    </div>
                )}
                {isSuccess && (
                    <div className="mt-2 text-sm text-green-600">
                        Profile updated successfully!
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
                            {isPending ? "Updating..." : "Update Profile"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};