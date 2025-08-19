"use client";
// components/dialogs/EditDistributionSubstationDialog.tsx
// Note: Similar to EditSubstationDialog, with adjusted title and label
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UnifiedFormData } from "@/types/unifiedForm.ts";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: UnifiedFormData) => void;
    initialData?: Partial<UnifiedFormData>;
};

export function EditDistributionSubstationDialog({ isOpen, onOpenChange, onSubmit, initialData = {} }: Props) {
    const [formData, setFormData] = useState<UnifiedFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Distribution Substation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="substationName">Distribution Substation (DSS) Name <span className="text-red-500">*</span></Label>
                            <Input id="substationName" name="substationName" value={formData.substationName ?? ""} onChange={handleChange} placeholder="Enter Substation Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="serialNumber">Serial Number<span className="text-red-500">*</span></Label>
                            <Input id="serialNumber" name="serialNumber" value={formData.serialNumber ?? ""} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber ?? ""} onChange={handleChange} placeholder="Enter Phone Number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
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
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="assetId">Asset ID <span className="text-red-500">*</span></Label>
                            <Input id="assetId" name="assetId" value={formData.assetId ?? ""} onChange={handleChange} placeholder="Enter Asset ID" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                            <Select onValueChange={handleSelectChange("status")} defaultValue={formData.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="voltage">Voltage <span className="text-red-500">*</span></Label>
                            <Select onValueChange={handleSelectChange("voltage")} defaultValue={formData.voltage}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Voltage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="330 KV">330 KV</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input id="longitude" name="longitude" value={formData.longitude ?? ""} onChange={handleChange} placeholder="Enter Longitude" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input id="latitude" name="latitude" value={formData.latitude ?? ""} onChange={handleChange} placeholder="Enter Latitude" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                        <Input id="description" name="description" value={formData.description ?? ""} onChange={handleChange} placeholder="Enter Description" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#161CCA] text-[#161CCA]">Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-[#161CCA]">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}