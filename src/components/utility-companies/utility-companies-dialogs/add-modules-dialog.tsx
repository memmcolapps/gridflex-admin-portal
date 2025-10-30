"use client";
import { useSuspendUtility } from "@/hooks/use-orgs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Check, Settings, CreditCard, Zap } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    organizationId: string;
    organizationName?: string;
};

export const SelectModulesDialog = ({
    isOpen,
    onOpenChange,
    organizationId,
    organizationName,
}: Props) => {
    const { mutate: suspendUtility, isPending } = useSuspendUtility();
    const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

    const handleSelect = (label: string) => {
        setSelectedUnits((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const handleSave = () => {
        suspendUtility(
            { id: organizationId, status: true },
            {
                onSuccess: () => {
                    toast.success(`${organizationName} updated successfully`);
                    onOpenChange(false);
                },
                onError: (err) => {
                    toast.error(`Failed to update ${organizationName}`);
                    console.error(err);
                },
            }
        );
    };

    const moduleOptions = [
        { label: "Billing", icon: <CreditCard className="text-gray-500" size={16} /> },
        { label: "Vending", icon: <Zap className="text-gray-500" size={16} /> },
        { label: "HES", icon: <Settings className="text-gray-500" size={16} /> },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md w-full rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-lg text-gray-800">
                        Module Selection
                    </DialogTitle>
                    <DialogDescription className="text-sm text-black">
                        Select which modules should be visible to this organization.
                        Hidden modules won’t appear in their sidebar.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-5">
                    {moduleOptions.map(({ label, icon }) => (
                        <div
                            key={label}
                            onClick={() => handleSelect(label)}
                            className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-md transition"
                        >
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="text-gray-600">{icon}</span>
                                <span className="text-md font-medium">{label}</span>
                            </div>

                            <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                                    selectedUnits.includes(label)
                                        ? "border-green-500 bg-green-500"
                                        : "border-gray-400"
                                }`}
                            >
                                {selectedUnits.includes(label) && (
                                    <Check className="text-white" size={10} strokeWidth={3} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <div className="flex mt-3 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] hover:border-blue-500 hover:bg-white px-6 py-6 rounded-sm border-1 bg-white text-[var(--primary)] hover:text-blue-500"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[var(--primary)] font-semibold px-6 py-6 rounded-sm text-white hover:bg-blue-500"
                            onClick={handleSave}
                            disabled={isPending || selectedUnits.length === 0}
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
