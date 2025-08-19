"use client";
// components/dialogs/EditBusinessHubDialog.tsx
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

export function EditBusinessHubDialog({ isOpen, onOpenChange, onSubmit, initialData = {} }: Props) {
    const [formData, setFormData] = useState<UnifiedFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Business Hub</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessHubId">Business Hub ID <span className="text-red-500">*</span></Label>
                            <Input id="businessHubId" name="businessHubId" value={formData.businessHubId ?? ""} onChange={handleChange} placeholder="Enter Business Hub ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessHubName">Business Hub Name <span className="text-red-500">*</span></Label>
                            <Input id="businessHubName" name="businessHubName" value={formData.businessHubName ?? ""} onChange={handleChange} placeholder="Enter Business Hub Name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber ?? ""} onChange={handleChange} placeholder="Enter Phone Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                            <Input id="email" name="email" value={formData.email ?? ""} onChange={handleChange} placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person <span className="text-red-500">*</span></Label>
                        <Input id="contactPerson" name="contactPerson" value={formData.contactPerson ?? ""} onChange={handleChange} placeholder="Enter Contact Person" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Input id="address" name="address" value={formData.address ?? ""} onChange={handleChange} placeholder="Enter Address" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#161CCA] text-[#161CCA]">Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-[#161CCA]">Save Changes</Button> {/* Matching image, though likely "Save" intended */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}