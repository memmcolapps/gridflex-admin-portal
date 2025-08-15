// components/dialogs/AddRegionDialog.tsx
"use client";
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

export function AddRegionDialog({ isOpen, onOpenChange, onSubmit, initialData = {} }: Props) {
    const [formData, setFormData] = useState<UnifiedFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onOpenChange(false);
    };

    const isFormValid =
        formData.regionId?.trim() &&
        formData.regionName?.trim() &&
        formData.phoneNumber?.trim() &&
        formData.email?.trim() &&
        formData.contactPerson?.trim() &&
        formData.address?.trim();


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Region</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="regionId">Region ID <span className="text-red-500">*</span></Label>
                            <Input id="regionId" name="regionId" value={formData.regionId ?? ""} onChange={handleChange} placeholder="Enter Region ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="regionName">Region Name<span className="text-red-500">*</span></Label>
                            <Input id="regionName" name="regionName" value={formData.regionName ?? ""} onChange={handleChange} placeholder="Enter Region name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number<span className="text-red-500">*</span></Label>
                            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber ?? ""} onChange={handleChange} placeholder="Enter Phone Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                            <Input id="email" name="email" value={formData.email ?? ""} onChange={handleChange} placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person<span className="text-red-500">*</span></Label>
                        <Input id="contactPerson" name="contactPerson" value={formData.contactPerson ?? ""} onChange={handleChange} placeholder="Enter Contact Person" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Input id="address" name="address" value={formData.address ?? ""} onChange={handleChange} placeholder="Enter Address" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[#161CCA] border-[#161CCA] hover:text-[#161CCA] cursor-pointer">Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`text-white ${isFormValid ? "bg-[#161CCA] hover:bg-[#161CCA] cursor-pointer" : "bg-[#161CCA]/40 cursor-not-allowed"}`}
                    >
                        Add Region</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}